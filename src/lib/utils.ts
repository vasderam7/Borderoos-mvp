import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatRating(rating: number): string {
  return Math.round(rating).toString()
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function getSportEmoji(sport: string): string {
  const emojis: Record<string, string> = {
    pickleball: '🏓',
    football: '⚽',
    futsal: '🥅',
  }
  return emojis[sport] || '🏆'
}

export function getSportColor(sport: string): string {
  const colors: Record<string, string> = {
    pickleball: '#00FF87',
    football: '#FFD700',
    futsal: '#FF6B35',
  }
  return colors[sport] || '#00FF87'
}

export function calculateWinRate(wins: number, losses: number, draws: number): number {
  const total = wins + losses + draws
  if (total === 0) return 0
  return Math.round(((wins + draws * 0.5) / total) * 100)
}

export function getRatingTier(rating: number): { label: string; color: string } {
  if (rating >= 2200) return { label: 'Elite', color: '#FFD700' }
  if (rating >= 1900) return { label: 'Diamond', color: '#00BFFF' }
  if (rating >= 1600) return { label: 'Platinum', color: '#E5E4E2' }
  if (rating >= 1400) return { label: 'Gold', color: '#FFD700' }
  if (rating >= 1200) return { label: 'Silver', color: '#C0C0C0' }
  return { label: 'Bronze', color: '#CD7F32' }
}

export function parseSearchParams(searchParams: URLSearchParams): Record<string, string> {
  const params: Record<string, string> = {}
  searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}
