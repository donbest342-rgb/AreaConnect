import { useState, useEffect } from 'react'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import { Card, Btn, Badge, Modal, Input, Select, Empty, PageLoader } from '../../components/UI'
import { ShieldCheck, Plus, Trash2, Crown } from 'lucide-react'
import toast from 'react-hot-toast'

const BLANK = { name:'', email:'', password:'', role:'admin' }

export default function AdminAdmins() {
  const { user, role } = useAuth()
  const [admins, setAdmins]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal]     = useState(false)
  const [form, setForm]       = useState(BLANK)
  const [err, setErr]         = useState({})
  const [saving, setSaving]   = useState(false)

  const load = async () => {
    try {
      const { data } = await api.get('/admin/admins')
      setAdmins(data.data.admins)
    } catch { toast.error('Failed to load admins') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const set = (k) => (e) => { setForm(f => ({...f, [k]: e.target.value})); setErr(er => ({...er, [k]:''})) }

  const validate = () => {
    const e = {}
    if (!form.name)  e.name = 'Name required'
    if (!form.email) e.email = 'Email required'
    if (!form.password || form.password.length < 8) e.password = 'Min 8 characters'
    setErr(e)
    return !Object.keys(e).length
  }

  const create = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    try {
      await api.post('/admin/admins', form)
      toast.success('Admin created')
      setModal(false)
      setForm(BLANK)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create')
    } finally { setSaving(false) }
  }

  const remove = async (id, name) => {
    if (!confirm(`Delete admin "${name}"?`)) return
    try {
      await api.delete(`/admin/admins/${id}`)
      toast.success('Admin deleted')
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete')
    }
  }

  if (role !== 'superadmin') {
    return (
      <div className="fade-up">
        <Card style={{ padding:48, textAlign:'center' }}>
          <Crown size={40} style={{ color:'var(--yellow)', marginBottom:16 }} />
          <h2 style={{ fontSize:20, marginBottom:8 }}>Superadmin Access Required</h2>
          <p style={{ color:'var(--muted)', fontSize:14 }}>Only superadmins can manage admin accounts.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="fade-up">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28 }}>
        <div>
          <h1 style={{ fontSize:24, marginBottom:4 }}>Admin Accounts</h1>
          <p style={{ color:'var(--muted)', fontSize:14 }}>{admins.length} admin{admins.length !== 1 ? 's' : ''}</p>
        </div>
        <Btn onClick={() => setModal(true)} style={{ gap:8 }}><Plus size={15} /> Create Admin</Btn>
      </div>

      {loading ? <PageLoader /> : admins.length === 0 ? (
        <Card><Empty icon={ShieldCheck} title="No admins" desc="Create the first admin account." action={<Btn onClick={() => setModal(true)}>Create Admin</Btn>} /></Card>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16 }}>
          {admins.map(a => (
            <Card key={a._id} style={{ padding:20 }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{
                    width:42, height:42, borderRadius:'50%', background: a.role === 'superadmin' ? 'var(--yellow-lt)' : 'var(--blue-lt)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:16, fontWeight:700, color: a.role === 'superadmin' ? 'var(--yellow)' : 'var(--blue)',
                  }}>
                    {a.role === 'superadmin' ? <Crown size={18} /> : a.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight:600, fontSize:14 }}>{a.name}</div>
                    <div style={{ fontSize:12, color:'var(--muted)' }}>{a.email}</div>
                  </div>
                </div>
                <Badge type={a.role === 'superadmin' ? 'warning' : 'info'}>{a.role}</Badge>
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:12, color:'var(--muted)' }}>
                <span>Joined {new Date(a.createdAt).toLocaleDateString()}</span>
                {a._id !== user?._id && a.role !== 'superadmin' && (
                  <button onClick={() => remove(a._id, a.name)}
                    style={{ background:'var(--red-lt)', border:'none', borderRadius:6, padding:'5px 8px', cursor:'pointer', display:'flex', color:'var(--red)' }}>
                    <Trash2 size={13} />
                  </button>
                )}
                {a._id === user?._id && <Badge type="success">You</Badge>}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => { setModal(false); setForm(BLANK); setErr({}) }} title="Create Admin Account">
        <form onSubmit={create} style={{ display:'flex', flexDirection:'column', gap:14, justifyContent:'center' }}>
          <Input label="Full Name" placeholder="Admin Name" value={form.name} onChange={set('name')} error={err.name} />
          <Input label="Email" type="email" placeholder="admin@example.com" value={form.email} onChange={set('email')} error={err.email} />
          <Input label="Password" type="password" placeholder="Min 8 characters" value={form.password} onChange={set('password')} error={err.password} />
          <Select label="Role" value={form.role} onChange={set('role')}>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </Select>
          <div style={{ display:'flex', gap:10, marginTop:4 }}>
            <Btn type="button" variant="ghost" onClick={() => setModal(false)} style={{ flex:1, justifyContent:'center' }}>Cancel</Btn>
            <Btn type="submit" loading={saving} style={{ flex:1, justifyContent:'center' }}>Create Admin</Btn>
          </div>
        </form>
      </Modal>
    </div>
  )
}
