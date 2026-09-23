import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { liveCatalog } from '../services/liveCatalog'
import Admin from './Admin'
import './Admin.css'
export default function AdminEntry() {
  const demo = window.location.hash === '#/admin/demo' || (!supabase && import.meta.env.DEV)
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(!demo)
  const [allowed, setAllowed] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    if (demo || !supabase) return
    let active = true
    supabase.auth.getSession().then(({ data, error }) => { if (active) { setSession(data.session); if (error) setError('O link de acesso está inválido ou expirou. Peça um novo link.'); setChecking(false); if (new URLSearchParams(location.search).get('admin') === '1') { history.replaceState(null, '', `${location.pathname}#/admin`); window.dispatchEvent(new HashChangeEvent('hashchange')) } } })
    const { data } = supabase.auth.onAuthStateChange((_event, value) => { setSession(value) })
    return () => { active = false; data.subscription.unsubscribe() }
  }, [demo])
  useEffect(() => {
    if (!session || demo) return
    let active = true; setChecking(true)
    supabase.rpc('ritua_is_admin').then(({ data, error }) => { if (active) { setAllowed(!error && data === true); setChecking(false); setError(error ? 'Não foi possível verificar seu acesso. Tente novamente.' : data ? '' : 'Seu e-mail não está autorizado a administrar a Rituá.') } })
    return () => { active = false }
  }, [session?.user.id, demo, retry])
  async function submit(e) {
    e.preventDefault(); if (busy) return; setBusy(true); setError('')
    try {
      const redirect = new URL(import.meta.env.BASE_URL, window.location.origin)
      redirect.searchParams.set('admin', '1')
      const { error } = await supabase.auth.signInWithOtp({ email: email.trim().toLowerCase(), options: { emailRedirectTo: redirect.href } })
      if (error) throw new Error(error.status === 429 ? 'Aguarde alguns minutos antes de pedir outro link.' : 'Não foi possível enviar o link. Confira o e-mail e tente novamente. Se persistir, fale com o administrador.')
      setSent(true)
    } catch (e) { setError(e.message) } finally { setBusy(false) }
  }
  async function signOut() { const { error } = await supabase.auth.signOut(); if (error) throw new Error('Não foi possível sair. Confira a conexão e tente novamente.'); else { setSession(null); setAllowed(false); setSent(false) } }
  if (demo) return <Admin />
  if (!supabase) return <main className="admin"><h1>Painel indisponível</h1><p>A conexão do studio precisa ser configurada.</p><a href="#">Voltar ao site</a></main>
  if (session && allowed && !checking) return <Admin catalog={liveCatalog} live userEmail={session.user.email} onSignOut={signOut} />
  return <main className="admin admin-login"><a className="admin-brand" href="#">studio rituá<span>Seu painel de peças</span></a>
    <section className="admin-login-card"><h1>Seu acesso ao studio.</h1>
      {checking ? <p role="status">Conferindo seu acesso…</p> : session ? <><p role="alert">{error}</p><button onClick={() => setRetry(n => n + 1)}>Tentar novamente</button><button onClick={() => signOut().catch(e => setError(e.message))}>Sair desta conta</button></> : <form onSubmit={submit}>
        <p>Entre com seu e-mail autorizado. Enviaremos um link para você entrar, sem precisar de senha.</p>
        <label>E-mail<input type="email" autoComplete="email" required disabled={busy || sent} value={email} onChange={e => setEmail(e.target.value)} /></label>
        {sent && <p role="status">Confira a caixa de entrada e o spam. Abra o link recebido neste navegador. Ele vale por 10 minutos.</p>}
        {error && <p className="admin-error" role="alert">{error}</p>}
        {!sent && <button className="admin-primary" disabled={busy}>{busy ? 'Aguarde…' : 'Receber link de acesso'}</button>}
        {sent && <button type="button" disabled={busy} onClick={() => { setSent(false); setError('') }}>Trocar e-mail ou pedir novo link</button>}
      </form>}
    </section><a href="#">Voltar ao site ↗</a>
  </main>
}
