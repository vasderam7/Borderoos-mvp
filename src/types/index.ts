export * from './database'

// Sport constants
export const SPORTS = ['pickleball', 'football', 'futsal'] as const
export type Sport = typeof SPORTS[number]

export const MATCH_TYPES_BY_SPORT: Record<Sport, string[]> = {
  pickleball: ['singles', 'doubles'],
  football: ['5v5', '7v7', '11v11'],
  futsal: ['5v5'],
}

// ELO starting values by skill level
export const SKILL_ELO: Record<string, number> = {
  beginner: 1000,
  intermediate: 1300,
  advanced: 1600,
  pro: 1800,
}

// Glicko-2 defaults
export const GLICKO2_DEFAULTS = {
  rating: 1500,
  rd: 350,
  volatility: 0.06,
}

// Composite / enriched types used across UI
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  meta?: {
    total?: number
    page?: number
    limit?: number
    [key: string]: unknown
  }
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface ProfileWithStats {
  profile: import('./database').Profile
  eloBySport: Record<string, number>
  winRate: number
}

export interface TeamWithMembers {
  team: import('./database').Team
  members: Array<{
    member: import('./database').TeamMember
    profile: import('./database').Profile
  }>
  memberCount: number
}

export interface VenueWithOwner {
  venue: import('./database').Venue
  owner: import('./database').Profile | null
}

export interface ChallengeWithDetails {
  challenge: import('./database').Challenge
  challenger?: import('./database').Profile
  opponent?: import('./database').Profile
  venue?: import('./database').Venue
}

export interface MatchWithDetails {
  match: import('./database').Match
  homePlayer?: import('./database').Profile
  awayPlayer?: import('./database').Profile
  homeTeam?: import('./database').Team
  awayTeam?: import('./database').Team
  venue?: import('./database').Venue
}

export interface GlickoResult {
  newRating: number
  newRD: number
  newVolatility: number
}
