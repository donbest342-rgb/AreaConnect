import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import { StatCard, Card, Badge, PageLoader } from '../../components/UI'
import { Users, UserCheck, Clock, UserX, TrendingUp, ArrowRight } from 'lucide-react'

export default function AdminDashboard() {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/dashboard').then(({ data }) => setData(data.data))
      .catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <PageLoader />
  const s = data?.stats || {}

  return (
    <div className="fade-up">
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:26, marginBottom:4 }}>Admin Dashboard</h1>
        <p style={{ color:'var(--muted)', fontSize:14 }}>Platform overview and management</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(170px, 1fr))', gap:16, marginBottom:28 }}>
        <StatCard icon={Users}     label="Total Providers"  value={s.total       ?? 0} color="var(--blue)" />
        <StatCard icon={UserCheck} label="Approved"         value={s.approved    ?? 0} color="var(--green)" />
        <StatCard icon={Clock}     label="Pending Approval" value={s.pending     ?? 0} color="var(--yellow)" />
        <StatCard icon={TrendingUp}label="Active"           value={s.active      ?? 0} color="var(--accent)" />
        <StatCard icon={UserX}     label="Deactivated"      value={s.deactivated ?? 0} color="var(--red)" />
      </div>

      <Card style={{ padding:24 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
          <h3 style={{ fontSize:16 }}>Recent Registrations</h3>
          <Link to="/admin/providers" style={{ fontSize:13, color:'var(--blue)', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
            View All <ArrowRight size={13} />
          </Link>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
            <thead>
              <tr style={{ borderBottom:'2px solid var(--border)' }}>
                {['Name','Email','Profession','Status','Joined'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'8px 12px', color:'var(--muted)', fontWeight:600, whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(data?.recentProviders || []).map(p => (
                <tr key={p._id} style={{ borderBottom:'1px solid var(--border)' }}>
                  <td style={{ padding:'10px 12px', fontWeight:500 }}>{p.name}</td>
                  <td style={{ padding:'10px 12px', color:'var(--muted)' }}>{p.email}</td>
                  <td style={{ padding:'10px 12px' }}>{p.profession}</td>
                  <td style={{ padding:'10px 12px' }}>
                    {p.isApproved ? <Badge type="success">Approved</Badge> :
                     !p.isActive  ? <Badge type="danger">Inactive</Badge> :
                                    <Badge type="warning">Pending</Badge>}
                  </td>
                  <td style={{ padding:'10px 12px', color:'var(--muted)' }}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!data?.recentProviders?.length && (
            <p style={{ textAlign:'center', padding:'24px', color:'var(--muted)', fontSize:14 }}>No providers yet</p>
          )}
        </div>
      </Card>
    </div>
  )
}
