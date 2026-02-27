import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import logo from '../Assets/logoA.png'

export default function Sidebar({ links, accentColor = 'var(--accent)' }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
    toast.success('Logged out')
  }

  return (
    <aside style={{
      width: 'var(--sidebar-w)', flexShrink: 0, background: 'var(--surface)',
      borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
    }}>
      {/* Brand */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
          <img src={logo} alt="Logo" style={{ width:45, height:50, objectFit:'contain' }} />
          <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:16, letterSpacing:'-0.3px' }}>AreaConnect</span>
        </div>
        {user && (
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{
              width:36, height:36, borderRadius:'50%', background: accentColor + '22',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:14, fontWeight:700, color: accentColor, flexShrink:0,
            }}>
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div style={{ minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user.name}</div>
              <div style={{ fontSize:11, color:'var(--muted)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user.email}</div>
            </div>
          </div>
        )}
      </div>

      {/* Nav links */}
      <nav style={{ flex:1, padding:'12px 10px' }}>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to.split('/').length === 2}
            style={({ isActive }) => ({
              display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
              borderRadius:8, fontSize:14, fontWeight:500, marginBottom:2,
              color: isActive ? accentColor : 'var(--muted)',
              background: isActive ? accentColor + '12' : 'transparent',
              transition:'all .15s',
              textDecoration:'none',
            })}>
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding:'12px 10px', borderTop:'1px solid var(--border)' }}>
        <button onClick={handleLogout} style={{
          display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
          borderRadius:8, fontSize:14, fontWeight:500, color:'var(--muted)',
          background:'none', border:'none', width:'100%', cursor:'pointer',
          transition:'all .15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--red-lt)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  )
}
