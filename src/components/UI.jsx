import { Loader2 } from 'lucide-react'

/* ── Button ─────────────────────────────────────────────────────────── */
export function Btn({ children, variant = 'primary', size = 'md', loading, className = '', ...props }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 8,
    fontFamily: 'inherit', fontWeight: 600, border: 'none', cursor: props.disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all .18s', whiteSpace: 'nowrap',
  }
  const sizes = { sm: { padding: '6px 14px', fontSize: 13 }, md: { padding: '10px 20px', fontSize: 14 }, lg: { padding: '13px 28px', fontSize: 15 } }
  const variants = {
    primary:  { background: 'var(--accent)',  color: '#fff' },
    ghost:    { background: 'transparent',    color: 'var(--muted)',  border: '1.5px solid var(--border)' },
    danger:   { background: 'var(--red-lt)',  color: 'var(--red)',    border: '1.5px solid var(--red)' },
    success:  { background: 'var(--green-lt)',color: 'var(--green)',  border: '1.5px solid var(--green)' },
    warning:  { background: 'var(--yellow-lt)',color: 'var(--yellow)',border: '1.5px solid var(--yellow)' },
  }
  return (
    <button style={{ ...base, ...sizes[size], ...variants[variant], opacity: props.disabled || loading ? 0.65 : 1 }}
      className={className} disabled={props.disabled || loading} {...props}>
      {loading && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
      {children}
    </button>
  )
}

/* ── Input ──────────────────────────────────────────────────────────── */
export function Input({ label, error, icon: Icon, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {Icon && <Icon size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', pointerEvents:'none' }} />}
        <input style={{
          width: '100%', border: `1.5px solid ${error ? 'var(--red)' : 'var(--border)'}`,
          borderRadius: 8, padding: Icon ? '10px 12px 10px 36px' : '10px 14px',
          fontSize: 14, background: 'var(--surface)', color: 'var(--text)',
          outline: 'none', transition: 'border-color .15s',
        }}
          onFocus={e => e.target.style.borderColor = error ? 'var(--red)' : 'var(--accent)'}
          onBlur={e  => e.target.style.borderColor = error ? 'var(--red)' : 'var(--border)'}
          {...props} />
      </div>
      {error && <span style={{ fontSize: 12, color: 'var(--red)' }}>{error}</span>}
    </div>
  )
}

/* ── Select ─────────────────────────────────────────────────────────── */
export function Select({ label, error, children, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600 }}>{label}</label>}
      <select style={{
        width: '100%', border: `1.5px solid ${error ? 'var(--red)' : 'var(--border)'}`,
        borderRadius: 8, padding: '10px 14px', fontSize: 14,
        background: 'var(--surface)', color: 'var(--text)', outline: 'none',
      }} {...props}>{children}</select>
      {error && <span style={{ fontSize: 12, color: 'var(--red)' }}>{error}</span>}
    </div>
  )
}

/* ── Textarea ───────────────────────────────────────────────────────── */
export function Textarea({ label, error, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600 }}>{label}</label>}
      <textarea style={{
        width: '100%', border: `1.5px solid ${error ? 'var(--red)' : 'var(--border)'}`,
        borderRadius: 8, padding: '10px 14px', fontSize: 14, minHeight: 90,
        background: 'var(--surface)', color: 'var(--text)', outline: 'none', resize: 'vertical',
      }}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e  => e.target.style.borderColor = error ? 'var(--red)' : 'var(--border)'}
        {...props} />
      {error && <span style={{ fontSize: 12, color: 'var(--red)' }}>{error}</span>}
    </div>
  )
}

/* ── Card ───────────────────────────────────────────────────────────── */
export function Card({ children, style = {}, className = '' }) {
  return (
    <div className={className}
      style={{ background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', ...style }}>
      {children}
    </div>
  )
}

/* ── Badge ──────────────────────────────────────────────────────────── */
export function Badge({ children, type = 'default' }) {
  const map = {
    default:  { bg: 'var(--bg2)',      color: 'var(--muted)' },
    success:  { bg: 'var(--green-lt)', color: 'var(--green)' },
    danger:   { bg: 'var(--red-lt)',   color: 'var(--red)' },
    warning:  { bg: 'var(--yellow-lt)',color: 'var(--yellow)' },
    info:     { bg: 'var(--blue-lt)',  color: 'var(--blue)' },
    accent:   { bg: 'var(--accent-lt)',color: 'var(--accent)' },
  }
  const s = map[type] || map.default
  return (
    <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, display: 'inline-block' }}>
      {children}
    </span>
  )
}

/* ── Spinner ────────────────────────────────────────────────────────── */
export function Spinner({ size = 24 }) {
  return <Loader2 size={size} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
}

/* ── PageLoader ─────────────────────────────────────────────────────── */
export function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
      <Spinner size={32} />
    </div>
  )
}

/* ── Empty state ────────────────────────────────────────────────────── */
export function Empty({ icon: Icon, title, desc, action }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      {Icon && <Icon size={40} style={{ color: 'var(--border2)', marginBottom: 16 }} />}
      <h3 style={{ fontSize: 16, marginBottom: 6 }}>{title}</h3>
      {desc && <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>{desc}</p>}
      {action}
    </div>
  )
}

/* ── Modal ──────────────────────────────────────────────────────────── */
export function Modal({ open, onClose, title, children, width = 480 }) {
  if (!open) return null
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      animation: 'fadeIn .2s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--surface)', borderRadius: 14, width: '100%', maxWidth: width,
        maxHeight: '90vh', overflowY: 'auto', boxShadow: 'var(--shadow-lg)',
        animation: 'fadeUp .25s ease',
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: 17 }}>{title}</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', fontSize:22, color:'var(--muted)', lineHeight:1, cursor:'pointer' }}>×</button>
        </div>
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  )
}

/* ── Stat card ──────────────────────────────────────────────────────── */
export function StatCard({ icon: Icon, label, value, color = 'var(--accent)', sub }) {
  return (
    <Card style={{ padding: '20px 24px' }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom: 12 }}>
        <span style={{ fontSize:13, color:'var(--muted)', fontWeight:500 }}>{label}</span>
        <div style={{ background: color + '18', borderRadius:8, padding:8 }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, fontFamily:'Syne,sans-serif', color:'var(--text)' }}>{value}</div>
      {sub && <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>{sub}</div>}
    </Card>
  )
}
