-- Database setup for LinkUp Events System
-- Run this in your Supabase SQL editor

-- Create events table if it doesn't exist
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  category TEXT NOT NULL,
  organizer TEXT NOT NULL,
  max_attendees INTEGER NOT NULL DEFAULT 100,
  attendees INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  contributor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_registrations table if it doesn't exist
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_is_active ON events(is_active);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON event_registrations(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events table
-- Anyone can read active events
CREATE POLICY "Anyone can read active events" ON events
  FOR SELECT USING (is_active = true);

-- Contributors can insert/update/delete their own events
CREATE POLICY "Contributors can manage their own events" ON events
  FOR ALL USING (contributor_id = auth.uid());

-- RLS Policies for event_registrations table
-- Users can read their own registrations
CREATE POLICY "Users can read their own registrations" ON event_registrations
  FOR SELECT USING (user_id = auth.uid());

-- Users can insert their own registrations
CREATE POLICY "Users can insert their own registrations" ON event_registrations
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can delete their own registrations
CREATE POLICY "Users can delete their own registrations" ON event_registrations
  FOR DELETE USING (user_id = auth.uid());

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_events_updated_at 
  BEFORE UPDATE ON events 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
