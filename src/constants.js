export const EXPENSE_CATEGORIES = [
  { id: 'food',          label: 'אוכל',    icon: '🍽️', color: '#E8907A' },
  { id: 'car',           label: 'רכב',     icon: '🚗', color: '#7AAED4' },
  { id: 'rent',          label: 'שכירות',  icon: '🏠', color: '#B09AC8' },
  { id: 'business',      label: 'עסקי',    icon: '💼', color: '#C49A6C' },
  { id: 'personal',      label: 'אישי',    icon: '💄', color: '#E8A0B8' },
  { id: 'health',        label: 'בריאות',  icon: '❤️', color: '#6DB898' },
  { id: 'subscriptions', label: 'מנויים',  icon: '📱', color: '#85A8D8' },
  { id: 'shopping',      label: 'קניות',   icon: '🛍️', color: '#E8C07A' },
  { id: 'entertainment', label: 'בידור',   icon: '🎭', color: '#C49AD4' },
  { id: 'education',     label: 'חינוך',   icon: '📚', color: '#6DB8A0' },
  { id: 'other',         label: 'אחר',     icon: '✨', color: '#C4B49A' },
]

export const INCOME_CATEGORIES = [
  { id: 'salary',     label: 'משכורת',  icon: '💰', color: '#C49A6C' },
  { id: 'freelance',  label: 'פרילנס',  icon: '💻', color: '#85A8D8' },
  { id: 'investment', label: 'השקעות',  icon: '📈', color: '#6DB898' },
  { id: 'gift',       label: 'מתנה',    icon: '🎁', color: '#E8A0B8' },
  { id: 'other_inc',  label: 'אחר',     icon: '✨', color: '#C4B49A' },
]

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]

export const getCat = (id) =>
  ALL_CATEGORIES.find(c => c.id === id) ?? { id: 'other', label: 'אחר', icon: '✨', color: '#C4B49A' }

export const fmt = (n) => '₪' + Math.round(Math.abs(n)).toLocaleString('he-IL')

export const fmtDate = (str) =>
  new Date(str).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })

export const fmtShort = (str) =>
  new Date(str).toLocaleDateString('he-IL', { day: 'numeric', month: 'short' })

export const monthLabel = (d) =>
  d.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })

export const byMonth = (txs, d) =>
  txs.filter(t => {
    const td = new Date(t.date)
    return td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear()
  })

export const today = () => new Date().toISOString().split('T')[0]
