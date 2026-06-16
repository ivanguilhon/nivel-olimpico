interface TagPillProps {
  name: string
  color?: string
  category?: string
  size?: 'sm' | 'md'
  onClick?: () => void
  selected?: boolean
}

export default function TagPill({ name, color = '#E4AD41', size = 'sm', onClick, selected }: TagPillProps) {
  const pad = size === 'sm' ? '2px 10px' : '4px 14px'
  const fs  = size === 'sm' ? 11 : 13

  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: pad, borderRadius: 20, fontSize: fs,
        fontFamily: 'var(--font-display)', fontWeight: 500,
        cursor: onClick ? 'pointer' : 'default',
        background: selected ? color : `${color}18`,
        color:      selected ? '#000' : color,
        border:     `1px solid ${color}40`,
        transition: 'all 0.15s',
        userSelect: 'none',
      }}>
      {name}
    </span>
  )
}
