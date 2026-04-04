-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sports_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_subscriptions ENABLE ROW LEVEL SECURITY;

-- =====================
-- PROFILES
-- =====================
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- =====================
-- SPORTS_PROFILES
-- =====================
CREATE POLICY "Sports profiles are viewable by everyone"
  ON sports_profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own sports profiles"
  ON sports_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sports profiles"
  ON sports_profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sports profiles"
  ON sports_profiles FOR DELETE USING (auth.uid() = user_id);

-- =====================
-- TEAMS
-- =====================
CREATE POLICY "Teams are viewable by everyone"
  ON teams FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create teams"
  ON teams FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Team captains can update their teams"
  ON teams FOR UPDATE USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = teams.id
        AND team_members.user_id = auth.uid()
        AND team_members.role = 'captain'
    )
  );

CREATE POLICY "Team creators can delete their teams"
  ON teams FOR DELETE USING (auth.uid() = created_by);

-- =====================
-- TEAM_MEMBERS
-- =====================
CREATE POLICY "Team members are viewable by everyone"
  ON team_members FOR SELECT USING (true);

CREATE POLICY "Authenticated users can join teams"
  ON team_members FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave teams or captains can remove members"
  ON team_members FOR DELETE USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.team_id = team_members.team_id
        AND tm.user_id = auth.uid()
        AND tm.role = 'captain'
    )
  );

CREATE POLICY "Captains can update member roles"
  ON team_members FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.team_id = team_members.team_id
        AND tm.user_id = auth.uid()
        AND tm.role = 'captain'
    )
  );

-- =====================
-- CHALLENGES
-- =====================
CREATE POLICY "Challenges are viewable by everyone"
  ON challenges FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create challenges"
  ON challenges FOR INSERT WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Challenger or challenged can update challenges"
  ON challenges FOR UPDATE USING (
    auth.uid() = challenger_id OR
    auth.uid() = challenged_id
  );

CREATE POLICY "Challengers can delete their own pending challenges"
  ON challenges FOR DELETE USING (
    auth.uid() = challenger_id AND status = 'pending'
  );

-- =====================
-- VENUES
-- =====================
CREATE POLICY "Venues are viewable by everyone"
  ON venues FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create venues"
  ON venues FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Venue owners can update their venues"
  ON venues FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Venue owners can delete their venues"
  ON venues FOR DELETE USING (auth.uid() = owner_id);

-- =====================
-- BOOKINGS
-- =====================
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT USING (
    auth.uid() = booked_by OR
    EXISTS (
      SELECT 1 FROM venues
      WHERE venues.id = bookings.venue_id
        AND venues.owner_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create bookings"
  ON bookings FOR INSERT WITH CHECK (auth.uid() = booked_by);

CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE USING (
    auth.uid() = booked_by OR
    EXISTS (
      SELECT 1 FROM venues
      WHERE venues.id = bookings.venue_id
        AND venues.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can cancel their own bookings"
  ON bookings FOR DELETE USING (auth.uid() = booked_by);

-- =====================
-- MATCHES
-- =====================
CREATE POLICY "Matches are viewable by everyone"
  ON matches FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create matches"
  ON matches FOR INSERT WITH CHECK (
    auth.uid() = home_player_id OR
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = home_team_id
        AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Match participants can update matches"
  ON matches FOR UPDATE USING (
    auth.uid() = home_player_id OR
    auth.uid() = away_player_id OR
    EXISTS (
      SELECT 1 FROM team_members
      WHERE (team_members.team_id = home_team_id OR team_members.team_id = away_team_id)
        AND team_members.user_id = auth.uid()
    )
  );

-- =====================
-- RATINGS
-- =====================
CREATE POLICY "Ratings are viewable by everyone"
  ON ratings FOR SELECT USING (true);

CREATE POLICY "Match participants can submit ratings"
  ON ratings FOR INSERT WITH CHECK (auth.uid() = rater_id);

CREATE POLICY "Raters can update their own ratings"
  ON ratings FOR UPDATE USING (auth.uid() = rater_id);

-- =====================
-- WEBHOOK_SUBSCRIPTIONS
-- =====================
CREATE POLICY "Users can view their own webhooks"
  ON webhook_subscriptions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own webhooks"
  ON webhook_subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own webhooks"
  ON webhook_subscriptions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own webhooks"
  ON webhook_subscriptions FOR DELETE USING (auth.uid() = user_id);
