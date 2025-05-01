import React, { useRef, useState } from 'react';
import { Camera, StopCircle, Upload, RefreshCcw } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface VideoRecorderProps {
  onRecordingComplete: (path: string) => void;
  userName: string;
}

export default function VideoRecorder({ onRecordingComplete, userName }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordedBlob(blob);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = URL.createObjectURL(blob);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please ensure you have granted permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setRecordedBlob(null);
    if (videoRef.current) {
      videoRef.current.src = '';
    }
  };

  const uploadVideo = async () => {
    if (!recordedBlob) return;

    setIsUploading(true);
    try {
      const fileName = `${userName}-${Date.now()}.webm`;
      const filePath = `videos/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('birthday-videos')
        .upload(filePath, recordedBlob);

      if (uploadError) throw uploadError;

      // Create database record
      const { error: dbError } = await supabase
        .from('videos')
        .insert([
          {
            user_name: userName,
            storage_path: filePath
          }
        ]);

      if (dbError) throw dbError;

      onRecordingComplete(filePath);
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isRecording}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-center gap-4">
        {!recordedBlob ? (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg'
            } text-white transition-all duration-300`}
          >
            {isRecording ? (
              <>
                <StopCircle className="w-5 h-5" />
                Stop Recording
              </>
            ) : (
              <>
                <Camera className="w-5 h-5" />
                Start Recording
              </>
            )}
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={resetRecording}
              className="px-6 py-3 rounded-full font-medium bg-gray-500 hover:bg-gray-600 
                       text-white transition-all duration-300 flex items-center gap-2"
            >
              <RefreshCcw className="w-5 h-5" />
              Record Again
            </button>
            <button
              onClick={uploadVideo}
              disabled={isUploading}
              className="px-6 py-3 rounded-full font-medium bg-gradient-to-r from-green-500 to-emerald-500 
                       hover:shadow-lg text-white transition-all duration-300 flex items-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-5 h-5" />
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}