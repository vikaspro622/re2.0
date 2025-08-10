import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Mic, Play, Pause, X } from 'lucide-react';

const AudioUpload = ({ onTranscription, audioFile, setAudioFile }) => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  }, [setAudioFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg']
    },
    multiple: false
  });

  const handleTranscribe = async () => {
    if (!audioFile) return;

    setIsTranscribing(true);
    
    try {
      // Simulate transcription API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock transcription result - replace with actual API call
      const mockTranscription = "This is a simulated transcription of the uploaded audio file. In a real implementation, this would be the actual transcribed text from the audio content.";
      
      onTranscription(mockTranscription);
    } catch (error) {
      console.error('Transcription error:', error);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      // Stop audio playback
    } else {
      setIsPlaying(true);
      // Start audio playback
    }
  };

  const handleRemove = () => {
    setAudioFile(null);
    setAudioUrl(null);
    setIsPlaying(false);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Audio File
      </label>
      
      {!audioFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary-400 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? 'Drop the audio file here...'
              : 'Drag & drop an audio file here, or click to select'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supports MP3, WAV, M4A, OGG
          </p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mic className="h-5 w-5 text-primary-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {audioFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePlayPause}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
              
              <button
                onClick={handleRemove}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Remove"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="mt-3">
            <button
              onClick={handleTranscribe}
              disabled={isTranscribing}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Mic className="h-4 w-4" />
              <span>
                {isTranscribing ? 'Transcribing...' : 'Transcribe Audio'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioUpload; 