import { useState } from 'react'
import { fmt } from '../constants'

const ICONS   = ['✈️','🚗','🏠','💍','📱','🎓','🛡️','💎','🌊','🎯','💰','🎁','🌿','🖥️','👗']
const COLORS  = ['#C49A6C','#85A8D8','#6DB898','#E8A0B8','#C49AD4','#E8C07A']

const daysUntil = (dl) => {
  const d = Math.ceil((new Date(dl) - new Date()) / 864e5)
  if (d < 0)   return 'עבר המועד'
  if (d === 0) return 'היום!'
  if (d < 30)  return `${d} ימים`
  if (d < 365) return `${Math.ceil(d / 30)} חודשים`
  return `${Math.ceil(d / 365)} שנים`
}

const today = () => new Date().toISOString().split('T')[0]

const BLANK_GOAL = { name: '', target: '', icon: '✈️', color: '#C49A6C', deadline: '' }

export default function Goals({ goals, onAdd, onUpdate, onDelete }) {
  const [showNew,     setShowNew]     = useState(false)
  const [addTo,       setAddTo]       = useState(null)
  const [savingsAmt,  setSavingsAmt]  = useState('')
  const [form,        setForm]        = useState(BLANK_GOAL)

  const totalSaved  = goals.reduce((s, g) => s + g.saved, 0)
  const totalTarget = goals.reduce((s, g) => s + g.target, 0)

  const submitGoal = () => {
    if (!form.name || !form.target) return
    onAdd({ ...form, target: parseFloat(form.target), saved: 0, deadline: form.deadline || '2027-12-31' })
    setForm(BLANK_GOAL)
    setShowNew(false)
  }

  const submitSavings = (id) => {
    const amt = parseFloat(savingsAmt)
    if (!amt) return
    const g = goals.find(g => g.id === id)
    onUpdate(id, { saved: Math.min(g.target, g.saved + amt) })
    setSavingsAmt('')
    setAddTo(null)
  }

  return (
    <div className="page">
      <div className="page-hdr">
        <div className="page-title">יעדי חיסכון</div>
        <button
          onClick={() => setShowNew(true)}
          style={{ background: 'var(--gold-lt)', border: 'none', borderRadius: 10, padding: '8px 14px', fontFamily: 'Heebo,sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--gold-dk)', cursor: 'pointer' }}
        >
          + יעד חדש
        </button>
      </div>

      {/* Summary strip */}
      {goals.length > 0 && (
        <div style={{ margin: '14px 20px 0', background: 'var(--gold-lt)', borderRadius: 'var(--r)', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--gold-dk)', fontWeight: 600, marginBottom: 2 }}>סה״כ נחסך</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold-dk)' }}>{fmt(totalSaved)}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--gold-dk)', fontWeight: 600, marginBottom: 2 }}>מתוך יעד</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold-dk)' }}>{fmt(totalTarget)}</div>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--gold)' }}>
              {Math.round((totalSaved / (totalTarget || 1)) * 100)}%
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '16px 20px 0' }}>
        {goals.length === 0 ? (
          <div className="empty">
            <div className="empty-ico">🎯</div>
            <div className="empty-text">אין יעדים עדיין</div>
            <div className="empty-sub">הוסיפי יעד חיסכון ראשון!</div>
          </div>
        ) : (
          goals.map(g => {
            const pct = Math.min(100, Math.round((g.saved / g.target) * 100))
            return (
              <div key={g.id} className="goal-card">
                <div className="goal-hdr">
                  <div className="goal-ico" style={{ background: g.color + '22' }}>{g.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div className="goal-name">{g.name}</div>
                    <div className="goal-deadline">⏱ {daysUntil(g.deadline)}</div>
                  </div>
                  <button className="del-btn" onClick={() => onDelete(g.id)} aria-label="מחק">×</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 13 }}>
                  <span style={{ fontWeight: 700 }}>{fmt(g.saved)} <span style={{ fontWeight: 400, color: 'var(--muted)' }}>נחסך</span></span>
                  <span style={{ color: 'var(--muted)' }}>מתוך {fmt(g.target)}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div className="pbar" style={{ flex: 1 }}>
                    <div className="pfill" style={{ width: `${pct}%`, background: g.color }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: g.color, minWidth: 36 }}>{pct}%</span>
                </div>

                {addTo === g.id ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      className="finput"
                      type="number"
                      inputMode="decimal"
                      placeholder="₪ כמה לחסוך?"
                      value={savingsAmt}
                      onChange={e => setSavingsAmt(e.target.value)}
                      style={{ flex: 1 }}
                      autoFocus
                    />
                    <button onClick={() => submitSavings(g.id)} style={{ background: g.color, color: '#fff', border: 'none', borderRadius: 'var(--r)', padding: '0 16px', fontFamily: 'Heebo,sans-serif', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>שמור</button>
                    <button className="btn-ghost" onClick={() => setAddTo(null)}>ביטול</button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setAddTo(g.id); setSavingsAmt('') }}
                    style={{ width: '100%', padding: 11, background: g.color + '18', border: `1.5px solid ${g.color}44`, borderRadius: 'var(--r)', fontFamily: 'Heebo,sans-serif', fontSize: 14, fontWeight: 600, color: g.color, cursor: 'pointer' }}
                  >
                    + הוסיפי חיסכון
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* New goal sheet */}
      {showNew && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setShowNew(false)}>
          <div className="sheet">
            <div className="sheet-handle" />
            <div className="sheet-title">יעד חיסכון חדש ✨</div>

            <div className="mb16">
              <label className="flabel">שם היעד</label>
              <input className="finput" placeholder="לדוגמה: חופשה בפריז" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            </div>

            <div className="mb16">
              <label className="flabel">סכום יעד (₪)</label>
              <input className="finput" type="number" inputMode="decimal" placeholder="0" value={form.target} onChange={e => setForm(p => ({ ...p, target: e.target.value }))} />
            </div>

            <div className="mb16">
              <label className="flabel">תאריך יעד</label>
              <input className="finput" type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} />
            </div>

            <div className="mb16">
              <label className="flabel">אייקון</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ICONS.map(ic => (
                  <button key={ic} onClick={() => setForm(p => ({ ...p, icon: ic }))}
                    style={{ width: 44, height: 44, fontSize: 22, background: form.icon === ic ? 'var(--gold-lt)' : 'var(--bg)', border: `2px solid ${form.icon === ic ? 'var(--gold)' : 'var(--border-lt)'}`, borderRadius: 12, cursor: 'pointer' }}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb16">
              <label className="flabel">צבע</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {COLORS.map(c => (
                  <button key={c} onClick={() => setForm(p => ({ ...p, color: c }))}
                    style={{ width: 34, height: 34, borderRadius: '50%', background: c, border: `3px solid ${form.color === c ? 'var(--text)' : 'transparent'}`, cursor: 'pointer' }} />
                ))}
              </div>
            </div>

            <button className="btn-gold" onClick={submitGoal} disabled={!form.name || !form.target} style={{ opacity: !form.name || !form.target ? 0.45 : 1 }}>
              צרי יעד ✨
            </button>
          </div>
        </div>
      )}

      <div className="spacer" />
    </div>
  )
}
