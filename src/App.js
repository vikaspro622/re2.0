import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Sparkles } from 'lucide-react';
import AudioUpload from './components/AudioUpload';
import RemixButtons from './components/RemixButtons';
import OutputDisplay from './components/OutputDisplay';
import { callOpenRouter } from './config/api';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [savedRemixes, setSavedRemixes] = useState([]);

  const remixOptions = [
    { id: 'summarize', label: 'Summarize', icon: '📝', prompt: 'Summarize this content in a concise way:' },
    { id: 'expand', label: 'Expand', icon: '📈', prompt: 'Expand and elaborate on this content with more details:' },
    { id: 'simplify', label: 'Simplify', icon: '🔍', prompt: 'Simplify this content to make it easier to understand:' },
    { id: 'professional', label: 'Professional', icon: '💼', prompt: 'Rewrite this content in a professional tone:' },
    { id: 'casual', label: 'Casual', icon: '😊', prompt: 'Rewrite this content in a casual, friendly tone:' },
    { id: 'creative', label: 'Creative', icon: '🎨', prompt: 'Rewrite this content in a creative and engaging way:' },
    { id: 'bullet-points', label: 'Bullet Points', icon: '📋', prompt: 'Convert this content into clear bullet points:' },
    { id: 'story', label: 'Story Format', icon: '📖', prompt: 'Convert this content into a compelling story format:' }
  ];

  const handleRemix = async (remixType) => {
    if (!inputText.trim() && !transcription.trim()) {
      toast.error('Please enter some text or upload an audio file first');
      return;
    }

    setIsLoading(true);
    const textToRemix = transcription || inputText;
    
    try {
      // Get remix option details
      const option = remixOptions.find(opt => opt.id === remixType);
      const systemMessage = option ? option.prompt : 'Process this content:';
      
      // Call OpenRouter API with DeepSeek model
      const response = await callOpenRouter(textToRemix, systemMessage);
      setOutputText(response);
      toast.success('Content remixed successfully with AI!');
    } catch (error) {
      toast.error('Failed to remix content. Please check your API key and try again.');
      console.error('Remix error:', error);
      
      // Fallback to mock for demo purposes
      const mockResponse = await simulateAICall(textToRemix, remixType);
      setOutputText(mockResponse);
      toast.success('Content remixed with demo mode!');
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAICall = async (text, remixType) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const option = remixOptions.find(opt => opt.id === remixType);
    const prompt = option ? option.prompt : 'Process this content:';
    
    // This is a simulation - replace with actual OpenAI API call
    return `${prompt}\n\n${text}\n\n[AI processed content would appear here]`;
  };

  const handleAudioTranscription = (transcribedText) => {
    setTranscription(transcribedText);
    setInputText(transcribedText);
    toast.success('Audio transcribed successfully!');
  };

  const handleTweet = () => {
    if (!outputText.trim()) {
      toast.error('No content to tweet');
      return;
    }
    
    const tweetText = outputText.length > 280 ? outputText.substring(0, 277) + '...' : outputText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
    toast.success('Tweet window opened!');
  };

  const handleSave = () => {
    if (!outputText.trim()) {
      toast.error('No content to save');
      return;
    }

    const newRemix = {
      id: Date.now(),
      input: inputText || transcription,
      output: outputText,
      timestamp: new Date().toISOString(),
      type: 'manual'
    };

    setSavedRemixes(prev => [newRemix, ...prev]);
    toast.success('Remix saved successfully!');
  };

  const handleCopy = () => {
    if (!outputText.trim()) {
      toast.error('No content to copy');
      return;
    }

    navigator.clipboard.writeText(outputText);
    toast.success('Content copied to clipboard!');
  };

  const handleDownload = () => {
    if (!outputText.trim()) {
      toast.error('No content to download');
      return;
    }

    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'remixed-content.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Content downloaded!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Remixer</h1>
            </div>
            <p className="text-sm text-gray-600">AI-Powered Content Remixing Tool</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Input Content</h2>
              
              {/* Text Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste your text here
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter the content you want to remix..."
                  className="input-field h-32 resize-none"
                />
              </div>

              {/* Audio Upload */}
              <AudioUpload 
                onTranscription={handleAudioTranscription}
                audioFile={audioFile}
                setAudioFile={setAudioFile}
              />

              {/* Transcription Display */}
              {transcription && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">Transcription:</h3>
                  <p className="text-sm text-blue-800">{transcription}</p>
                </div>
              )}
            </div>

            {/* Remix Buttons */}
            <RemixButtons 
              options={remixOptions}
              onRemix={handleRemix}
              isLoading={isLoading}
            />
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <OutputDisplay 
              outputText={outputText}
              onTweet={handleTweet}
              onSave={handleSave}
              onCopy={handleCopy}
              onDownload={handleDownload}
              isLoading={isLoading}
            />

            {/* Saved Remixes */}
            {savedRemixes.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Remixes</h2>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {savedRemixes.map((remix) => (
                    <div key={remix.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-gray-500">
                          {new Date(remix.timestamp).toLocaleString()}
                        </span>
                        <button
                          onClick={() => setOutputText(remix.output)}
                          className="text-xs text-primary-600 hover:text-primary-700"
                        >
                          Load
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {remix.output.substring(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 