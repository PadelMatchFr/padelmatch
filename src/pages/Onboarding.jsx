import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/UI'

const AVATARS = ['🧔', '👨', '👩', '🧑', '👨‍🦱', '👩‍🦰', '👩‍🦳', '🧑‍🦱', '👨‍🦰', '🧔‍♀️', '👲', '🧕']
const POSITIONS = [
  { value: 'drive', label: 'Drive (droite)', icon: '➡️' },
  { value: 'revers', label: 'Revers (gauche)', icon: '⬅️' },
  { value: 'les_deux', label: 'Les deux', icon: '↔️' },
]
const STYLES = [
  { value: 'competitif', label: 'Compétitif', icon: '🔥', color: '#EF4444' },
  { value: 'loisir', label: 'Loisir', icon: '😎', color: '#3B82F6' },
  { value: 'les_deux', label: 'Les deux', icon: '🤙', color: '#10B981' },
]

export default function Onboarding() {
  const { updateProfile, profile } = useAuth()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    avatar_emoji: '🧑',
    self_declared_level: 3,
    preferred_position: 'les_deux',
    play_style: 'les_deux',
    dominant_hand: 'droite',
    city: '',
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  async function finish() {
    setLoading(true)
    await updateProfile({
      ...form,
      computed_level: form.self_declared_level,
    })
    setLoading(false)
  }

  const steps = [
    <>
      <div style={{ fontSize: 20, fontWeight: 800, color: '#F3F4F6', marginBottom: 8 }}>Choisis ton avatar</div>
      <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 24 }}>Comment les autres joueurs te verront</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {AVATARS.map(a => (
          <button key={a} onClick={() => set('avatar_emoji', a)} style={{
            width: '100%', aspectRatio: '1', borderRadius: 16, border: 'none', cursor: 'pointer',
            background: form.avatar_emoji === a ? '#F59E0B20' : '#0D1117',
            outline: form.avatar_emoji === a ? '2px solid #F59E0B' : '1px solid #374151',
            fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}>{a}</button>
        ))}
      </div>
    </>,
    <>
      <div style={{ fontSize: 20, fontWeight: 800, color: '#F3F4F6', marginBottom: 8 }}>Ton niveau de padel</div>
      <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 32 }}>Ce niveau sera affiné avec les évaluations reçues</div>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          fontSize: 72, fontWeight: 900, color: '#F59E0B',
          fontFamily: "'DM Mono', monospace", lineHeight: 1,
        }}>{form.self_declared_level.toFixed(1)}</div>
        <div style={{ fontSize: 14, color: '#6B7280', marginTop: 8 }}>
          {form.self_declared_level <= 1.5 ? 'Débutant' :
           form.self_declared_level <= 2.5 ? 'Initié' :
           form.self_declared_level <= 3.5 ? 'Intermédiaire' :
           form.self_declared_level <= 4.5 ? 'Avancé' : 'Expert'}
        </div>
      </div>
      <input type="range" min="1" max="5" step="0.5" value={form.self_declared_level}
        onChange={e => set('self_declared_level', parseFloat(e.target.value))}
        style={{ width: '100%', marginBottom: 32, accentColor: '#F59E0B', height: 8, borderRadius: 4 }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6B7280', fontFamily: "'DM Mono', monospace" }}>
        <span>1.0 Débutant</span><span>5.0 Expert</span>
      </div>
    </>,
    <>
      <div style={{ fontSize: 20, fontWeight: 800, color: '#F3F4F6', marginBottom: 8 }}>Ton style de jeu</div>
      <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 24 }}>Pour te matcher avec les bons joueurs</div>

      <div style={{ fontSize: 13, fontWeight: 600, color: '#9CA3AF', marginBottom: 10, fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', letterSpacing: 0.5 }}>Ambiance</div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {STYLES.map(s => (
          <button key={s.value} onClick={() => set('play_style', s.value)} style={{
            flex: 1, padding: '16px 8px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: form.play_style === s.value ? `${s.color}20` : '#0D1117',
            outline: form.play_style === s.value ? `2px solid ${s.color}` : '1px solid #374151',
            transition: 'all 0.2s', textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: form.play_style === s.value ? s.color : '#6B7280' }}>{s.label}</div>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: '#9CA3AF', marginBottom: 10, fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', letterSpacing: 0.5 }}>Position préférée</div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {POSITIONS.map(p => (
          <button key={p.value} onClick={() => set('preferred_position', p.value)} style={{
            flex: 1, padding: '16px 8px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: form.preferred_position === p.value ? '#F59E0B20' : '#0D1117',
            outline: form.preferred_position === p.value ? '2px solid #F59E0B' : '1px solid #374151',
            transition: 'all 0.2s', textAlign: 'center',
          }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: form.preferred_position === p.value ? '#F59E0B' : '#6B7280' }}>{p.label}</div>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: '#9CA3AF', marginBottom: 10, fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', letterSpacing: 0.5 }}>Main dominante</div>
      <div style={{ display: 'flex', gap: 10 }}>
        {[{ v: 'droite', l: 'Droitier', i: '🤚' }, { v: 'gauche', l: 'Gaucher', i: '✋' }].map(h => (
          <button key={h.v} onClick={() => set('dominant_hand', h.v)} style={{
            flex: 1, padding: '14px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: form.dominant_hand === h.v ? '#8B5CF620' : '#0D1117',
            outline: form.dominant_hand === h.v ? '2px solid #8B5CF6' : '1px solid #374151',
            transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 20 }}>{h.i}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: form.dominant_hand === h.v ? '#8B5CF6' : '#6B7280' }}>{h.l}</span>
          </button>
        ))}
      </div>
    </>,
    <>
      <div style={{ fontSize: 20, fontWeight: 800, color: '#F3F4F6', marginBottom: 8 }}>Où joues-tu ?</div>
      <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 24 }}>Pour trouver des sessions proches de toi</div>
      <input
        type="text" placeholder="Paris, Lyon, Marseille..."
        value={form.city} onChange={e => set('city', e.target.value)}
        style={{
          width: '100%', padding: 16, background: '#0D1117', border: '1px solid #374151',
          borderRadius: 14, color: '#E5E7EB', fontSize: 16, outline: 'none', marginBottom: 32,
          textAlign: 'center',
        }}
        onFocus={e => e.target.style.borderColor = '#F59E0B50'}
        onBlur={e => e.target.style.borderColor = '#374151'}
      />
      <div style={{
        background: '#0D1117', borderRadius: 16, padding: 20, border: '1px solid #1F2937',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#E5E7EB', marginBottom: 12 }}>Récap de ton profil</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #F59E0B20, #EF444420)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, border: '2px solid #F59E0B30',
          }}>{form.avatar_emoji}</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#F3F4F6' }}>{profile?.username}</div>
            <div style={{ fontSize: 13, color: '#6B7280' }}>{form.city || 'Non renseigné'}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: '#F59E0B18', color: '#F59E0B' }}>
            Niv. {form.self_declared_level.toFixed(1)}
          </span>
          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: form.play_style === 'competitif' ? '#EF444418' : '#3B82F618', color: form.play_style === 'competitif' ? '#EF4444' : '#3B82F6' }}>
            {form.play_style}
          </span>
          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: '#8B5CF618', color: '#8B5CF6' }}>
            {form.preferred_position}
          </span>
        </div>
      </div>
    </>,
  ]

  const isLast = step === steps.length - 1

  return (
    <div style={{
      minHeight: '100vh', background: '#0B0F19',
      display: 'flex', flexDirection: 'column', padding: 24,
      maxWidth: 480, margin: '0 auto',
    }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 32, marginTop: 8 }}>
        {steps.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i <= step ? '#F59E0B' : '#1F2937',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      <div style={{ flex: 1 }}>{steps[step]}</div>

      <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
        {step > 0 && (
          <Button variant="secondary" onClick={() => setStep(s => s - 1)} style={{ flex: 1 }}>
            Retour
          </Button>
        )}
        <Button
          onClick={() => isLast ? finish() : setStep(s => s + 1)}
          disabled={loading}
          style={{ flex: isLast ? 2 : 1 }}
        >
          {loading ? '...' : isLast ? "C'est parti ! 🎾" : 'Suivant'}
        </Button>
      </div>
    </div>
  )
}
