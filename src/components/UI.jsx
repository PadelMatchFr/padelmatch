import { useState } from 'react'

export function Stars({ value = 0, max = 5, size = 'sm', interactive = false, onChange }) {
  const [hover, setHover] = useState(0)
  const sz = size === 'sm' ? 14 : size === 'md' ? 20 : 26
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: max }, (_, i) => {
        const filled = interactive ? (hover || value) >= i + 1 : value >= i + 0.5
        return (
          <svg key={i} width={sz} height={sz} viewBox="0 0 24 24"
            fill={filled ? '#F59E0B' : 'none'} stroke={filled ? '#F59E0B' : '#6B7280'}
            strokeWidth="2" style={{ cursor: interactive ? 'pointer' : 'default', transition: 'all 0.15s' }}
            onMouseEnter={() => interactive && setHover(i + 1)}
            onMouseLeave={() => interactive && setHover(0)}
            onClick={() => interactive && onChange?.(i + 1)}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )
      })}
      {!interactive && (
        <span style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 4, fontFamily: "'DM Mono', monospace" }}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export function Badge({ children, color = '#10B981' }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 20,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.5, color,
      background: `${color}18`, fontFamily: "'DM Mono', monospace", textTransform: 'uppercase',
    }}>{children}</span>
  )
}

export function LevelBar({ value, max = 5 }) {
  const gradient = value >= 4
    ? 'linear-gradient(90deg, #F59E0B, #EF4444)'
    : value >= 3
      ? 'linear-gradient(90deg, #10B981, #F59E0B)'
      : 'linear-gradient(90deg, #3B82F6, #10B981)'
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <div style={{ flex: 1, height: 6, background: '#1F2937', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          width: `${(value / max) * 100}%`, height: '100%', background: gradient,
          borderRadius: 3, transition: 'width 0.5s ease',
        }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#E5E7EB', fontFamily: "'DM Mono', monospace", minWidth: 28 }}>
        {value.toFixed(1)}
      </span>
    </div>
  )
}

export function Toast({ message, visible }) {
  return (
    <div style={{
      position: 'fixed', bottom: 90, left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
      background: '#10B981', color: '#111827', padding: '12px 24px', borderRadius: 12,
      fontWeight: 700, fontSize: 14, opacity: visible ? 1 : 0,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 2000,
      boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)', whiteSpace: 'nowrap',
    }}>{message}</div>
  )
}

export function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{
          fontSize: 12, fontWeight: 600, color: '#9CA3AF',
          fontFamily: "'DM Mono', monospace", textTransform: 'uppercase',
          display: 'block', marginBottom: 6, letterSpacing: 0.5,
        }}>{label}</label>
      )}
      <input
        {...props}
        style={{
          width: '100%', padding: 14, background: '#0D1117',
          border: '1px solid #374151', borderRadius: 12, color: '#E5E7EB',
          fontSize: 15, outline: 'none', transition: 'border-color 0.2s',
          ...props.style,
        }}
        onFocus={e => { e.target.style.borderColor = '#F59E0B50'; props.onFocus?.(e) }}
        onBlur={e => { e.target.style.borderColor = '#374151'; props.onBlur?.(e) }}
      />
    </div>
  )
}

export function Button({ children, variant = 'primary', disabled = false, ...props }) {
  const styles = {
    primary: {
      background: disabled ? '#374151' : 'linear-gradient(135deg, #F59E0B, #D97706)',
      color: disabled ? '#6B7280' : '#111827',
    },
    secondary: {
      background: '#1F2937',
      color: '#9CA3AF',
      border: '1px solid #374151',
    },
    danger: {
      background: '#EF444420',
      color: '#EF4444',
      border: '1px solid #EF444440',
    },
  }
  return (
    <button
      disabled={disabled}
      {...props}
      style={{
        width: '100%', padding: 14, border: 'none', borderRadius: 12,
        fontSize: 15, fontWeight: 700, cursor: disabled ? 'default' : 'pointer',
        letterSpacing: 0.5, transition: 'all 0.2s',
        ...styles[variant],
        ...props.style,
      }}
    >{children}</button>
  )
}

export function NavPill({ active, onClick, children, icon }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      padding: '10px 6px', background: 'none', border: 'none', cursor: 'pointer',
      color: active ? '#F59E0B' : '#6B7280', transition: 'all 0.2s', flex: 1,
      position: 'relative',
    }}>
      <span style={{ fontSize: 22, lineHeight: 1 }}>{icon}</span>
      <span style={{
        fontSize: 10, fontWeight: active ? 700 : 500,
        fontFamily: "'DM Mono', monospace", letterSpacing: 0.5, textTransform: 'uppercase',
      }}>{children}</span>
      {active && <span style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 20, height: 3, borderRadius: 2, background: '#F59E0B',
      }} />}
    </button>
  )
}

export function Spinner() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        border: '3px solid #1F2937', borderTopColor: '#F59E0B',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export function PlayerCard({ player, compact = false, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: 'linear-gradient(135deg, #111827 0%, #1a1f2e 100%)',
      border: '1px solid #374151', borderRadius: 16,
      padding: compact ? '14px 16px' : 20,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    }}
      onMouseEnter={e => { if (onClick) { e.currentTarget.style.borderColor = '#F59E0B50'; e.currentTarget.style.transform = 'translateY(-2px)' } }}
      onMouseLeave={e => { if (onClick) { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.transform = 'translateY(0)' } }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: compact ? 44 : 56, height: compact ? 44 : 56, borderRadius: 14,
          background: 'linear-gradient(135deg, #F59E0B20, #EF444420)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: compact ? 22 : 28, flexShrink: 0, border: '2px solid #F59E0B30',
        }}>{player.avatar_emoji || '🧑'}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: compact ? 15 : 17, fontWeight: 700, color: '#F3F4F6' }}>
              {player.username || player.full_name}
            </span>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: player.is_available ? '#10B981' : '#6B7280',
              boxShadow: player.is_available ? '0 0 8px #10B98180' : 'none',
            }} />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {player.play_style && (
              <Badge color={player.play_style === 'competitif' ? '#EF4444' : '#3B82F6'}>
                {player.play_style}
              </Badge>
            )}
            {player.preferred_position && (
              <Badge color="#8B5CF6">{player.preferred_position}</Badge>
            )}
          </div>
          {!compact && player.computed_level && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, color: '#9CA3AF', width: 65, fontFamily: "'DM Mono', monospace" }}>NIVEAU</span>
                <div style={{ flex: 1 }}><LevelBar value={player.computed_level} /></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
