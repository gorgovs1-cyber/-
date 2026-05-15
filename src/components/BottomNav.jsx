const TABS = [
  { id: 'home',         icon: '🏠', label: 'בית'     },
  { id: 'transactions', icon: '📋', label: 'תנועות'  },
  { id: '_add_',        icon: null, label: ''         },
  { id: 'summary',      icon: '📊', label: 'סיכום'   },
  { id: 'goals',        icon: '🎯', label: 'יעדים'   },
]

export default function BottomNav({ active, onChange, onAdd }) {
  return (
    <nav className="bottom-nav">
      {TABS.map(t =>
        t.id === '_add_' ? (
          <button key="add" className="nav-add" onClick={onAdd} aria-label="הוסף">+</button>
        ) : (
          <button
            key={t.id}
            className={`nav-btn${active === t.id ? ' active' : ''}`}
            onClick={() => onChange(t.id)}
          >
            <span className="nav-btn-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        )
      )}
    </nav>
  )
}
