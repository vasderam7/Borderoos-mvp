export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string
          avatar_url: string | null
          bio: string | null
          location: unknown | null
          city: string | null
          country: string | null
          date_of_birth: string | null
          sports: string[]
          skill_levels: Json
          rating_elo: Json
          matches_played: number
          wins: number
          losses: number
          draws: number
          profile_completeness: number
          is_referee: boolean
          onboarding_complete: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name: string
          avatar_url?: string | null
          bio?: string | null
          location?: unknown | null
          city?: string | null
          country?: string | null
          date_of_birth?: string | null
          sports?: string[]
          skill_levels?: Json
          rating_elo?: Json
          matches_played?: number
          wins?: number
          losses?: number
          draws?: number
          profile_completeness?: number
          is_referee?: boolean
          onboarding_complete?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string
          avatar_url?: string | null
          bio?: string | null
          location?: unknown | null
          city?: string | null
          country?: string | null
          date_of_birth?: string | null
          sports?: string[]
          skill_levels?: Json
          rating_elo?: Json
          matches_played?: number
          wins?: number
          losses?: number
          draws?: number
          profile_completeness?: number
          is_referee?: boolean
          onboarding_complete?: boolean
          updated_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          sport: string
          logo_url: string | null
          captain_id: string
          city: string | null
          country: string | null
          rating_elo: number
          is_open: boolean
          max_players: number
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          sport: string
          logo_url?: string | null
          captain_id: string
          city?: string | null
          country?: string | null
          rating_elo?: number
          is_open?: boolean
          max_players?: number
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          sport?: string
          logo_url?: string | null
          captain_id?: string
          city?: string | null
          country?: string | null
          rating_elo?: number
          is_open?: boolean
          max_players?: number
          description?: string | null
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          team_id: string
          player_id: string
          role: 'captain' | 'player' | 'substitute'
          joined_at: string
        }
        Insert: {
          team_id: string
          player_id: string
          role?: 'captain' | 'player' | 'substitute'
          joined_at?: string
        }
        Update: {
          team_id?: string
          player_id?: string
          role?: 'captain' | 'player' | 'substitute'
          joined_at?: string
        }
      }
      challenges: {
        Row: {
          id: string
          challenger_id: string
          challenger_type: 'team' | 'player'
          opponent_id: string | null
          opponent_type: 'team' | 'player' | null
          sport: string
          match_type: 'singles' | 'doubles' | '5v5' | '7v7' | '11v11'
          proposed_time: string | null
          venue_id: string | null
          status: 'open' | 'accepted' | 'declined' | 'completed' | 'cancelled'
          message: string | null
          is_open_challenge: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          challenger_id: string
          challenger_type: 'team' | 'player'
          opponent_id?: string | null
          opponent_type?: 'team' | 'player' | null
          sport: string
          match_type: 'singles' | 'doubles' | '5v5' | '7v7' | '11v11'
          proposed_time?: string | null
          venue_id?: string | null
          status?: 'open' | 'accepted' | 'declined' | 'completed' | 'cancelled'
          message?: string | null
          is_open_challenge?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          opponent_id?: string | null
          opponent_type?: 'team' | 'player' | null
          proposed_time?: string | null
          venue_id?: string | null
          status?: 'open' | 'accepted' | 'declined' | 'completed' | 'cancelled'
          message?: string | null
          updated_at?: string
        }
      }
      venues: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          country: string
          location: unknown | null
          sport_types: string[]
          surface_type: string | null
          hourly_rate: number
          currency: string
          amenities: string[]
          photos: string[]
          owner_id: string | null
          avg_rating: number
          total_reviews: number
          is_active: boolean
          operating_hours: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          country: string
          location?: unknown | null
          sport_types?: string[]
          surface_type?: string | null
          hourly_rate?: number
          currency?: string
          amenities?: string[]
          photos?: string[]
          owner_id?: string | null
          avg_rating?: number
          total_reviews?: number
          is_active?: boolean
          operating_hours?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          address?: string
          city?: string
          country?: string
          location?: unknown | null
          sport_types?: string[]
          surface_type?: string | null
          hourly_rate?: number
          currency?: string
          amenities?: string[]
          photos?: string[]
          owner_id?: string | null
          avg_rating?: number
          total_reviews?: number
          is_active?: boolean
          operating_hours?: Json
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          venue_id: string
          booked_by: string
          team_id: string | null
          match_id: string | null
          start_time: string
          end_time: string
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          total_price: number
          payment_status: 'unpaid' | 'paid' | 'refunded'
          payment_intent_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          venue_id: string
          booked_by: string
          team_id?: string | null
          match_id?: string | null
          start_time: string
          end_time: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          total_price?: number
          payment_status?: 'unpaid' | 'paid' | 'refunded'
          payment_intent_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          total_price?: number
          payment_status?: 'unpaid' | 'paid' | 'refunded'
          payment_intent_id?: string | null
          notes?: string | null
          updated_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          challenge_id: string | null
          sport: string
          match_type: string
          venue_id: string | null
          scheduled_at: string | null
          status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          home_team_id: string | null
          away_team_id: string | null
          home_player_id: string | null
          away_player_id: string | null
          home_score: number | null
          away_score: number | null
          home_confirmed: boolean
          away_confirmed: boolean
          winner_id: string | null
          referee_id: string | null
          match_data: Json
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          challenge_id?: string | null
          sport: string
          match_type: string
          venue_id?: string | null
          scheduled_at?: string | null
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          home_team_id?: string | null
          away_team_id?: string | null
          home_player_id?: string | null
          away_player_id?: string | null
          home_score?: number | null
          away_score?: number | null
          home_confirmed?: boolean
          away_confirmed?: boolean
          winner_id?: string | null
          referee_id?: string | null
          match_data?: Json
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          scheduled_at?: string | null
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          home_score?: number | null
          away_score?: number | null
          home_confirmed?: boolean
          away_confirmed?: boolean
          winner_id?: string | null
          referee_id?: string | null
          match_data?: Json
          verified?: boolean
          updated_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          rater_id: string
          rated_entity_id: string
          rated_entity_type: 'player' | 'team' | 'venue' | 'referee'
          match_id: string | null
          skill_rating: number | null
          fairplay_rating: number | null
          facility_rating: number | null
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          rater_id: string
          rated_entity_id: string
          rated_entity_type: 'player' | 'team' | 'venue' | 'referee'
          match_id?: string | null
          skill_rating?: number | null
          fairplay_rating?: number | null
          facility_rating?: number | null
          comment?: string | null
          created_at?: string
        }
        Update: {
          skill_rating?: number | null
          fairplay_rating?: number | null
          facility_rating?: number | null
          comment?: string | null
        }
      }
      sponsors: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          website_url: string | null
          contact_email: string | null
          tier: 'local' | 'regional' | 'global'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          website_url?: string | null
          contact_email?: string | null
          tier?: 'local' | 'regional' | 'global'
          created_at?: string
        }
        Update: {
          name?: string
          logo_url?: string | null
          website_url?: string | null
          contact_email?: string | null
          tier?: 'local' | 'regional' | 'global'
        }
      }
      sponsorships: {
        Row: {
          id: string
          sponsor_id: string
          entity_id: string
          entity_type: 'tournament' | 'team' | 'player'
          amount: number | null
          currency: string
          status: 'active' | 'paused' | 'completed'
          start_date: string | null
          end_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          sponsor_id: string
          entity_id: string
          entity_type: 'tournament' | 'team' | 'player'
          amount?: number | null
          currency?: string
          status?: 'active' | 'paused' | 'completed'
          start_date?: string | null
          end_date?: string | null
          created_at?: string
        }
        Update: {
          amount?: number | null
          currency?: string
          status?: 'active' | 'paused' | 'completed'
          start_date?: string | null
          end_date?: string | null
        }
      }
    }
    Views: {
      leaderboards: {
        Row: {
          player_id: string | null
          sport: string | null
          city: string | null
          country: string | null
          elo_rating: number | null
          matches_played: number | null
          win_rate: number | null
          display_name: string | null
          avatar_url: string | null
          rank_city: number | null
          rank_country: number | null
          rank_global: number | null
        }
      }
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Convenience row types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Team = Database['public']['Tables']['teams']['Row']
export type TeamMember = Database['public']['Tables']['team_members']['Row']
export type Challenge = Database['public']['Tables']['challenges']['Row']
export type Venue = Database['public']['Tables']['venues']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type Match = Database['public']['Tables']['matches']['Row']
export type Rating = Database['public']['Tables']['ratings']['Row']
export type Sponsor = Database['public']['Tables']['sponsors']['Row']
export type Sponsorship = Database['public']['Tables']['sponsorships']['Row']
export type LeaderboardEntry = Database['public']['Views']['leaderboards']['Row']
