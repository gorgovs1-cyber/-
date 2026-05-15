import { useMemo } from 'react'
import { getCat, fmt, fmtShort, byMonth, monthLabel } from '../constants'

export default function Dashboard({ txs, goals, onAdd }) {
  const now   = new Date()
  const month = useMemo(() => byMonth(txs, now), [txs])

  const income   = useMemo(() => month.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),  [month])
  const expenses = useMemo(() => month.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0), [month])
  const balance  = income - expenses

  const catSpend = useMemo(() => {
    const map = {}
    month.filter(t => t.type === 'expense').forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount })
    return Object.entries(map)
      .map(([id, amount]) => ({ ...getCat(id), amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
  }, [month])

  const maxAmt = catSpend[0]?.amount || 1
  const hour   = now.getHours()
  const greet  = hour < 12 ? 'בוקר טוב' : hour < 17 ? 'צהריים טובים' : 'ערב טוב'

  return (
    <div className="page">

      {/* Header */}
      <div className="page-hdr">
        <div>
          <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{greet} ✨</div>
          <div className="page-title">{monthLabel(now)}</div>
        </div>
      </div>

      {/* Balance card */}
      <div className="balance-card">
        <div className="bal-label">יתרה חודשית</div>
        <div className="bal-amount">{fmt(balance)}</div>
        <div className="bal-row">
          <div className="bal-stat">
            <div className="bal-stat-lbl">↑ הכנסות</div>
            <div className="bal-stat-amt">{fmt(income)}</div>
          </div>
          <div className="bal-stat">
            <div className="bal-stat-lbl">↓ הוצאות</div>
            <div className="bal-stat-amt">{fmt(expenses)}</div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="qa-row">
        <button className="qa-btn qa-exp" onClick={() => onAdd('expense')}>+ הוצאה</button>
        <button className="qa-btn qa-inc" onClick={() => onAdd('income')}>+ הכנסה</button>
      </div>

      {/* Category spending */}
      {catSpend.length > 0 && (
        <div className="section">
          <div className="card">
            <div className="sec-hdr">
              <span className="sec-title">הוצאות לפי קטגוריה</span>
            </div>
            {catSpend.map(cat => (
              <div key={cat.id} className="cat-spend">
                <span className="cs-ico">{cat.icon}</span>
                <div className="cs-info">
                  <div className="cs-top">
                    <span className="cs-name">{cat.label}</span>
                    <span className="cs-amt">{fmt(cat.amount)}</span>
                  </div>
                  <div className="pbar">
                    <div className="pfill" style={{ width: `${(cat.amount / maxAmt) * 100}%`, background: cat.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent transactions */}
      <div className="section">
        <div className="card">
          <div className="sec-hdr">
            <span className="sec-title">תנועות אחרונות</span>
          </div>
          {txs.length === 0 ? (
            <div className="empty">
              <div className="empty-ico">💸</div>
              <div className="empty-text">אין תנועות עדיין</div>
              <div className="empty-sub">לחצי + להוספה</div>
            </div>
          ) : (
            txs.slice(0, 6).map(tx => {
              const cat = getCat(tx.category)
              return (
                <div key={tx.id} className="tx-row">
                  <div className="tx-ico" style={{ background: cat.color + '22' }}>{cat.icon}</div>
                  <div className="tx-info">
                    <div className="tx-name">{tx.description || cat.label}</div>
                    <div className="tx-meta">{cat.label} · {fmtShort(tx.date)}</div>
                  </div>
                  <div className={`tx-amt ${tx.type}`}>
                    {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Goals preview */}
      {goals.length > 0 && (
        <div className="section">
          <div className="card">
            <div className="sec-hdr">
              <span className="sec-title">יעדי חיסכון</span>
            </div>
            {goals.slice(0, 2).map(g => {
              const pct = Math.min(100, Math.round((g.saved / g.target) * 100))
              return (
                <div key={g.id} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{g.icon} {g.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: g.color }}>{pct}%</span>
                  </div>
                  <div className="pbar">
                    <div className="pfill" style={{ width: `${pct}%`, background: g.color }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{fmt(g.saved)} נחסך</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>יעד {fmt(g.target)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="spacer" />
    </div>
  )
}
