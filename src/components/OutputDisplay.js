import React, { useState } from 'react';
import { Twitter, Save, Copy, Download, Check } from 'lucide-react';

const OutputDisplay = ({ 
  outputText, 
  onTweet, 
  onSave, 
  onCopy, 
  onDownload, 
  isLoading 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Remixed Output</h2>
        
        {outputText && (
          <div className="flex items-center space-x-2">
            <button
              onClick={onTweet}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
              title="Tweet this content"
            >
              <Twitter className="h-4 w-4" />
            </button>
            
            <button
              onClick={onSave}
              className="p-2 text-gray-600 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50"
              title="Save to database"
            >
              <Save className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleCopy}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors rounded-lg hover:bg-purple-50"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            
            <button
              onClick={onDownload}
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors rounded-lg hover:bg-orange-50"
              title="Download as text file"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      
      <div className="relative">
        {isLoading ? (
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-3"></div>
              <p className="text-gray-600">AI is remixing your content...</p>
            </div>
          </div>
        ) : outputText ? (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <textarea
                value={outputText}
                readOnly
                className="w-full h-64 bg-transparent border-none resize-none focus:outline-none text-gray-800"
                placeholder="Your remixed content will appear here..."
              />
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{outputText.length} characters</span>
              <span>{outputText.split(' ').length} words</span>
            </div>
          </div>
        ) : (
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <p>Your remixed content will appear here</p>
              <p className="text-sm mt-1">Select a remix option to get started</p>
            </div>
          </div>
        )}
      </div>
      
      {outputText && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-800">
              Content ready! Use the buttons above to share, save, or download.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputDisplay; 