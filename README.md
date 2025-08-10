# Remixer - AI-Powered Content Remixing Tool

A modern React application for remixing and transforming content using AI. Built with a clean, intuitive interface and powerful features.

## Features ✅

1. **Text Input & Processing** - Paste text content for remixing
2. **Multiple Remix Options** - 8 different transformation styles
3. **AI API Integration** - OpenAI-powered content processing
4. **Audio Upload & Transcription** - Upload audio files and get text transcription
5. **Tweet Integration** - One-click tweet sharing
6. **Save to Database** - Store remixed content for later use
7. **Copy & Download** - Easy content export options
8. **Modern UI/UX** - Beautiful, responsive design with TailwindCSS

## Remix Options

- 📝 **Summarize** - Condense content into key points
- 📈 **Expand** - Add more detail and elaboration
- 🔍 **Simplify** - Make complex content easier to understand
- 💼 **Professional** - Convert to formal business tone
- 😊 **Casual** - Make content friendly and approachable
- 🎨 **Creative** - Add creative flair and engagement
- 📋 **Bullet Points** - Convert to organized lists
- 📖 **Story Format** - Transform into narrative structure

## Tech Stack

- **Frontend**: React 18, TailwindCSS
- **Icons**: Lucide React
- **File Upload**: React Dropzone
- **Notifications**: React Hot Toast
- **AI Integration**: OpenAI API
- **Audio Processing**: OpenAI Whisper
- **Styling**: Custom TailwindCSS components

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd remixer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

4. Add your OpenAI API key to `.env`:
```
REACT_APP_OPENAI_API_KEY=your-actual-openai-api-key
```

5. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## API Integration

### OpenAI Setup
1. Get your API key from [OpenAI Platform](https://platform.openai.com/)
2. Add it to your `.env` file
3. The app will automatically use it for content remixing

### Optional Integrations
- **Anthropic Claude** - Add alternative AI processing
- **Twitter API** - Enable direct tweet posting
- **Database API** - Save remixes to persistent storage

## Usage

1. **Input Content**: Paste text or upload an audio file
2. **Choose Remix Type**: Select from 8 different transformation options
3. **Process**: Click to send to AI for processing
4. **Output**: View and interact with remixed content
5. **Share**: Tweet, save, copy, or download the result

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- Netlify
- AWS Amplify
- Firebase Hosting

## Future Enhancements

- [ ] Multiple AI provider support
- [ ] Advanced audio processing
- [ ] Scheduled tweet functionality
- [ ] User authentication
- [ ] Collaborative remixing
- [ ] Template library
- [ ] Export to multiple formats (PDF, DOCX, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
