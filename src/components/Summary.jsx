import { useState, useMemo } from 'react'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { getCat, fmt, byMonth, monthLabel } from '../constants'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip)

const DONUT_OPTS = {
  responsive: true, maintainAspectRatio: false, cutout: '72%',
  plugins: { legend: { display: false }, tooltip: { rtl: true } },
}
const BAR_OPTS = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#AEAEB2', font: { size: 11, family: 'Heebo' } } },
    y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#AEAEB2', font: { size: 11, family: 'Heebo' }, callback: v => '₪' + (v/1000).toFixed(0) + 'K' } },
  },
}

export default function Summary({ txs }) {
  const [sel, setSel] = useState(new Date())

  const nav = (d) => setSel(p => { const nd = new Date(p); nd.setMonth(nd.getMonth() + d); return nd })

  const month = useMemo(() => byMonth(txs, sel), [txs, sel])
  const income   = month.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses = month.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance  = income - expenses

  const catData = useMemo(() => {
    const map = {}
    month.filter(t => t.type === 'expense').forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount })
    return Object.entries(map)
      .map(([id, amt]) => ({ ...getCat(id), amt }))
      .sort((a, b) => b.amt - a.amt)
  }, [month])

  const sixMonths = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(); d.setMonth(d.getMonth() - (5 - i))
      const m = byMonth(txs, d)
      return {
        label: d.toLocaleDateString('he-IL', { month: 'short' }),
        income:  m.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
        expense: m.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
      }
    })
  }, [txs])

  const donutData = {
    labels: catData.map(c => c.label),
    datasets: [{ data: catData.map(c => c.amt), backgroundColor: catData.map(c => c.color), borderWidth: 0, hoverOffset: 5 }],
  }

  const barData = {
    labels: sixMonths.map(m => m.label),
    datasets: [
      { label: 'הכנסות', data: sixMonths.map(m => m.income),  backgroundColor: 'rgba(93,175,136,0.75)', borderRadius: 6 },
      { label: 'הוצאות', data: sixMonths.map(m => m.expense), backgroundColor: 'rgba(217,128,128,0.75)', borderRadius: 6 },
    ],
  }

  return (
    <div className="page">
      <div className="page-hdr">
        <div className="page-title">סיכום חודשי</div>
      </div>

      {/* Month navigator */}
      <div className="month-nav">
        <button className="mnav-btn" onClick={() => nav(1)}>←</button>
        <span className="mnav-label">{monthLabel(sel)}</span>
        <button className="mnav-btn" onClick={() => nav(-1)}>→</button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 10, margin: '0 20px' }}>
        <div style={{ flex: 1, background: 'var(--surface-m)', borderRadius: 'var(--r)', padding: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--mint)', fontWeight: 600, marginBottom: 3 }}>הכנסות</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--mint)' }}>{fmt(income)}</div>
        </div>
        <div style={{ flex: 1, background: 'var(--surface-r)', borderRadius: 'var(--r)', padding: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--rose)', fontWeight: 600, marginBottom: 3 }}>הוצאות</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--rose)' }}>{fmt(expenses)}</div>
        </div>
        <div style={{ flex: 1, background: balance >= 0 ? 'var(--surface-m)' : 'var(--surface-r)', borderRadius: 'var(--r)', padding: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: balance >= 0 ? 'var(--mint)' : 'var(--rose)', fontWeight: 600, marginBottom: 3 }}>יתרה</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: balance >= 0 ? 'var(--mint)' : 'var(--rose)' }}>{fmt(balance)}</div>
        </div>
      </div>

      {/* Donut chart */}
      {catData.length > 0 ? (
        <div className="section">
          <div className="card">
            <div className="sec-title" style={{ marginBottom: 14 }}>פירוט הוצאות</div>
            <div style={{ height: 170, marginBottom: 16 }}>
              <Doughnut data={donutData} options={DONUT_OPTS} />
            </div>
            {catData.map((c, i) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < catData.length - 1 ? '1px solid var(--border-lt)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 14 }}>{c.icon} {c.label}</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{Math.round((c.amt / (expenses || 1)) * 100)}%</span>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{fmt(c.amt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty mt16">
          <div className="empty-ico">📊</div>
          <div className="empty-text">אין הוצאות בחודש זה</div>
        </div>
      )}

      {/* 6-month bar */}
      <div className="section">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span className="sec-title">6 חודשים אחרונים</span>
            <div style={{ display: 'flex', gap: 10, fontSize: 11, fontWeight: 600 }}>
              <span style={{ color: 'var(--mint)' }}>● הכנסות</span>
              <span style={{ color: 'var(--rose)' }}>● הוצאות</span>
            </div>
          </div>
          <div style={{ height: 170 }}>
            <Bar data={barData} options={BAR_OPTS} />
          </div>
        </div>
      </div>

      <div className="spacer" />
    </div>
  )
}
