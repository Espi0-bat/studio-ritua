import './Ticker.css'

const items = [
  'Feito à mão',
  '•',
  'Drops exclusivos',
  '•',
  'Peças únicas',
  '•',
  'Cases & cuias',
  '•',
  'Piteiras artísticas',
  '•',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker__item">{item}</span>
        ))}
      </div>
    </div>
  )
}
