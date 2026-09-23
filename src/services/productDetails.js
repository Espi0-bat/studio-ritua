function measure(value, label) {
  if (value == null || String(value).trim() === '') return null
  const text = String(value).trim()
  const number = Number(text.replace(',', '.'))
  if ((typeof value !== 'number' && !/^\d+(?:[.,]\d+)?$/.test(text)) || !Number.isFinite(number) || number <= 0 || number > 10000) throw new Error(`${label}: informe um número maior que zero e até 10.000.`)
  return number
}
function shortText(value, label, max) {
  const text = String(value ?? '').trim()
  if (text.length > max) throw new Error(`${label}: use até ${max} caracteres.`)
  return text || null
}
export const piteiraLines = ['Premium', 'Classica']
export function normalizeDetails(input) {
  const isUnique = input.isUnique ?? null
  if (isUnique !== null && typeof isUnique !== 'boolean') throw new Error('Confira a indicação de peça única.')
  const piteira = input.category === 'Piteira'
  const isCase = input.category === 'Case'
  const diameter = piteira ? measure(input.diameter, 'Diâmetro') : null
  const diameterUnit = piteira ? input.diameterUnit || null : null
  if (diameter !== null && !['cm', 'mm'].includes(diameterUnit)) throw new Error('Selecione a unidade do diâmetro: cm ou mm.')
  if (diameter === null && diameterUnit !== null) throw new Error('Informe o diâmetro ou deixe sua unidade sem seleção.')
  const includesLighter = isCase ? input.includesLighter ?? null : null
  if (includesLighter !== null && typeof includesLighter !== 'boolean') throw new Error('Informe se acompanha isqueiro: Sim, Não ou Não informado.')
  const line = piteira ? input.line || null : null
  if (line !== null && !piteiraLines.includes(line)) throw new Error('Selecione a linha da piteira: Premium ou Clássica.')
  return { isUnique,
    lengthCm: piteira ? measure(input.lengthCm, 'Comprimento') : null,
    diameter, diameterUnit,
    model: piteira ? shortText(input.model, 'Modelo', 120) : null,
    line,
    compatibleWith: isCase ? shortText(input.compatibleWith, 'Compatível com', 200) : null,
    includesLighter }
}
const formatMeasure = value => Number(value).toLocaleString('pt-BR', { maximumFractionDigits: 20, useGrouping: false })
export function productSpecs(product) {
  const specs = {}
  if (product.category === 'Piteira') {
    if (product.lengthCm != null && product.lengthCm !== '') specs.Comprimento = `${formatMeasure(product.lengthCm)} cm`
    if (product.diameter != null && product.diameter !== '' && product.diameterUnit) specs['Diâmetro'] = `${formatMeasure(product.diameter)} ${product.diameterUnit}`
    if (product.model) specs.Modelo = product.model
  }
  if (product.category === 'Case') {
    if (product.compatibleWith) specs['Compatível com'] = product.compatibleWith
    if (typeof product.includesLighter === 'boolean') specs['Acompanha isqueiro'] = product.includesLighter ? 'Sim' : 'Não'
  }
  return Object.keys(specs).length ? specs : undefined
}
