import './Ticker.css'

const items = [
  'Piteiras',
  '✦',
  'Cases de isqueiro',
  '✦',
  'Cuias',
  '✦',
  'Seu ritual',
  '✦',
  'Cor e personalidade',
  '✦',
  'Nos detalhes',
  '✦',
  'Studio Rituá',
  '✦',
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
