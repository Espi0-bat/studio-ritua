import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { liveCatalog } from '../services/liveCatalog'
import Admin from './Admin'
import './Admin.css'
export default function AdminEntry() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    if (!supabase) return
    let active = true
    supabase.auth.getSession().then(({ data, error }) => { if (active) { setSession(data.session); if (error) setError('Sua sessão expirou ou não pôde ser recuperada. Entre novamente.'); setChecking(false); if (new URLSearchParams(location.search).get('admin') === '1') { history.replaceState(null, '', `${location.pathname}#/admin`); window.dispatchEvent(new HashChangeEvent('hashchange')) } } })
    const { data } = supabase.auth.onAuthStateChange((_event, value) => { setSession(value) })
    return () => { active = false; data.subscription.unsubscribe() }
  }, [])
  useEffect(() => {
    if (!session) return
    let active = true; setChecking(true)
    supabase.rpc('ritua_is_admin').then(({ data, error }) => { if (active) { setAllowed(!error && data === true); setChecking(false); setError(error ? 'Não foi possível verificar seu acesso. Tente novamente.' : data ? '' : 'Seu e-mail não está autorizado a administrar a Rituá.') } })
    return () => { active = false }
  }, [session?.user.id, retry])
  async function submit(e) {
    e.preventDefault(); if (busy) return; setBusy(true); setError('')
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
      if (error) throw new Error(error.status === 429 ? 'Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo.' : error.code === 'email_not_confirmed' ? 'Este acesso ainda não foi confirmado. Fale com o administrador.' : 'E-mail ou senha incorretos. Confira e tente novamente.')
      setPassword('')
    } catch (e) { setError(e.message) } finally { setBusy(false) }
  }
  async function signOut() { const { error } = await supabase.auth.signOut(); if (error) throw new Error('Não foi possível sair. Confira a conexão e tente novamente.'); else { setSession(null); setAllowed(false); setPassword('') } }
  if (!supabase) return <main className="admin"><h1>Painel indisponível</h1><p>A conexão do studio precisa ser configurada.</p><a href="#">Voltar ao site</a></main>
  if (session && allowed && !checking) return <Admin catalog={liveCatalog} userEmail={session.user.email} onSignOut={signOut} />
  return <main className="admin admin-login"><a className="admin-brand" href="#">studio rituá<span>Seu painel de peças</span></a>
    <section className="admin-login-card"><h1>Seu acesso ao studio.</h1>
      {checking ? <p role="status">Conferindo seu acesso…</p> : session ? <><p role="alert">{error}</p><button onClick={() => setRetry(n => n + 1)}>Tentar novamente</button><button onClick={() => signOut().catch(e => setError(e.message))}>Sair desta conta</button></> : <form onSubmit={submit}>
        <p>Entre com seu e-mail e sua senha do studio. Se esquecer a senha, peça uma nova ao administrador.</p>
        <label>E-mail<input type="email" autoComplete="email" required disabled={busy} value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label>Senha<input type="password" autoComplete="current-password" required disabled={busy} value={password} onChange={e => setPassword(e.target.value)} /></label>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button className="admin-primary" disabled={busy}>{busy ? 'Entrando…' : 'Entrar no painel'}</button>
      </form>}
    </section><a href="#">Voltar ao site ↗</a>
  </main>
}
