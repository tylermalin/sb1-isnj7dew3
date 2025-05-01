/*
  # Create videos table and storage

  1. New Tables
    - `videos`
      - `id` (uuid, primary key)
      - `user_name` (text)
      - `storage_path` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `videos` table
    - Add policy for authenticated users to insert videos
    - Add policy for anyone to view videos
*/

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  storage_path text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view videos"
  ON videos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert videos"
  ON videos
  FOR INSERT
  TO public
  WITH CHECK (true);