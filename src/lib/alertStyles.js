export const severityStyles = {
  low: 'bg-slate-100 text-slate-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
}

export const statusStyles = {
  active: 'bg-blue-100 text-blue-700',
  banned: 'bg-red-100 text-red-700',
  ignored: 'bg-slate-100 text-slate-500',
}

// Derive status values from the const above instead of creating one
export const STATUSES = Object.keys(statusStyles)