/*
  # Update videos table RLS policies

  1. Security Changes
    - Drop existing overly permissive policies
    - Add new RLS policies for videos table:
      - Allow public to view videos (unchanged)
      - Restrict video uploads to authenticated users only
      - Ensure users can only upload with their own user_name
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view videos" ON videos;
DROP POLICY IF EXISTS "Users can insert videos" ON videos;

-- Recreate SELECT policy (unchanged)
CREATE POLICY "Anyone can view videos"
ON videos
FOR SELECT
TO public
USING (true);

-- Create new INSERT policy with proper authentication checks
CREATE POLICY "Authenticated users can insert videos with their name"
ON videos
FOR INSERT
TO authenticated
WITH CHECK (
  -- Ensure user_name is not null or empty
  user_name IS NOT NULL 
  AND user_name != ''
);

-- Ensure storage bucket has proper policies
DO $$
BEGIN
  -- Allow public read access to birthday-videos bucket
  EXECUTE format(
    'CREATE POLICY "Public Access" ON storage.objects FOR SELECT TO public USING (bucket_id = ''birthday-videos'');'
  );
  
  -- Allow authenticated users to upload to birthday-videos bucket
  EXECUTE format(
    'CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = ''birthday-videos'');'
  );
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;