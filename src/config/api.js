// API Configuration for Remixer
// Replace these with your actual API keys and endpoints

export const API_CONFIG = {
  // OpenRouter Configuration (Primary)
  OPENROUTER_API_KEY: process.env.REACT_APP_OPENROUTER_API_KEY || 'your-openrouter-api-key-here',
  OPENROUTER_API_URL: 'https://openrouter.ai/api/v1/chat/completions',
  // Use a fast, auto-routed default to avoid slow/free-tier queues
  OPENROUTER_MODEL: 'openrouter/auto',
  
  // Alternative AI APIs (for future expansion)
  OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY || 'your-openai-api-key-here',
  OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
  ANTHROPIC_API_KEY: process.env.REACT_APP_ANTHROPIC_API_KEY || 'your-anthropic-api-key-here',
  ANTHROPIC_API_URL: 'https://api.anthropic.com/v1/messages',
  
  // Audio Transcription API
  WHISPER_API_URL: 'https://api.openai.com/v1/audio/transcriptions',
  
  // Database API (for saving remixes)
  DATABASE_API_URL: process.env.REACT_APP_DATABASE_API_URL || 'http://localhost:3001/api',
  
  // Twitter API (for direct tweeting)
  TWITTER_API_KEY: process.env.REACT_APP_TWITTER_API_KEY || 'your-twitter-api-key-here',
  TWITTER_API_URL: 'https://api.twitter.com/2/tweets',
};

// OpenRouter API call function (Primary AI function)
export const callOpenRouter = async (
  prompt,
  systemMessage = 'You are a helpful content remixing assistant.'
) => {
  try {
    if (
      !API_CONFIG.OPENROUTER_API_KEY ||
      API_CONFIG.OPENROUTER_API_KEY.includes('your-openrouter-api-key-here')
    ) {
      throw new Error('Missing OpenRouter API key');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const referer = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

    const response = await fetch(API_CONFIG.OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.OPENROUTER_API_KEY}`,
        'HTTP-Referer': referer,
        'X-Title': 'Remixer App',
      },
      body: JSON.stringify({
        model: API_CONFIG.OPENROUTER_MODEL,
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`OpenRouter API error: ${response.status} ${text}`);
    }

    const data = await response.json();
    const content =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.text ??
      '';

    if (!content) {
      throw new Error('Empty response from OpenRouter');
    }

    return content;
  } catch (error) {
    console.error('OpenRouter API call failed:', error);
    throw error;
  }
};

// Legacy OpenAI function (kept for fallback)
export const callOpenAI = async (prompt, systemMessage = 'You are a helpful content remixing assistant.') => {
  try {
    const response = await fetch(API_CONFIG.OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    throw error;
  }
};

// Audio transcription function
export const transcribeAudio = async (audioFile) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', 'whisper-1');

    const response = await fetch(API_CONFIG.WHISPER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Transcription API error: ${response.status}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Audio transcription failed:', error);
    throw error;
  }
};

// Save remix to database
export const saveRemix = async (remixData) => {
  try {
    const response = await fetch(`${API_CONFIG.DATABASE_API_URL}/remixes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(remixData),
    });

    if (!response.ok) {
      throw new Error(`Database API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Save remix failed:', error);
    throw error;
  }
};

// Get saved remixes
export const getSavedRemixes = async () => {
  try {
    const response = await fetch(`${API_CONFIG.DATABASE_API_URL}/remixes`);
    
    if (!response.ok) {
      throw new Error(`Database API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get saved remixes failed:', error);
    throw error;
  }
}; 