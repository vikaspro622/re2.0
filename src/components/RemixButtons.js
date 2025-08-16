import React from 'react';
import { Sparkles } from 'lucide-react';

const RemixButtons = ({ options, onRemix, isLoading }) => {
  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Remix Options</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onRemix(option.id)}
            disabled={isLoading}
            className={`
              relative p-4 rounded-lg border-2 transition-all duration-200 text-left
              ${isLoading
                ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-60'
                : 'bg-white border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:shadow-md cursor-pointer'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{option.icon}</span>
              <div>
                <h3 className="font-medium text-gray-900">{option.label}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {option.prompt.substring(0, 40)}...
                </p>
              </div>
            </div>
            
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-primary-600 animate-pulse" />
                  <span className="text-sm text-primary-600">Processing...</span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {isLoading && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
            <span className="text-sm text-blue-800">AI is processing your content...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemixButtons; 