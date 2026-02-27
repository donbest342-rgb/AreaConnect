import { useState, useEffect } from 'react'
import api from '../../api/axios'
import { Card, Btn, Input, Textarea, Select, Badge, Modal, Empty, PageLoader } from '../../components/UI'
import { Plus, Pencil, Trash2, Wrench } from 'lucide-react'
import toast from 'react-hot-toast'

const BLANK = { title:'', description:'', price:'', pricing:'fixed' }

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [modal, setModal]       = useState(null) // null | 'add' | 'edit'
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState(BLANK)
  const [err, setErr]           = useState({})

  const load = async () => {
    try {
      const { data } = await api.get('/providers/me/services')
      setServices(data.data.services)
    } catch { toast.error('Failed to load services') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const set = (k) => (e) => { setForm(f => ({...f, [k]: e.target.value})); setErr(er => ({...er, [k]:''})) }

  const validate = () => {
    const e = {}
    if (!form.title)       e.title = 'Title required'
    if (!form.description) e.description = 'Description required'
    if (!form.price)       e.price = 'Price required'
    setErr(e)
    return !Object.keys(e).length
  }

  const openAdd = () => { setForm(BLANK); setErr({}); setEditing(null); setModal('edit') }
  const openEdit = (sv) => { setForm({ title:sv.title, description:sv.description, price:sv.price, pricing:sv.pricing }); setEditing(sv._id); setErr({}); setModal('edit') }
  const closeModal = () => { setModal(null); setEditing(null) }

  const save = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    try {
      if (editing) {
        await api.put(`/providers/me/services/${editing}`, form)
        toast.success('Service updated')
      } else {
        await api.post('/providers/me/services', form)
        toast.success('Service added')
      }
      closeModal()
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save service')
    } finally { setSaving(false) }
  }

  const remove = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return
    try {
      await api.delete(`/providers/me/services/${id}`)
      toast.success('Service removed')
      load()
    } catch { toast.error('Failed to delete') }
  }

  const PRICING_COLOR = { fixed:'info', hourly:'accent', negotiable:'warning' }

  if (loading) return <PageLoader />

  return (
    <div className="fade-up">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28 }}>
        <div>
          <h1 style={{ fontSize:24, marginBottom:4 }}>My Services</h1>
          <p style={{ color:'var(--muted)', fontSize:14 }}>{services.length} service{services.length !== 1 ? 's' : ''} listed</p>
        </div>
        <Btn onClick={openAdd} style={{ gap:8 }}><Plus size={16} /> Add Service</Btn>
      </div>

      {services.length === 0 ? (
        <Card>
          <Empty icon={Wrench} title="No services yet" desc="Add your first service to start getting discovered by customers."
            action={<Btn onClick={openAdd}><Plus size={15} /> Add Service</Btn>} />
        </Card>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:16 }}>
          {services.map(sv => (
            <Card key={sv._id} style={{ padding:20 }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:10 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <h3 style={{ fontSize:15, marginBottom:4 }} className="truncate">{sv.title}</h3>
                  <Badge type={PRICING_COLOR[sv.pricing]}>{sv.pricing}</Badge>
                </div>
                <div style={{ display:'flex', gap:6, marginLeft:8 }}>
                  <button onClick={() => openEdit(sv)} style={{ background:'var(--bg2)', border:'none', borderRadius:6, padding:'6px', cursor:'pointer', color:'var(--muted)', display:'flex' }}>
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => remove(sv._id, sv.title)} style={{ background:'var(--red-lt)', border:'none', borderRadius:6, padding:'6px', cursor:'pointer', color:'var(--red)', display:'flex' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p style={{ fontSize:13, color:'var(--muted)', marginBottom:12, lineHeight:1.5 }}>{sv.description}</p>
              <div style={{ fontFamily:'monospace', fontSize:15, fontWeight:700, color:'var(--accent)' }}>₦{sv.price}</div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={modal === 'edit'} onClose={closeModal} title={editing ? 'Edit Service' : 'Add New Service'}>
        <form onSubmit={save} style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <Input label="Service Title" placeholder="e.g. Pipe Repair" value={form.title} onChange={set('title')} error={err.title} />
          <Textarea label="Description" placeholder="What's included in this service..." value={form.description} onChange={set('description')} error={err.description} />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <Input label="Price (₦)" type="number" placeholder="5000" value={form.price} onChange={set('price')} error={err.price} />
            <Select label="Pricing Type" value={form.pricing} onChange={set('pricing')}>
              <option value="fixed">Fixed</option>
              <option value="hourly">Hourly</option>
              <option value="negotiable">Negotiable</option>
            </Select>
          </div>
          <div style={{ display:'flex', gap:10, marginTop:4 }}>
            <Btn type="button" variant="ghost" onClick={closeModal} style={{ flex:1, justifyContent:'center' }}>Cancel</Btn>
            <Btn type="submit" loading={saving} style={{ flex:1, justifyContent:'center' }}>
              {editing ? 'Update Service' : 'Add Service'}
            </Btn>
          </div>
        </form>
      </Modal>
    </div>
  )
}
