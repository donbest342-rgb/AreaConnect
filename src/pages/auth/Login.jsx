import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Input, Btn } from '../../components/UI'
import { Mail, Lock, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import logo from '../../Assets/logoA.png'

export default function Login() {
  const { loginProvider, loginAdmin, loading } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab]   = useState('provider')
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr]   = useState({})

  const set = (k) => (e) => { setForm(f => ({ ...f, [k]: e.target.value })); setErr(er => ({ ...er, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email is required'
    if (!form.password) e.password = 'Password is required'
    setErr(e)
    return !Object.keys(e).length
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    const fn  = tab === 'admin' ? loginAdmin : loginProvider
    const res = await fn(form.email, form.password)
    if (res.ok) {
      toast.success('Welcome back!')
      navigate(tab === 'admin' ? '/admin' : '/provider')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', padding:16 }}>
      {/* Left decorative strip */}
      <div style={{
        position:'fixed', left:0, top:0, bottom:0, width:6,
        background:'linear-gradient(180deg, var(--accent) 0%, transparent 100%)',
      }} />

      <div style={{ width:'100%', maxWidth:420, animation:'fadeUp .4s ease' }}>
        {/* Brand */}
        <div style={{ textAlign:'center', marginBottom:36 }}>
            <img src={logo} alt="Logo" style={{ width:45, height:50, objectFit:'contain' }} />
          
          {/* <h1 style={{ fontSize:28, marginBottom:6 }}>AreaConnect</h1> */}
          {/* <p style={{ color:'var(--muted)', fontSize:14 }}>Service Provider Marketplace</p> */}
        </div>

        {/* Tab switcher */}
        <div style={{ display:'flex', background:'var(--bg2)', borderRadius:10, padding:4, marginBottom:28 }}>
          {['provider','admin'].map(t => (
            <button key={t} onClick={() => { setTab(t); setErr({}) }} style={{
              flex:1, padding:'8px 0', borderRadius:8, border:'none', fontSize:13, fontWeight:600,
              background: tab === t ? 'var(--surface)' : 'transparent',
              color: tab === t ? 'var(--text)' : 'var(--muted)',
              boxShadow: tab === t ? 'var(--shadow)' : 'none',
              cursor:'pointer', transition:'all .2s', textTransform:'capitalize',
            }}>{t === 'provider' ? 'Provider Login' : 'Admin Login'}</button>
          ))}
        </div>

        <div style={{ background:'var(--surface)', borderRadius:14, padding:28, boxShadow:'var(--shadow-lg)', border:'1px solid var(--border)' }}>
          <h2 style={{ fontSize:20, marginBottom:4 }}>Sign in</h2>
          <p style={{ color:'var(--muted)', fontSize:13, marginBottom:24 }}>
            {tab === 'admin' ? 'Admin & superadmin access' : 'Access your provider dashboard'}
          </p>

          <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <Input label="Email" type="email" placeholder="you@example.com" icon={Mail}
              value={form.email} onChange={set('email')} error={err.email} />
            <Input label="Password" type="password" placeholder="••••••••" icon={Lock}
              value={form.password} onChange={set('password')} error={err.password} />
            <Btn type="submit" loading={loading} style={{ marginTop:4, justifyContent:'center' }}>
              Sign In
            </Btn>
          </form>

          {tab === 'provider' && (
            <p style={{ textAlign:'center', marginTop:20, fontSize:13, color:'var(--muted)' }}>
              No account?{' '}
              <Link to="/register" style={{ color:'var(--accent)', fontWeight:600 }}>Register as provider</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
