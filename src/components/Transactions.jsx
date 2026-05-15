import { useState, useMemo } from 'react'
import { getCat, fmt, fmtDate } from '../constants'

export default function Transactions({ txs, onDelete, onAdd }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return txs
      .filter(t => filter === 'all' || t.type === filter)
      .filter(t => {
        if (!search) return true
        const q = search.toLowerCase()
        return (t.description || '').toLowerCase().includes(q) ||
               getCat(t.category).label.includes(q)
      })
  }, [txs, filter, search])

  const grouped = useMemo(() => {
    const map = {}
    filtered.forEach(t => { (map[t.date] = map[t.date] || []).push(t) })
    return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]))
  }, [filtered])

  const totalShown = filtered.reduce((s, t) =>
    t.type === 'expense' ? s - t.amount : s + t.amount, 0)

  return (
    <div className="page">
      <div className="page-hdr">
        <div className="page-title">תנועות</div>
        <button
          onClick={() => onAdd('expense')}
          style={{ background: 'var(--gold-lt)', border: 'none', borderRadius: 10, padding: '8px 14px', fontFamily: 'Heebo,sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--gold-dk)', cursor: 'pointer' }}
        >
          + הוסף
        </button>
      </div>

      {/* Search */}
      <div style={{ margin: '12px 20px 0' }}>
        <input
          className="finput"
          type="search"
          placeholder="🔍  חיפוש…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="filter-row" style={{ margin: '10px 20px' }}>
        {[['all', 'הכל'], ['expense', 'הוצאות'], ['income', 'הכנסות']].map(([v, l]) => (
          <button key={v} className={`btn-soft${filter === v ? ' active' : ''}`} onClick={() => setFilter(v)}>{l}</button>
        ))}
        {filter !== 'all' && (
          <span style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', fontSize: 13, fontWeight: 700, color: totalShown >= 0 ? 'var(--mint)' : 'var(--rose)' }}>
            {totalShown >= 0 ? '+' : ''}{fmt(totalShown)}
          </span>
        )}
      </div>

      {/* List */}
      {grouped.length === 0 ? (
        <div className="empty">
          <div className="empty-ico">🔍</div>
          <div className="empty-text">לא נמצאו תנועות</div>
        </div>
      ) : (
        <div className="ph">
          {grouped.map(([date, rows]) => (
            <div key={date}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', margin: '14px 0 6px' }}>
                {fmtDate(date)}
              </div>
              <div className="card" style={{ padding: '2px 14px' }}>
                {rows.map(tx => {
                  const cat = getCat(tx.category)
                  return (
                    <div key={tx.id} className="tx-row">
                      <div className="tx-ico" style={{ background: cat.color + '22' }}>{cat.icon}</div>
                      <div className="tx-info">
                        <div className="tx-name">{tx.description || cat.label}</div>
                        <div className="tx-meta">{cat.label}</div>
                      </div>
                      <div className={`tx-amt ${tx.type}`}>
                        {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
                      </div>
                      <button className="del-btn" onClick={() => onDelete(tx.id)} aria-label="מחק">×</button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="spacer" />
    </div>
  )
}
