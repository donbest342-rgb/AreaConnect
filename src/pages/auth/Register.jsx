import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Input, Textarea, Select, Btn } from '../../components/UI'
import { User, Mail, Phone, Lock, Briefcase, MapPin, Home, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import logo from '../../Assets/logoA.png'

const STEPS = ['Account', 'Location', 'Profile']

export default function Register() {
  const { registerProvider, loading } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name:'', email:'', phoneNumber:'', password:'', confirmPassword:'',
    profession:'', location:'', address:'', bio:'',
  })
  const [err, setErr] = useState({})

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    setErr(er => ({ ...er, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (step === 0) {
      if (!form.name)          e.name = 'Name is required'
      if (!form.email)         e.email = 'Email is required'
      if (!form.phoneNumber)   e.phoneNumber = 'Phone is required'
      if (!form.password || form.password.length < 6) e.password = 'Min 6 characters'
      if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    }
    if (step === 1) {
      if (!form.profession) e.profession = 'Profession is required'
      if (!form.location)   e.location = 'Location is required'
      if (!form.address)    e.address = 'Address is required'
    }
    if (step === 2) {
      if (!form.bio || form.bio.length < 20) e.bio = 'Bio must be at least 20 characters'
    }
    setErr(e)
    return !Object.keys(e).length
  }

  const next = () => { if (validate()) setStep(s => s + 1) }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    const { confirmPassword, ...payload } = form
    const res = await registerProvider(payload)
    if (res.ok) {
      toast.success('Registered! Awaiting admin approval.')
      navigate('/provider')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', padding:16 }}>
      <div style={{ position:'fixed', left:0, top:0, bottom:0, width:6, background:'linear-gradient(180deg, var(--accent) 0%, #0059ff 100%)' }} />

      <div style={{ width:'100%', maxWidth:480, animation:'fadeUp .4s ease' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:12 }}>
            <img src={logo} alt="Logo" style={{ width:45, height:50, objectFit:'contain' }} />
            {/* <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:18 }}>AreaConnect</span> */}
          </div>
          <h1 style={{ fontSize:24, marginBottom:4 }}>Create Provider Account</h1>
          <p style={{ color:'var(--muted)', fontSize:13 }}>Join as a service provider</p>
        </div>

        {/* Step indicators */}
        <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:28 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <div style={{ display:'flex', alignItems:'center', width:'100%' }}>
                {i > 0 && <div style={{ flex:1, height:2, background: i <= step ? 'var(--accent)' : 'var(--border)' }} />}
                <div style={{
                  width:28, height:28, borderRadius:'50%', border: `2px solid ${i <= step ? 'var(--accent)' : 'var(--border)'}`,
                  background: i < step ? 'var(--accent)' : i === step ? 'var(--accent-lt)' : 'var(--surface)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12, fontWeight:700, color: i <= step ? (i < step ? '#fff' : 'var(--accent)') : 'var(--muted)',
                }}>{i < step ? '✓' : i+1}</div>
                {i < STEPS.length - 1 && <div style={{ flex:1, height:2, background: i < step ? 'var(--accent)' : 'var(--border)' }} />}
              </div>
              <span style={{ fontSize:11, color: i === step ? 'var(--accent)' : 'var(--muted)', fontWeight: i === step ? 600 : 400 }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ background:'var(--surface)', borderRadius:14, padding:28, boxShadow:'var(--shadow-lg)', border:'1px solid var(--border)' }}>
          <form onSubmit={submit}>
            {/* Step 0: Account */}
            {step === 0 && (
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <h3 style={{ fontSize:16, marginBottom:4 }}>Account Details</h3>
                <Input label="Full Name" placeholder="John Doe" icon={User} value={form.name} onChange={set('name')} error={err.name} />
                <Input label="Email" type="email" placeholder="john@example.com" icon={Mail} value={form.email} onChange={set('email')} error={err.email} />
                <Input label="Phone Number" placeholder="+2348012345678" icon={Phone} value={form.phoneNumber} onChange={set('phoneNumber')} error={err.phoneNumber} />
                <Input label="Password" type="password" placeholder="Min 6 characters" icon={Lock} value={form.password} onChange={set('password')} error={err.password} />
                <Input label="Confirm Password" type="password" placeholder="Repeat password" icon={Lock} value={form.confirmPassword} onChange={set('confirmPassword')} error={err.confirmPassword} />
              </div>
            )}

            {/* Step 1: Location */}
            {step === 1 && (
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <h3 style={{ fontSize:16, marginBottom:4 }}>Your Profession & Location</h3>
                <Input label="Profession" placeholder="e.g. Plumber, Electrician" icon={Briefcase} value={form.profession} onChange={set('profession')} error={err.profession} />
                <Input label="City / Area" placeholder="e.g. Lagos, Abuja" icon={MapPin} value={form.location} onChange={set('location')} error={err.location} />
                <Input label="Full Address" placeholder="Street, Neighbourhood" icon={Home} value={form.address} onChange={set('address')} error={err.address} />
              </div>
            )}

            {/* Step 2: Profile */}
            {step === 2 && (
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <h3 style={{ fontSize:16, marginBottom:4 }}>Tell Clients About You</h3>
                <Textarea label="Bio (min 20 characters)" placeholder="Describe your experience, skills, and what makes you the best choice..."
                  value={form.bio} onChange={set('bio')} error={err.bio} style={{ minHeight:120 }} />
                <div style={{ background:'var(--blue-lt)', border:'1px solid var(--blue)', borderRadius:8, padding:'10px 14px', fontSize:13, color:'var(--blue)' }}>
                  ℹ️ After registration, an admin will review and approve your account before you can appear in search results.
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display:'flex', gap:10, marginTop:24 }}>
              {step > 0 && (
                <Btn type="button" variant="ghost" onClick={() => setStep(s => s-1)} style={{ flex:1, justifyContent:'center' }}>Back</Btn>
              )}
              {step < 2 ? (
                <Btn type="button" onClick={next} style={{ flex:1, justifyContent:'center' }}>Continue</Btn>
              ) : (
                <Btn type="submit" loading={loading} style={{ flex:1, justifyContent:'center' }}>Create Account</Btn>
              )}
            </div>
          </form>

          <p style={{ textAlign:'center', marginTop:20, fontSize:13, color:'var(--muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color:'var(--accent)', fontWeight:600 }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
