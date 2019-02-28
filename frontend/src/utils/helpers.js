export function formatDate (timestamp) {
  const d = new Date(timestamp)
  return d.toLocaleString()
}

export function formatCategoryName(name = '') {	
  return name.trim() !== '' ? name[0].toUpperCase() + name.slice(1) : '';
}

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}