import { useState, useEffect } from 'react'
import api from '../../api/axios'
import { Card, Btn, Empty, PageLoader } from '../../components/UI'
import { Image, Upload, Trash2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRef } from 'react'

export default function Portfolio() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileRef = useRef(null)

  const load = async () => {
    try {
      const { data } = await api.get('/providers/me')
      setImages(data.data.provider.portfolio || [])
    } catch { toast.error('Failed to load portfolio') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const upload = async (e) => {
  console.log("UPLOAD TRIGGERED")
    const files = e.target.files
    if (!files.length) return
    setUploading(true)
    const fd = new FormData()
    Array.from(files).forEach(f => fd.append('images', f))
    try {
      await api.post('/providers/me/portfolio', fd, { headers:{ 'Content-Type':'multipart/form-data' } })
      toast.success(`${files.length} image${files.length > 1 ? 's' : ''} uploaded`)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed')
    } finally { setUploading(false); e.target.value = '' }
  }

  const remove = async (imagePath) => {
    if (!confirm('Remove this image?')) return
    try {
      await api.delete('/providers/me/portfolio/image', { data: { imagePath } })
      toast.success('Image removed')
      setImages(imgs => imgs.filter(i => i !== imagePath))
    } catch { toast.error('Failed to remove image') }
  }

  if (loading) return <PageLoader />

  return (
    <div className="fade-up">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28 }}>
        <div>
          <h1 style={{ fontSize:24, marginBottom:4 }}>Portfolio</h1>
          <p style={{ color:'var(--muted)', fontSize:14 }}>{images.length} image{images.length !== 1 ? 's' : ''} uploaded</p>
        </div>
        <>
  <Btn
    onClick={() => fileRef.current.click()}
    loading={uploading}
    style={{ gap:8 }}
  >
    <Upload size={15} /> Upload Images
  </Btn>

  <input
    ref={fileRef}
    type="file"
    accept="image/*"
    multiple
    onChange={upload}
    style={{ display: 'none' }}
    disabled={uploading}
  />
</>
      </div>

      {images.length === 0 ? (
        <Card>
          <Empty icon={Image} title="No portfolio images"
            desc="Upload images of your past work to build trust with customers."
            action={
              <>
  <Btn
    onClick={() => fileRef.current.click()}
    loading={uploading}
    style={{ gap:8 }}
  >
    <Upload size={15} /> Upload Images
  </Btn>

  <input
    ref={fileRef}
    type="file"
    accept="image/*"
    multiple
    onChange={upload}
    style={{ display: 'none' }}
    disabled={uploading}
  />
</>
            } />
        </Card>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:12 }}>
          {images.map((img, i) => (
            <div key={i} style={{ position:'relative', aspectRatio:'1', borderRadius:10, overflow:'hidden', border:'1px solid var(--border)', cursor:'pointer' }}
              onClick={() => setPreview(img)}>
              <img src={img} alt={`portfolio-${i}`} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{
                position:'absolute', inset:0, background:'rgba(0,0,0,.4)', opacity:0,
                transition:'opacity .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:10,
              }}
                onMouseEnter={e => e.currentTarget.style.opacity=1}
                onMouseLeave={e => e.currentTarget.style.opacity=0}>
                <button onClick={(e) => { e.stopPropagation(); remove(img) }} style={{
                  background:'var(--red)', border:'none', borderRadius:8, padding:'8px', cursor:'pointer', color:'#fff', display:'flex',
                }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {preview && (
        <div onClick={() => setPreview(null)} style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,.85)', zIndex:1000,
          display:'flex', alignItems:'center', justifyContent:'center', padding:24,
          animation:'fadeIn .2s ease',
        }}>
          <button onClick={() => setPreview(null)} style={{
            position:'absolute', top:20, right:20, background:'rgba(255,255,255,.15)', border:'none',
            borderRadius:'50%', width:40, height:40, color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <X size={20} />
          </button>
          <img src={`/${preview}`} alt="preview" style={{ maxWidth:'90vw', maxHeight:'85vh', objectFit:'contain', borderRadius:8 }} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
