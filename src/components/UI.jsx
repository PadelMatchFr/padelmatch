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
      transition: 'all 0.3s cub
