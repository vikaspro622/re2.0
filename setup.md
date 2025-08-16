# Remixer Setup Guide

This guide will help you set up and run the Remixer application locally.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key (optional for testing)

## Quick Start

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies (optional)
cd server
npm install
cd ..
```

### 2. Environment Setup

```bash
# Copy environment template
cp env.example .env

# Edit .env file with your API keys
# REACT_APP_OPENAI_API_KEY=your-openai-api-key-here
```

### 3. Start the Application

#### Option A: Frontend Only (with mock data)
```bash
npm start
```
Visit: http://localhost:3000

#### Option B: Full Stack (with backend)
```bash
# Terminal 1: Start backend
cd server
npm start

# Terminal 2: Start frontend
npm start
```

## API Integration

### OpenAI Setup (Optional)

1. Get your API key from [OpenAI Platform](https://platform.openai.com/)
2. Add it to `.env`:
   ```
   REACT_APP_OPENAI_API_KEY=sk-your-actual-key-here
   ```
3. The app will use real AI processing instead of mock data

### Backend Setup (Optional)

The backend provides:
- Save remixes to database
- Retrieve saved remixes
- API health checks

To use the backend:
1. Start the server: `cd server && npm start`
2. The frontend will automatically connect to `http://localhost:3001`

## Features Overview

### ✅ Implemented Features

1. **Text Input** - Paste content for remixing
2. **8 Remix Options** - Different transformation styles
3. **Audio Upload** - Drag & drop audio files
4. **Audio Transcription** - Convert speech to text
5. **Tweet Integration** - Share content on Twitter
6. **Save Functionality** - Store remixes locally/remotely
7. **Copy/Download** - Export content easily
8. **Modern UI** - Beautiful, responsive design

### 🔄 Mock vs Real Data

- **Mock Mode**: Works without API keys, shows simulated responses
- **Real Mode**: Uses actual OpenAI API for processing

## Development

### Project Structure

```
remixer/
├── src/
│   ├── components/
│   │   ├── AudioUpload.js
│   │   ├── RemixButtons.js
│   │   └── OutputDisplay.js
│   ├── config/
│   │   └── api.js
│   ├── App.js
│   └── index.js
├── server/
│   ├── server.js
│   └── package.json
├── public/
├── package.json
└── README.me
```

### Key Components

- **App.js**: Main application logic
- **AudioUpload.js**: File upload and transcription
- **RemixButtons.js**: Remix option selection
- **OutputDisplay.js**: Results display and actions
- **api.js**: API configuration and functions

## Troubleshooting

### Common Issues

1. **Port 3000 in use**
   ```bash
   # Use different port
   PORT=3001 npm start
   ```

2. **API key not working**
   - Check `.env` file format
   - Ensure no spaces around `=`
   - Restart development server

3. **Backend not connecting**
   - Check if server is running on port 3001
   - Verify CORS settings
   - Check browser console for errors

### Debug Mode

```bash
# Enable debug logging
REACT_APP_DEBUG=true npm start
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

```
REACT_APP_OPENAI_API_KEY=your-production-key
REACT_APP_DATABASE_API_URL=https://your-api-domain.com
```

## Next Steps

1. Add your OpenAI API key for real AI processing
2. Customize remix prompts in `App.js`
3. Add more AI providers in `api.js`
4. Implement user authentication
5. Add database persistence

## Support

- Check the README.me for detailed documentation
- Review the code comments for implementation details
- Open issues for bugs or feature requests 