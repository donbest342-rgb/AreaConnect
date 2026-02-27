import { useState, useEffect, useCallback } from 'react'
import api from '../../api/axios'
import { Card, Btn, Badge, Modal, Input, Textarea, PageLoader, Empty } from '../../components/UI'
import { Users, Search, CheckCircle, XCircle, ToggleLeft, ToggleRight, Eye, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminProviders() {
  const [providers, setProviders] = useState([])
  const [loading, setLoading]     = useState(true)
  const [pagination, setPag]      = useState({ page:1, pages:1, total:0 })
  const [filters, setFilters]     = useState({ search:'', isApproved:'', isActive:'', page:1 })
  const [detail, setDetail]       = useState(null)
  const [actionModal, setActionModal] = useState(null) // {type, provider}
  const [reason, setReason]       = useState('')
  const [acting, setActing]       = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search)    params.set('search',     filters.search)
      if (filters.isApproved !== '') params.set('isApproved', filters.isApproved)
      if (filters.isActive   !== '') params.set('isActive',   filters.isActive)
      params.set('page', filters.page)
      params.set('limit', 15)
      const { data } = await api.get('/admin/providers?' + params)
      setProviders(data.data.providers)
      setPag(data.data.pagination)
    } catch { toast.error('Failed to load providers') }
    finally { setLoading(false) }
  }, [filters])

  useEffect(() => { load() }, [load])

  const setF = (k) => (e) => setFilters(f => ({ ...f, [k]: e.target.value, page:1 }))

  const openAction = (type, provider) => { setActionModal({ type, provider }); setReason('') }
  const closeAction = () => { setActionModal(null); setReason('') }

  const doAction = async () => {
    const { type, provider } = actionModal
    setActing(true)
    try {
      const endpoints = {
        approve:    [`/admin/providers/${provider._id}/approve`,    'put', {}],
        revoke:     [`/admin/providers/${provider._id}/revoke`,     'put', { reason }],
        deactivate: [`/admin/providers/${provider._id}/deactivate`, 'put', { reason }],
        reactivate: [`/admin/providers/${provider._id}/reactivate`, 'put', {}],
        delete:     [`/admin/providers/${provider._id}`,            'delete', {}],
      }
      const [url, method, body] = endpoints[type]
      await api[method](url, body)
      const messages = { approve:'Approved!', revoke:'Approval revoked', deactivate:'Account deactivated', reactivate:'Account reactivated', delete:'Provider deleted' }
      toast.success(messages[type])
      closeAction()
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed')
    } finally { setActing(false) }
  }

  const viewDetail = async (id) => {
    try {
      const { data } = await api.get(`/admin/providers/${id}`)
      setDetail(data.data.provider)
    } catch { toast.error('Failed to load provider') }
  }

  const statusBadge = (p) => {
    if (!p.isActive)   return <Badge type="danger">Deactivated</Badge>
    if (p.isApproved)  return <Badge type="success">Approved</Badge>
    return <Badge type="warning">Pending</Badge>
  }

  return (
    <div className="fade-up">
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:24, marginBottom:4 }}>Providers</h1>
        <p style={{ color:'var(--muted)', fontSize:14 }}>{pagination.total} total provider{pagination.total !== 1 ? 's' : ''}</p>
      </div>

      {/* Filters */}
      <Card style={{ padding:16, marginBottom:20 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 180px 180px', gap:12, alignItems:'end' }}>
          <div style={{ position:'relative' }}>
            <Search size={15} style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'var(--muted)' }} />
            <input value={filters.search} onChange={setF('search')} placeholder="Search name, email, phone..."
              style={{ width:'100%', padding:'9px 12px 9px 34px', border:'1.5px solid var(--border)', borderRadius:8, fontSize:14, background:'var(--surface)', color:'var(--text)', outline:'none' }} />
          </div>
          <select value={filters.isApproved} onChange={setF('isApproved')}
            style={{ padding:'9px 14px', border:'1.5px solid var(--border)', borderRadius:8, fontSize:14, background:'var(--surface)', color:'var(--text)', outline:'none' }}>
            <option value="">All Statuses</option>
            <option value="true">Approved</option>
            <option value="false">Pending / Revoked</option>
          </select>
          <select value={filters.isActive} onChange={setF('isActive')}
            style={{ padding:'9px 14px', border:'1.5px solid var(--border)', borderRadius:8, fontSize:14, background:'var(--surface)', color:'var(--text)', outline:'none' }}>
            <option value="">All Active States</option>
            <option value="true">Active</option>
            <option value="false">Deactivated</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card style={{ padding:0, overflow:'hidden' }}>
        {loading ? <PageLoader /> : providers.length === 0 ? (
          <Empty icon={Users} title="No providers found" desc="Try adjusting your filters." />
        ) : (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:'var(--bg)', borderBottom:'2px solid var(--border)' }}>
                  {['Provider','Profession','Location','Status','Joined','Actions'].map(h => (
                    <th key={h} style={{ textAlign:'left', padding:'12px 16px', color:'var(--muted)', fontWeight:600, whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {providers.map(p => (
                  <tr key={p._id} style={{ borderBottom:'1px solid var(--border)' }}
                    onMouseEnter={e => e.currentTarget.style.background='var(--bg)'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <td style={{ padding:'12px 16px' }}>
                      <div style={{ fontWeight:600 }}>{p.name}</div>
                      <div style={{ color:'var(--muted)', fontSize:12 }}>{p.email}</div>
                    </td>
                    <td style={{ padding:'12px 16px' }}>{p.profession}</td>
                    <td style={{ padding:'12px 16px', color:'var(--muted)' }}>{p.location}</td>
                    <td style={{ padding:'12px 16px' }}>{statusBadge(p)}</td>
                    <td style={{ padding:'12px 16px', color:'var(--muted)', whiteSpace:'nowrap' }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', gap:6, flexWrap:'nowrap' }}>
                        <button title="View" onClick={() => viewDetail(p._id)}
                          style={{ background:'var(--bg2)', border:'none', borderRadius:6, padding:'5px 8px', cursor:'pointer', display:'flex', color:'var(--muted)' }}>
                          <Eye size={14} />
                        </button>
                        {!p.isApproved && p.isActive && (
                          <button title="Approve" onClick={() => openAction('approve', p)}
                            style={{ background:'var(--green-lt)', border:'none', borderRadius:6, padding:'5px 8px', cursor:'pointer', display:'flex', color:'var(--green)' }}>
                            <CheckCircle size={14} />
                          </button>
                        )}
                        {p.isApproved && (
                          <button title="Revoke Approval" onClick={() => openAction('revoke', p)}
                            style={{ background:'var(--yellow-lt)', border:'none', borderRadius:6, padding:'5px 8px', cursor:'pointer', display:'flex', color:'var(--yellow)' }}>
                            <XCircle size={14} />
                          </button>
                        )}
                        {p.isActive ? (
                          <button title="Deactivate" onClick={() => openAction('deactivate', p)}
                            style={{ background:'var(--red-lt)', border:'none', borderRadius:6, padding:'5px 8px', cursor:'pointer', display:'flex', color:'var(--red)' }}>
                            <ToggleLeft size={14} />
                          </button>
                        ) : (
                          <button title="Reactivate" onClick={() => openAction('reactivate', p)}
                            style={{ background:'var(--green-lt)', border:'none', borderRadius:6, padding:'5px 8px', cursor:'pointer', display:'flex', color:'var(--green)' }}>
                            <ToggleRight size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderTop:'1px solid var(--border)' }}>
            <span style={{ fontSize:13, color:'var(--muted)' }}>Page {pagination.page} of {pagination.pages}</span>
            <div style={{ display:'flex', gap:6 }}>
              <Btn size="sm" variant="ghost" disabled={pagination.page <= 1}
                onClick={() => setFilters(f => ({ ...f, page: f.page - 1 }))}>
                <ChevronLeft size={14} />
              </Btn>
              <Btn size="sm" variant="ghost" disabled={pagination.page >= pagination.pages}
                onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))}>
                <ChevronRight size={14} />
              </Btn>
            </div>
          </div>
        )}
      </Card>

      {/* Action confirmation modal */}
      <Modal open={!!actionModal} onClose={closeAction}
        title={actionModal ? { approve:'Approve Provider', revoke:'Revoke Approval', deactivate:'Deactivate Account', reactivate:'Reactivate Account', delete:'Delete Provider' }[actionModal.type] : ''}>
        {actionModal && (
          <div>
            <p style={{ color:'var(--muted)', fontSize:14, marginBottom:16 }}>
              {{
                approve:    `Approve "${actionModal.provider.name}"? They will appear in search results.`,
                revoke:     `Revoke approval for "${actionModal.provider.name}"?`,
                deactivate: `Deactivate "${actionModal.provider.name}"? They will be logged out immediately.`,
                reactivate: `Reactivate "${actionModal.provider.name}"?`,
                delete:     `Permanently delete "${actionModal.provider.name}"? This cannot be undone.`,
              }[actionModal.type]}
            </p>
            {['revoke','deactivate'].includes(actionModal.type) && (
              <div style={{ marginBottom:16 }}>
                <Textarea label="Reason (optional)" placeholder="Why are you taking this action..."
                  value={reason} onChange={e => setReason(e.target.value)} />
              </div>
            )}
            <div style={{ display:'flex', gap:10 }}>
              <Btn variant="ghost" onClick={closeAction} style={{ flex:1, justifyContent:'center' }}>Cancel</Btn>
              <Btn
                variant={['approve','reactivate'].includes(actionModal.type) ? 'success' : 'danger'}
                loading={acting} onClick={doAction} style={{ flex:1, justifyContent:'center' }}>
                Confirm
              </Btn>
            </div>
          </div>
        )}
      </Modal>

      {/* Provider detail modal */}
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Provider Details" width={560}>
        {detail && (
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20, paddingBottom:20, borderBottom:'1px solid var(--border)' }}>
              <div style={{ width:52, height:52, borderRadius:'50%', background:'var(--blue-lt)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, fontWeight:700, color:'var(--blue)' }}>
                {detail.name[0].toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight:700, fontSize:16 }}>{detail.name}</div>
                <div style={{ fontSize:13, color:'var(--muted)' }}>{detail.email} · {detail.phoneNumber}</div>
                <div style={{ marginTop:4 }}>{statusBadge(detail)}</div>
              </div>
            </div>
            {[
              ['Profession', detail.profession],
              ['Location', detail.location],
              ['Address', detail.address],
              ['Services', `${detail.services?.length || 0} service(s)`],
              ['Portfolio', `${detail.portfolio?.length || 0} image(s)`],
              ['Joined', new Date(detail.createdAt).toLocaleDateString()],
            ].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)', fontSize:14 }}>
                <span style={{ color:'var(--muted)' }}>{k}</span>
                <span style={{ fontWeight:500 }}>{v}</span>
              </div>
            ))}
            {detail.bio && (
              <div style={{ marginTop:16 }}>
                <div style={{ fontSize:12, color:'var(--muted)', marginBottom:6, fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>Bio</div>
                <p style={{ fontSize:13, lineHeight:1.6 }}>{detail.bio}</p>
              </div>
            )}
            {detail.deactivationReason && (
              <div style={{ marginTop:16, background:'var(--red-lt)', border:'1px solid var(--red)', borderRadius:8, padding:'10px 14px', fontSize:13 }}>
                <strong style={{ color:'var(--red)' }}>Deactivation reason:</strong> {detail.deactivationReason}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
