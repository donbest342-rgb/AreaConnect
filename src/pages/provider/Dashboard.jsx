import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import { StatCard, Card, Badge, PageLoader, Btn } from '../../components/UI'
import { Wrench, Image, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react'

export default function ProviderDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/providers/dashboard').then(({ data }) => {
      setStats(data.data)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <PageLoader />

  const s = stats?.stats || {}

  return (
    <div className="fade-up">
      {/* Header */}
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:26, marginBottom:4 }}>
          Good day, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color:'var(--muted)', fontSize:14 }}>Here's your provider overview</p>
      </div>

      {/* Approval banner */}
      {!s.isApproved && (
        <div style={{
          background:'var(--yellow-lt)', border:'1px solid var(--yellow)', borderRadius:10,
          padding:'14px 18px', marginBottom:24, display:'flex', alignItems:'center', gap:12,
        }}>
          <Clock size={18} style={{ color:'var(--yellow)', flexShrink:0 }} />
          <div>
            <div style={{ fontWeight:600, fontSize:14, color:'var(--yellow)' }}>Pending Approval</div>
            <div style={{ fontSize:13, color:'var(--muted)' }}>Your account is awaiting admin review. You won't appear in search until approved.</div>
          </div>
        </div>
      )}

      {!s.isActive && (
        <div style={{
          background:'var(--red-lt)', border:'1px solid var(--red)', borderRadius:10,
          padding:'14px 18px', marginBottom:24, display:'flex', alignItems:'center', gap:12,
        }}>
          <AlertCircle size={18} style={{ color:'var(--red)', flexShrink:0 }} />
          <div>
            <div style={{ fontWeight:600, fontSize:14, color:'var(--red)' }}>Account Deactivated</div>
            <div style={{ fontSize:13, color:'var(--muted)' }}>Please contact support to reactivate your account.</div>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:16, marginBottom:28 }}>
        <StatCard icon={Wrench} label="Total Services" value={s.totalServices ?? 0} color="var(--accent)" />
        <StatCard icon={Image} label="Portfolio Images" value={s.portfolioImages ?? 0} color="var(--blue)" />
        <StatCard icon={CheckCircle} label="Status" value={s.isApproved ? 'Approved' : 'Pending'} color={s.isApproved ? 'var(--green)' : 'var(--yellow)'} />
        <StatCard icon={Clock} label="Member Since" value={s.memberSince ? new Date(s.memberSince).toLocaleDateString('en', { month:'short', year:'numeric' }) : '—'} color="var(--muted)" />
      </div>

      {/* Services preview */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <Card style={{ padding:24 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <h3 style={{ fontSize:15 }}>My Services</h3>
            <Link to="/provider/services" style={{ fontSize:13, color:'var(--accent)', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
              Manage <ArrowRight size={13} />
            </Link>
          </div>
          {stats?.provider?.services?.length ? (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {stats.provider.services.slice(0,4).map(sv => (
                <div key={sv._id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
                  <span style={{ fontSize:13, fontWeight:500 }}>{sv.title}</span>
                  <span style={{ fontSize:12, color:'var(--muted)' }}>₦{sv.price}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'20px 0' }}>
              <p style={{ color:'var(--muted)', fontSize:13, marginBottom:12 }}>No services added yet</p>
              <Link to="/provider/services">
                <Btn size="sm">Add First Service</Btn>
              </Link>
            </div>
          )}
        </Card>

        <Card style={{ padding:24 }}>
          <h3 style={{ fontSize:15, marginBottom:16 }}>Profile Completeness</h3>
          {[
            { label:'Name & Email', done: true },
            { label:'Phone Number', done: !!stats?.provider?.phoneNumber },
            { label:'Profession', done: !!stats?.provider?.profession },
            { label:'Location', done: !!stats?.provider?.location },
            { label:'Bio', done: !!stats?.provider?.bio },
            { label:'Avatar', done: !!stats?.provider?.avatar },
            { label:'Services added', done: (stats?.provider?.services?.length || 0) > 0 },
            { label:'Portfolio images', done: (stats?.provider?.portfolio?.length || 0) > 0 },
          ].map(item => (
            <div key={item.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid var(--border)' }}>
              <span style={{ fontSize:13 }}>{item.label}</span>
              <Badge type={item.done ? 'success' : 'warning'}>{item.done ? 'Done' : 'Pending'}</Badge>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
