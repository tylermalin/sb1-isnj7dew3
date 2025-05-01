/*
  # Create storage bucket for birthday videos

  1. New Storage Bucket
    - Creates a new public storage bucket named 'birthday-videos'
    - Enables public access for video viewing
  
  2. Security
    - Enables RLS on the bucket
    - Adds policy for authenticated users to upload videos
    - Adds policy for public access to view videos
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('birthday-videos', 'birthday-videos', true);

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to upload videos
CREATE POLICY "Users can upload videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'birthday-videos' AND
  (storage.foldername(name))[1] = 'videos'
);

-- Create policy to allow public access to view videos
CREATE POLICY "Anyone can view videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'birthday-videos');