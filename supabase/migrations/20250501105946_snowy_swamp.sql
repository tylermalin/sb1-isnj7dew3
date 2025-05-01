/*
  # Add video upload policies

  1. Changes
    - Add storage policy for birthday-videos bucket
    - Add RLS policy for video uploads to videos table
  
  2. Security
    - Enable RLS on videos table (already enabled)
    - Add policy for authenticated users to upload videos
    - Add storage policy for authenticated users to upload to birthday-videos bucket
*/

-- Add storage policy for birthday-videos bucket
BEGIN;
  -- Create policy to allow authenticated uploads to birthday-videos bucket
  CREATE POLICY "Allow authenticated uploads to birthday-videos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'birthday-videos' AND
    (storage.foldername(name))[1] = 'videos'
  );

  -- Create policy to allow authenticated users to read from birthday-videos bucket
  CREATE POLICY "Allow authenticated reads from birthday-videos"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'birthday-videos' AND
    (storage.foldername(name))[1] = 'videos'
  );
COMMIT;

-- Add RLS policy for video uploads
BEGIN;
  -- Add policy for authenticated users to insert videos
  CREATE POLICY "Authenticated users can insert videos"
  ON videos
  FOR INSERT TO authenticated
  WITH CHECK (
    user_name IS NOT NULL AND
    user_name <> ''
  );
COMMIT;