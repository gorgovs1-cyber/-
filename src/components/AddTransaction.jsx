import { useState } from 'react'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, today } from '../constants'

export default function AddTransaction({ type: init, onSave, onClose }) {
  const [type,   setType]   = useState(init)
  const [amount, setAmount] = useState('')
  const [cat,    setCat]    = useState('')
  const [desc,   setDesc]   = useState('')
  const [date,   setDate]   = useState(today())

  const cats = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

  const switchType = (t) => { setType(t); setCat('') }

  const save = () => {
    if (!amount || !cat) return
    onSave({ type, amount: parseFloat(amount), category: cat, description: desc, date })
  }

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sheet">
        <div className="sheet-handle" />

        <div className="type-toggle">
          <button className={`type-btn${type === 'expense' ? ' exp' : ''}`} onClick={() => switchType('expense')}>הוצאה</button>
          <button className={`type-btn${type === 'income'  ? ' inc' : ''}`} onClick={() => switchType('income')}>הכנסה</button>
        </div>

        {/* Amount */}
        <div className="amt-wrap">
          <div className="amt-row">
            <span className="amt-sym">₪</span>
            <input
              className="amt-inp"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              autoFocus
            />
          </div>
          <div className="amt-hint">{type === 'expense' ? 'כמה הוצאת?' : 'כמה הכנסת?'}</div>
        </div>

        {/* Category */}
        <div className="mb16">
          <label className="flabel">קטגוריה</label>
          <div className="cat-grid">
            {cats.map(c => (
              <button
                key={c.id}
                className={`cat-chip${cat === c.id ? ' sel' : ''}`}
                onClick={() => setCat(c.id)}
              >
                <span className="cat-chip-ico">{c.icon}</span>
                <span className="cat-chip-lbl">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb16">
          <label className="flabel">הערה</label>
          <input
            className="finput"
            type="text"
            placeholder="לדוגמה: קפה עם חברה"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>

        {/* Date */}
        <div className="mb16">
          <label className="flabel">תאריך</label>
          <input className="finput" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <button className="btn-gold" onClick={save} disabled={!amount || !cat}>
          {type === 'expense' ? 'שמור הוצאה ✓' : 'שמור הכנסה ✓'}
        </button>
      </div>
    </div>
  )
}
