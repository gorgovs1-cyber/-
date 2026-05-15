import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import AddTransaction from './components/AddTransaction'
import Transactions from './components/Transactions'
import Summary from './components/Summary'
import Goals from './components/Goals'
import BottomNav from './components/BottomNav'
import './index.css'

const SAMPLE_TXS = [
  { id: 's1',  type: 'income',  amount: 12000, category: 'salary',        description: 'משכורת מאי',       date: '2026-05-01' },
  { id: 's2',  type: 'expense', amount: 3500,  category: 'rent',          description: 'שכירות',            date: '2026-05-01' },
  { id: 's3',  type: 'expense', amount: 450,   category: 'food',          description: 'סופרמרקט',          date: '2026-05-03' },
  { id: 's4',  type: 'expense', amount: 280,   category: 'car',           description: 'דלק',               date: '2026-05-05' },
  { id: 's5',  type: 'expense', amount: 89,    category: 'subscriptions', description: 'נטפליקס + ספוטיפיי', date: '2026-05-05' },
  { id: 's6',  type: 'expense', amount: 320,   category: 'health',        description: 'רופאה + תרופות',    date: '2026-05-08' },
  { id: 's7',  type: 'expense', amount: 580,   category: 'shopping',      description: 'ביגוד',             date: '2026-05-10' },
  { id: 's8',  type: 'expense', amount: 220,   category: 'food',          description: 'מסעדה',             date: '2026-05-12' },
  { id: 's9',  type: 'income',  amount: 2500,  category: 'freelance',     description: 'פרויקט פרילנס',     date: '2026-05-14' },
  { id: 's10', type: 'expense', amount: 150,   category: 'entertainment', description: 'קולנוע',            date: '2026-05-14' },
]

const SAMPLE_GOALS = [
  { id: 'g1', name: 'חופשה לאירופה', icon: '✈️', target: 15000, saved: 4200,  color: '#C49A6C', deadline: '2026-08-01' },
  { id: 'g2', name: 'רכב חדש',       icon: '🚗', target: 80000, saved: 22000, color: '#85A8D8', deadline: '2027-01-01' },
  { id: 'g3', name: 'קרן חירום',     icon: '🛡️', target: 30000, saved: 18500, color: '#6DB898', deadline: '2026-12-01' },
]

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}

export default function App() {
  const [txs,   setTxs]   = useState(() => load('pf_transactions', SAMPLE_TXS))
  const [goals, setGoals] = useState(() => load('pf_goals',        SAMPLE_GOALS))
  const [tab,   setTab]   = useState('home')
  const [modal, setModal] = useState(null) // null | 'expense' | 'income'

  useEffect(() => { localStorage.setItem('pf_transactions', JSON.stringify(txs))   }, [txs])
  useEffect(() => { localStorage.setItem('pf_goals',        JSON.stringify(goals)) }, [goals])

  const addTx     = (tx)       => { setTxs(p => [{ ...tx, id: Date.now().toString() }, ...p]); setModal(null) }
  const deleteTx  = (id)       => setTxs(p => p.filter(t => t.id !== id))
  const addGoal   = (g)        => setGoals(p => [{ ...g, id: Date.now().toString() }, ...p])
  const updateGoal = (id, upd) => setGoals(p => p.map(g => g.id === id ? { ...g, ...upd } : g))
  const deleteGoal = (id)      => setGoals(p => p.filter(g => g.id !== id))

  const openAdd = (type = 'expense') => setModal(type)

  return (
    <div className="app">
      {tab === 'home'         && <Dashboard    txs={txs} goals={goals} onAdd={openAdd} />}
      {tab === 'transactions' && <Transactions txs={txs} onDelete={deleteTx} onAdd={openAdd} />}
      {tab === 'summary'      && <Summary      txs={txs} />}
      {tab === 'goals'        && <Goals        goals={goals} onAdd={addGoal} onUpdate={updateGoal} onDelete={deleteGoal} />}

      <BottomNav active={tab} onChange={setTab} onAdd={() => openAdd('expense')} />

      {modal && <AddTransaction type={modal} onSave={addTx} onClose={() => setModal(null)} />}
    </div>
  )
}
