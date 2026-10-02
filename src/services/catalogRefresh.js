// A consulta periódica do catálogo só precisa rodar com a aba à vista: aba oculta não
// mostra disponibilidade a ninguém. Ao voltar, a página atualiza na hora, para não deixar
// na tela uma peça que já saiu. `doc`, `win` e os temporizadores entram por parâmetro
// porque é o que torna este agendamento testável sem navegador.
export function startCatalogRefresh(refresh, {
  interval = 60000, minGap = 5000, doc = document, win = window,
  setTimer = setInterval, clearTimer = clearInterval, now = Date.now,
} = {}) {
  let timer = null
  let ultima = 0
  const run = () => { ultima = now(); refresh() }
  const start = () => { if (timer === null) timer = setTimer(run, interval) }
  const stop = () => { if (timer !== null) { clearTimer(timer); timer = null } }
  // Voltar para a aba dispara `visibilitychange` e `focus` quase juntos: a janela curta
  // evita duas consultas para o mesmo retorno.
  const onReturn = () => { if (doc.hidden || now() - ultima < minGap) return; run() }
  const onVisibility = () => { if (doc.hidden) stop(); else { start(); onReturn() } }
  run()
  if (!doc.hidden) start()
  doc.addEventListener('visibilitychange', onVisibility)
  win.addEventListener('focus', onReturn)
  return () => {
    stop()
    doc.removeEventListener('visibilitychange', onVisibility)
    win.removeEventListener('focus', onReturn)
  }
}
