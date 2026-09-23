import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeDetails, productSpecs } from '../src/services/productDetails.js'
import { validateProduct } from '../src/services/inventory.js'
import { toGalleryProduct } from '../src/services/catalogSections.js'
import { createDemoCatalog } from './demoCatalog.js'
const blank = { name:'Teste',category:'Piteira',photos:[],priceCents:100,description:'',published:true,quantity:1 }
test('cadastros antigos não recebem ficha técnica inventada',()=>{
 const details=normalizeDetails(blank)
 assert.ok(Object.values(details).every(v=>v===null))
 assert.equal(productSpecs({...blank,...details}),undefined)
 assert.throws(()=>validateProduct({...blank,category:''}),/categoria/)
})
test('medidas aceitam vírgula e ponto, com unidades explícitas',()=>{
 const d=normalizeDetails({...blank,lengthCm:'11,3',diameter:'4.8',diameterUnit:'mm',model:' Artística '})
 assert.deepEqual(productSpecs({...blank,...d}),{Comprimento:'11,3 cm','Diâmetro':'4,8 mm',Modelo:'Artística'})
 for(const lengthCm of ['0','-1','NaN','Infinity','12cm','1e3','10001']) assert.throws(()=>normalizeDetails({...blank,lengthCm}))
 assert.equal(normalizeDetails({...blank,lengthCm:0.0000001}).lengthCm,0.0000001)
 assert.throws(()=>normalizeDetails({...blank,diameter:'2'}))
 assert.throws(()=>normalizeDetails({...blank,diameterUnit:'mm'}))
 assert.throws(()=>normalizeDetails({...blank,diameter:2,diameterUnit:'m'}))
})
test('linha da piteira aceita Premium ou Clássica e não se aplica a outras categorias',()=>{
 assert.equal(normalizeDetails({...blank,line:'Premium'}).line,'Premium')
 assert.equal(normalizeDetails({...blank,line:'Classica'}).line,'Classica')
 assert.equal(normalizeDetails({...blank,category:'Case',line:'Premium'}).line,null)
 assert.throws(()=>normalizeDetails({...blank,line:'Luxo'}))
})
test('acompanha isqueiro diferencia não informado, sim e não',()=>{
 for(const [value,label] of [[null,undefined],[true,'Sim'],[false,'Não']]) {
  const p={category:'Case',...normalizeDetails({category:'Case',compatibleWith:'BIC grande',includesLighter:value})}
  assert.equal(productSpecs(p)['Acompanha isqueiro'],label)
 }
 assert.throws(()=>normalizeDetails({category:'Case',includesLighter:'false'}))
})
test('troca de tipo elimina informações não aplicáveis e peça única não afeta saldo',()=>{
 const p={...blank,stock:5,reserved:2,...normalizeDetails({...blank,category:'Case',isUnique:true,lengthCm:10,model:'Antigo',compatibleWith:'BIC',includesLighter:false})}
 assert.equal(p.lengthCm,null);assert.equal(p.model,null);assert.equal(p.stock,5)
 assert.match(toGalleryProduct(p).tag,/Peça única/)
 assert.doesNotMatch(toGalleryProduct({...p,isUnique:false}).tag,/Peça única/)
 assert.throws(()=>normalizeDetails({...blank,model:'x'.repeat(121)}))
 assert.throws(()=>normalizeDetails({category:'Case',compatibleWith:'x'.repeat(201)}))
})
test('demonstração preserva ficha ao salvar, recarregar, editar estoque e duplicar',async()=>{
 let saved;let seq=0
 const catalog=createDemoCatalog({getItem:()=>saved,setItem:(_,v)=>{saved=v}},fn=>fn(),()=>`spec-${++seq}`)
 let state=await catalog.save({...blank,isUnique:true,lengthCm:'10,5',diameter:'4',diameterUnit:'mm',model:'Teste'})
 const p=state.products[0]
 state=await catalog.move(p.id,p.revision,'reserve',1,'reserve-spec')
 assert.equal(state.products[0].lengthCm,10.5)
 assert.equal((await catalog.load()).products[0].model,'Teste')
 state=await catalog.save({...p,id:undefined,name:'Cópia',quantity:1})
 assert.equal(state.products[0].lengthCm,10.5)
 const copy=state.products[0]
 state=await catalog.save({...copy,category:'Case',compatibleWith:'BIC',includesLighter:false},copy.revision)
 assert.equal(state.products[0].diameter,null)
 assert.equal(state.products[0].includesLighter,false)
})
