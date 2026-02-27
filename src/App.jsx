import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'

// Pages
// Pages & Layouts
import Nav from './components/nav.jsx';
import Footer from './components/footer.jsx';
import Workers from './pages/workers.jsx';
import Home from './pages/home.jsx';
import ProProfile from './components/Profile.jsx';
import About from './pages/about.jsx';
import EstimateDetails from './Estimate/estimatedets.jsx';
import Estimatefront from './Estimate/Estimatefront.jsx';
import Contact from './pages/contact.jsx';
import Helpcenter from './pages/helpcenter.jsx';
import CustomerSafetyTipsPage from './pages/customersafety.jsx';
import TermsOfService from './pages/termsandservices.jsx';
import PrivacyPolicy from './pages/privacypolicy.jsx';
import Login    from './pages/auth/Login'
import Register from './pages/auth/Register'

import ProviderLayout   from './pages/provider/Layout'
import ProviderDashboard from './pages/provider/Dashboard'
import Services          from './pages/provider/Services'
import Portfolio         from './pages/provider/Portfolio'
import Profile           from './pages/provider/Profile'

import AdminLayout    from './pages/admin/Layout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProviders from './pages/admin/Providers'
import AdminAdmins    from './pages/admin/Admins'
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// ── Route guards ──────────────────────────────────────────────────────────────
function ProviderRoute({ children }) {
  const { role } = useAuth()
  if (!role) return <Navigate to="/login" replace />
  if (role !== 'provider') return <Navigate to="/admin" replace />
  return children
}

function AdminRoute({ children }) {
  const { role } = useAuth()
  if (!role) return <Navigate to="/login" replace />
  if (role !== 'admin' && role !== 'superadmin') return <Navigate to="/provider" replace />
  return children
}

function PublicRoute({ children }) {
  const { role } = useAuth()
  if (role === 'provider') return <Navigate to="/provider" replace />
  if (role === 'admin' || role === 'superadmin') return <Navigate to="/admin" replace />
  return children
}

// ── App shell ─────────────────────────────────────────────────────────────────
function AppRoutes() {
  const location = useLocation();
  const isProviderDashboard = 
    location.pathname.startsWith('/provider') ||
    location.pathname.startsWith('/admin');

  return (
    <>
    <ScrollToTop />

      {!isProviderDashboard && <Nav />}
    <Routes>
      {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile/:id" element={<ProProfile />} />
        <Route path="/estimates" element={<Estimatefront />} />
        <Route path="/estimate/:id" element={<EstimateDetails />} />
        <Route path="/help-center" element={<Helpcenter />} />
        <Route path="/customer-safety-tips" element={<CustomerSafetyTipsPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

      {/* Provider dashboard */}
      <Route path="/provider" element={<ProviderRoute><ProviderLayout /></ProviderRoute>}>
        <Route index        element={<ProviderDashboard />} />
        <Route path="services"  element={<Services />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="profile"   element={<Profile />} />
      </Route>

      {/* Admin dashboard */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index            element={<AdminDashboard />} />
        <Route path="providers" element={<AdminProviders />} />
        <Route path="admins"    element={<AdminAdmins />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    {!isProviderDashboard && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" toastOptions={{
          style: { fontFamily:'DM Sans, sans-serif', fontSize:14, borderRadius:10, border:'1px solid var(--border)' },
          success: { iconTheme: { primary:'var(--green)', secondary:'#fff' } },
          error:   { iconTheme: { primary:'var(--red)',   secondary:'#fff' } },
        }} />
      </AuthProvider>
    </BrowserRouter>
  )
}
