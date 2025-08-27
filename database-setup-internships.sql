-- Database setup for LinkUp Internships System
-- Run this in your Supabase SQL editor

-- Create internships table if it doesn't exist
CREATE TABLE IF NOT EXISTS internships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  location TEXT NOT NULL,
  type TEXT NOT NULL, -- remote, onsite, hybrid
  duration TEXT NOT NULL,
  stipend TEXT,
  requirements TEXT[],
  deadline DATE NOT NULL,
  posted_date DATE DEFAULT CURRENT_DATE,
  applicants INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  contributor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create internship_applications table if it doesn't exist
CREATE TABLE IF NOT EXISTS internship_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  internship_id UUID REFERENCES internships(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending', -- pending, accepted, rejected
  UNIQUE(internship_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_internships_type ON internships(type);
CREATE INDEX IF NOT EXISTS idx_internships_deadline ON internships(deadline);
CREATE INDEX IF NOT EXISTS idx_internships_is_active ON internships(is_active);
CREATE INDEX IF NOT EXISTS idx_internship_applications_internship_id ON internship_applications(internship_id);
CREATE INDEX IF NOT EXISTS idx_internship_applications_user_id ON internship_applications(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for internships table
-- Anyone can read active internships
CREATE POLICY "Anyone can read active internships" ON internships
  FOR SELECT USING (is_active = true);

-- Contributors can insert/update/delete their own internships
CREATE POLICY "Contributors can manage their own internships" ON internships
  FOR ALL USING (contributor_id = auth.uid());

-- RLS Policies for internship_applications table
-- Users can read their own applications
CREATE POLICY "Users can read their own applications" ON internship_applications
  FOR SELECT USING (user_id = auth.uid());

-- Contributors can read applications for their internships
CREATE POLICY "Contributors can read applications for their internships" ON internship_applications
  FOR SELECT USING (
    internship_id IN (
      SELECT id FROM internships WHERE contributor_id = auth.uid()
    )
  );

-- Users can insert their own applications
CREATE POLICY "Users can insert their own applications" ON internship_applications
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can delete their own applications
CREATE POLICY "Users can delete their own applications" ON internship_applications
  FOR DELETE USING (user_id = auth.uid());

-- Contributors can update application status for their internships
CREATE POLICY "Contributors can update application status" ON internship_applications
  FOR UPDATE USING (
    internship_id IN (
      SELECT id FROM internships WHERE contributor_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_internships_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_internships_updated_at 
  BEFORE UPDATE ON internships 
  FOR EACH ROW 
  EXECUTE FUNCTION update_internships_updated_at_column();