import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Tooltip, Legend, Filler,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Tooltip, Legend, Filler,
)

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const TRAFFIC_DATA = {
  labels: MONTHS,
  datasets: [
    {
      label: 'Visitors',
      data: [32000, 38000, 35000, 45000, 42000, 58000, 63000, 59000, 72000, 81000, 76000, 94000],
      borderColor: '#7c3aed',
      backgroundColor: 'rgba(124,58,237,0.12)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 6,
    },
    {
      label: 'Sessions',
      data: [18000, 22000, 21000, 28000, 26000, 35000, 38000, 36000, 44000, 49000, 45000, 57000],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.08)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 6,
    },
  ],
}

const REVENUE_DATA = {
  labels: MONTHS.slice(6),
  datasets: [
    {
      label: 'Revenue ($K)',
      data: [48, 55, 62, 58, 71, 84],
      backgroundColor: [
        'rgba(124,58,237,0.8)',
        'rgba(124,58,237,0.8)',
        'rgba(124,58,237,0.8)',
        'rgba(124,58,237,0.8)',
        'rgba(124,58,237,0.8)',
        'rgba(124,58,237,1)',
      ],
      borderRadius: 6,
    },
  ],
}

const DONUT_DATA = {
  labels: ['Organic', 'Direct', 'Social', 'Referral', 'Email'],
  datasets: [{
    data: [38, 22, 18, 13, 9],
    backgroundColor: ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    borderWidth: 0,
    hoverOffset: 6,
  }],
}

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8892a4', font: { size: 11 } } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8892a4', font: { size: 11 } } },
  },
}

const DONUT_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '72%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: { color: '#8892a4', padding: 12, font: { size: 11 }, boxWidth: 10, boxHeight: 10 },
    },
  },
}

const PAGES = [
  { path: '/dashboard', views: '24,310', bounce: '32%', time: '3:42', status: 'up' },
  { path: '/pricing',   views: '18,540', bounce: '28%', time: '4:15', status: 'up' },
  { path: '/blog',      views: '14,220', bounce: '51%', time: '2:08', status: 'down' },
  { path: '/signup',    views: '11,890', bounce: '14%', time: '5:30', status: 'up' },
  { path: '/docs',      views: '9,640',  bounce: '41%', time: '6:12', status: 'neutral' },
]

const SOURCES = [
  { name: 'Organic Search', pct: 38, color: '#7c3aed' },
  { name: 'Direct',         pct: 22, color: '#3b82f6' },
  { name: 'Social Media',   pct: 18, color: '#10b981' },
  { name: 'Referral',       pct: 13, color: '#f59e0b' },
  { name: 'Email',          pct: 9,  color: '#ef4444' },
]

const NAV = [
  { icon: '📊', label: 'Dashboard',  id: 'dashboard' },
  { icon: '👥', label: 'Audience',   id: 'audience' },
  { icon: '📈', label: 'Acquisition',id: 'acquisition' },
  { icon: '💰', label: 'Revenue',    id: 'revenue' },
  { icon: '🔔', label: 'Reports',    id: 'reports' },
  { icon: '⚙️',  label: 'Settings',   id: 'settings' },
]

export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [period, setPeriod] = useState('12M')

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">📊</div>
          <span className="logo-text">AnalyticsPro</span>
        </div>

        {NAV.map(n => (
          <div
            key={n.id}
            className={`nav-item ${activeNav === n.id ? 'active' : ''}`}
            onClick={() => setActiveNav(n.id)}
          >
            <span className="nav-icon">{n.icon}</span>
            {n.label}
          </div>
        ))}

        <div className="sidebar-footer">
          <div className="avatar">
            <div className="avatar-img">A</div>
            <div className="avatar-info">
              <div className="avatar-name">Admin User</div>
              <div className="avatar-role">Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <div className="header">
          <div>
            <div className="header-title">Dashboard Overview</div>
            <div className="header-sub">Welcome back — here's what's happening today.</div>
          </div>
          <div className="header-right">
            {['7D','30D','12M'].map(p => (
              <button
                key={p}
                className={`btn ${period === p ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setPeriod(p)}
              >
                {p}
              </button>
            ))}
            <div className="date-badge">📅 May 15, 2026</div>
          </div>
        </div>

        <div className="kpi-grid">
          <KPI color="purple" icon="👁️"  label="Total Visitors"   value="94,230" change="+18.4%" up />
          <KPI color="green"  icon="💰"  label="Revenue"          value="$84,120" change="+12.1%" up />
          <KPI color="orange" icon="🎯"  label="Conv. Rate"       value="4.27%"   change="+0.8%" up />
          <KPI color="red"    icon="⏱️"  label="Avg. Session"     value="3m 54s"  change="-0.3%" />
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-title">Traffic Overview</div>
            <div className="chart-sub">Visitors & sessions over the last 12 months</div>
            <div style={{ height: 240 }}>
              <Line data={TRAFFIC_DATA} options={CHART_OPTS} />
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-title">Revenue (Jul–Dec)</div>
            <div className="chart-sub">Monthly revenue in thousands</div>
            <div style={{ height: 240 }}>
              <Bar data={REVENUE_DATA} options={CHART_OPTS} />
            </div>
          </div>
        </div>

        <div className="bottom-grid">
          <div className="chart-card">
            <div className="chart-title">Top Pages</div>
            <div className="chart-sub">By pageviews this month</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Views</th>
                  <th>Bounce</th>
                  <th>Time</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {PAGES.map(p => (
                  <tr key={p.path}>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{p.path}</td>
                    <td>{p.views}</td>
                    <td>
                      <span className={`badge ${p.bounce < '30%' ? 'badge-green' : p.bounce > '45%' ? 'badge-orange' : 'badge-green'}`}>
                        {p.bounce}
                      </span>
                    </td>
                    <td>{p.time}</td>
                    <td className={p.status === 'up' ? 'trend-positive' : p.status === 'down' ? 'trend-negative' : ''}>
                      {p.status === 'up' ? '↑' : p.status === 'down' ? '↓' : '→'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="chart-card">
            <div className="chart-title">Traffic Sources</div>
            <div className="chart-sub">Where your visitors come from</div>
            <div style={{ height: 180, marginBottom: 20 }}>
              <Doughnut data={DONUT_DATA} options={DONUT_OPTS} />
            </div>
            <div className="source-list">
              {SOURCES.map(s => (
                <div className="source-item" key={s.name}>
                  <div className="source-header">
                    <span className="source-name">{s.name}</span>
                    <span className="source-pct">{s.pct}%</span>
                  </div>
                  <div className="source-bar">
                    <div className="source-fill" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function KPI({ color, icon, label, value, change, up }) {
  return (
    <div className={`kpi-card ${color}`}>
      <div className="kpi-header">
        <div className="kpi-label">{label}</div>
        <div className="kpi-icon">{icon}</div>
      </div>
      <div className="kpi-value">{value}</div>
      <div className={`kpi-change ${up ? 'up' : 'down'}`}>
        {up ? '↑' : '↓'} {change} vs last period
      </div>
    </div>
  )
}
