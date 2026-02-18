import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Input, Button } from '../components/UI'

export default function Auth() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ email: '', password: '', username: '', fullName: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        if (!form.username.trim()) { setError('Choisis un pseudo'); setLoading(false); return }
        if (form.password.length < 6) { setError('Mot de passe : 6 caractères minimum'); setLoading(false); return }

        const { error } = await signUp({
          email: form.email,
          password: form.password,
          username: form.username.trim().toLowerCase(),
          fullName: form.fullName,
        })
        if (error) throw error
        setSuccess('Compte créé ! Vérifie tes emails pour confirmer ton inscription.')
      } else {
        const { error } = await signIn({ email: form.email, password: form.password })
        if (error) throw error
      }
    } catch (err) {
      setError(
        err.message === 'Invalid login credentials'
          ? 'Email ou mot de passe incorrect'
          : err.message || 'Une erreur est survenue'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0B0F19',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: 24,
    }}>
      <div style={{
        position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 400,
        background: 'radial-gradient(circle, #F59E0B08, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🎾</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: '#F3F4F6', letterSpacing: -1 }}>
          <span style={{ color: '#F59E0B' }}>Padel</span>Match
        </div>
        <div style={{
          fontSize: 13, color: '#6B7280', fontFamily: "'DM Mono', monospace",
          marginTop: 6, letterSpacing: 1, textTransform: 'uppercase',
        }}>
          Trouve · Joue · Évalue
        </div>
      </div>

      <div style={{
        width: '100%', maxWidth: 400,
        background: 'linear-gradient(135deg, #111827 0%, #1a1f2e 100%)',
        border: '1px solid #374151', borderRadius: 24, padding: 28,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -1, left: 40, right: 40, height: 3,
          background: 'linear-gradient(90deg, transparent, #F59E0B, transparent)', borderRadius: 2,
        }} />

        <div style={{ display: 'flex', marginBottom: 28, gap: 4, background: '#0D1117', borderRadius: 12, padding: 4 }}>
          {['login', 'signup'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); setSuccess('') }} style={{
              flex: 1, padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: mode === m ? '#1F2937' : 'transparent',
              color: mode === m ? '#F59E0B' : '#6B7280',
              fontWeight: 700, fontSize: 14, transition: 'all 0.2s',
            }}>
              {m === 'login' ? 'Connexion' : 'Inscription'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <Input label="Pseudo" placeholder="ton_pseudo" value={form.username} onChange={set('username')} required />
              <Input label="Nom complet" placeholder="Prénom Nom" value={form.fullName} onChange={set('fullName')} />
            </>
          )}
          <Input label="Email" type="email" placeholder="ton@email.com" value={form.email} onChange={set('email')} required />
          <Input label="Mot de passe" type="password" placeholder="••••••••" value={form.password} onChange={set('password')} required />

          {error && (
            <div style={{
              padding: '10px 14px', background: '#EF444418', border: '1px solid #EF444440',
              borderRadius: 10, color: '#EF4444', fontSize: 13, marginBottom: 16, fontWeight: 500,
            }}>⚠️ {error}</div>
          )}

          {success && (
            <div style={{
              padding: '10px 14px', background: '#10B98118', border: '1px solid #10B98140',
              borderRadius: 10, color: '#10B981', fontSize: 13, marginBottom: 16, fontWeight: 500,
            }}>✓ {success}</div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? '...' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
          </Button>
        </form>
      </div>

      <div style={{
        marginTop: 24, fontSize: 12, color: '#4B5563',
        fontFamily: "'DM Mono', monospace", textAlign: 'center',
      }}>
        Tes évaluations sont toujours anonymes 🔒
      </div>
    </div>
  )
}
