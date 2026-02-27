import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { LayoutDashboard, Users, UserCheck, ShieldCheck } from 'lucide-react'

const LINKS = [
  { to: '/admin',          label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/admin/providers',label: 'Providers',  icon: Users },
  { to: '/admin/admins',   label: 'Admins',     icon: ShieldCheck },
]

export default function AdminLayout() {
  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      <Sidebar links={LINKS} accentColor="var(--blue)" />
      <main style={{ flex:1, padding:'32px 32px', overflowX:'hidden', minWidth:0 }}>
        <Outlet />
      </main>
    </div>
  )
}
