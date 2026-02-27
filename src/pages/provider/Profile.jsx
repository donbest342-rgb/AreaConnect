import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import { Card, Input, Textarea, Btn } from '../../components/UI'
import { User, Mail, Phone, Briefcase, MapPin, Home, Lock, Camera } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user, setUser } = useAuth()
  const [saving, setSaving] = useState(false)
  const [savingPw, setSavingPw] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '', phoneNumber: user?.phoneNumber || '',
    profession: user?.profession || '', location: user?.location || '',
    address: user?.address || '', bio: user?.bio || '',
  })
  const [pw, setPw] = useState({ currentPassword:'', newPassword:'', confirm:'' })
  const [pwErr, setPwErr] = useState({})
const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null) 
const [avatarFile, setAvatarFile] = useState(null)

  const set = (k) => (e) => setForm(f => ({...f, [k]: e.target.value}))
  const setPwField = (k) => (e) => { setPw(f => ({...f, [k]: e.target.value})); setPwErr(er => ({...er, [k]:''})) }

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { toast.error('Max file size is 5MB'); return }
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k,v]) => fd.append(k, v))
      if (avatarFile) fd.append('avatar', avatarFile)
      const { data } = await api.put('/providers/me', fd,)
      setUser(data.data.provider)
      if (data.data.provider.avatar) {
      setAvatarPreview(data.data.provider.avatar)}
      localStorage.setItem('user', JSON.stringify(data.data.provider))
      toast.success('Profile updated')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update')
    } finally { setSaving(false) }
  }

  const savePassword = async (e) => {
    e.preventDefault()
    const e2 = {}
    if (!pw.currentPassword) e2.currentPassword = 'Required'
    if (!pw.newPassword || pw.newPassword.length < 6) e2.newPassword = 'Min 6 characters'
    if (pw.newPassword !== pw.confirm) e2.confirm = 'Passwords do not match'
    if (Object.keys(e2).length) { setPwErr(e2); return }
    setSavingPw(true)
    try {
      await api.put('/providers/me/password', { currentPassword: pw.currentPassword, newPassword: pw.newPassword })
      toast.success('Password changed')
      setPw({ currentPassword:'', newPassword:'', confirm:'' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password')
    } finally { setSavingPw(false) }
  }

  return (
    <div className="fade-up">
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:24, marginBottom:4 }}>My Profile</h1>
        <p style={{ color:'var(--muted)', fontSize:14 }}>Update your personal information</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        {/* Profile form */}
        <Card style={{ padding:24, gridColumn:'1 / -1' }}>
          <form onSubmit={saveProfile}>
            {/* Avatar */}
            <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:24, paddingBottom:24, borderBottom:'1px solid var(--border)' }}>
              <div style={{ position:'relative' }}>
                <div style={{
                  width:80, height:80, borderRadius:'50%', background:'var(--accent-lt)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:28, fontWeight:700, color:'var(--accent)', overflow:'hidden', border:'2px solid var(--border)',
                }}>
                  {avatarPreview ? <img src={avatarPreview} alt="avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : user?.name?.[0]?.toUpperCase()}
                </div>
                <label style={{
                  position:'absolute', bottom:0, right:0, background:'var(--accent)', borderRadius:'50%',
                  width:26, height:26, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
                }}>
                  <Camera size={13} color="#fff" />
                  <input type="file" accept="image/*" onChange={handleAvatar} style={{ display:'none' }} />
                </label>
              </div>
              <div>
                <div style={{ fontWeight:600, fontSize:16 }}>{user?.name}</div>
                <div style={{ fontSize:13, color:'var(--muted)' }}>{user?.email}</div>
                <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>Click the camera icon to change avatar</div>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
              <Input label="Full Name" icon={User} value={form.name} onChange={set('name')} />
              <Input label="Phone Number" icon={Phone} value={form.phoneNumber} onChange={set('phoneNumber')} />
              <Input label="Profession" icon={Briefcase} value={form.profession} onChange={set('profession')} />
              <Input label="Location / City" icon={MapPin} value={form.location} onChange={set('location')} />
              <div style={{ gridColumn:'1 / -1' }}>
                <Input label="Address" icon={Home} value={form.address} onChange={set('address')} />
              </div>
              <div style={{ gridColumn:'1 / -1' }}>
                <Textarea label="Bio" value={form.bio} onChange={set('bio')} style={{ minHeight:100 }} />
              </div>
            </div>

            <Btn type="submit" loading={saving}>Save Profile</Btn>
          </form>
        </Card>

        {/* Change password */}
        <Card style={{ padding:24, gridColumn:'1 / -1' }}>
          <h3 style={{ fontSize:16, marginBottom:20 }}>Change Password</h3>
          <form onSubmit={savePassword}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, marginBottom:14 }}>
              <Input label="Current Password" type="password" icon={Lock} value={pw.currentPassword} onChange={setPwField('currentPassword')} error={pwErr.currentPassword} />
              <Input label="New Password" type="password" icon={Lock} value={pw.newPassword} onChange={setPwField('newPassword')} error={pwErr.newPassword} />
              <Input label="Confirm Password" type="password" icon={Lock} value={pw.confirm} onChange={setPwField('confirm')} error={pwErr.confirm} />
            </div>
            <Btn type="submit" variant="ghost" loading={savingPw}>Update Password</Btn>
          </form>
        </Card>
      </div>
    </div>
  )
}
