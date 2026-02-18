import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { NavPill, Spinner } from './components/UI'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'

function Sessions() {
  return <div style={{ color: '#9CA3AF', textAlign: 'center', padding: 40 }}>
    <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
    <div style={{ fontSize: 16, fontWeight: 600 }}>Sessions - Coming soon</div>
  </div>
}
function Players() {
  return <div style={{ color: '#9CA3AF', textAlign: 'center', padding: 40 }}>
    <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
    <div style={{ fontSize: 16, fontWeight: 600 }}>Joueurs - Coming soon</div>
  </div>
}
function History() {
  return <div style={{ color: '#9CA3AF', textAlign: 'center', padding: 40 }}>
    <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
    <div style={{ fontSize: 16, fontWeight: 600 }}>Historique - Coming soon</div>
  </div>
}
function Profile() {
  const { profile, signOut } = useAuth()
  return <div style={{ textAlign: 'center', padding: 40 }}>
    <div style={{ fontSize: 60, marginBottom: 12 }}>{profile?.avatar_emoji || '🧑'}</div>
    <div style={{ fontSize: 20, fontWeight: 700, color: '#F3F4F6', marginBottom: 4 }}>{profile?.username}</div>
    <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 8 }}>Niveau : {profile?.computed_level?.toFixed(1) || '?'} · {profile?.city || 'Non localisé'}</div>
    <button onClick={signOut} style={{
      marginTop: 20, padding: '10px 24px', background: '#EF444420', border: '1px solid #EF444440',
      borderRadius: 12, color: '#EF4444', fontSize: 14, fontWeight: 600, cursor: 'pointer',
    }}>Se déconnecter</button>
  </div>
}

function AppContent() {
  const { user, profile, loading, isOnboarded } = useAuth()
  const [tab, setTab] = useState('sessions')

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0B0F19',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 16,
      }}>
        <div style={{ fontSize: 48 }}>🎾</div>
        <Spinner />
        <div style={{ fontSize: 24, fontWeight: 900, color: '#F3F4F6', letterSpacing: -1 }}>
          <span style={{ color: '#F59E0B' }}>Padel</span>Match
        </div>
      </div>
    )
  }

  if (!user) return <Auth />
  if (!isOnboarded) return <Onboarding />

  const pages = {
    sessions: <Sessions />,
    players: <Players />,
    history: <History />,
    profile: <Profile />,
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0B0F19',
      maxWidth: 480, margin: '0 auto', position: 'relative',
    }}>
      <div style={{
        position: 'fixed', inset: 0, opacity: 0.03, maxWidth: 480, margin: '0 auto',
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '24px 24px', pointerEvents: 'none',
      }} />

      <header style={{ padding: '20px 20px 16px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: -60, right: -30, width: 200, height: 200,
          background: 'radial-gradient(circle, #F59E0B10, transparent 70%)',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#F3F4F6', letterSpacing: -1, lineHeight: 1 }}>
              <span style={{ color: '#F59E0B' }}>Padel</span>Match
            </div>
            <div style={{
              fontSize: 11, color: '#6B7280', fontFamily: "'DM Mono', monospace",
              marginTop: 4, letterSpacing: 1, textTransform: 'uppercase',
            }}>Trouve · Joue · Évalue</div>
          </div>
          <div onClick={() => setTab('profile')} style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'linear-gradient(135deg, #F59E0B20, #EF444420)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            border: '2px solid #F59E0B30', cursor: 'pointer',
          }}>{profile?.avatar_emoji || '🧑'}</div>
        </div>
      </header>

      <main style={{ padding: '0 20px 100px' }}>{pages[tab]}</main>

      <nav style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 480,
        background: 'linear-gradient(180deg, transparent, #0B0F19 20%)', paddingTop: 20,
      }}>
        <div style={{
          display: 'flex', background: '#111827',
          borderTop: '1px solid #1F2937', padding: '4px 8px 8px',
        }}>
          <NavPill active={tab === 'sessions'} onClick={() => setTab('sessions')} icon="📋">Sessions</NavPill>
          <NavPill active={tab === 'players'} onClick={() => setTab('players')} icon="👥">Joueurs</NavPill>
          <NavPill active={tab === 'history'} onClick={() => setTab('history')} icon="📊">Historique</NavPill>
          <NavPill active={tab === 'profile'} onClick={() => setTab('profile')} icon="👤">Profil</NavPill>
        </div>
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
