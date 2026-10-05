# TravelMate Setup Guide

## Quick Start

### Step 1: Install Missing Python Packages
```bash
pip install transformers nltk
```

### Step 2: Create Environment File
```bash
# Copy the example file
copy .env.example .env
```

Then edit `.env` and add your API keys:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
MAP_API=your_actual_google_maps_api_key_here
PORT=3000
```

### Step 3: Get Your API Keys

#### Google Gemini API Key
1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Create a new API key
4. Copy and paste it into your `.env` file

#### Google Maps API Key
1. Visit https://console.cloud.google.com/google/maps-apis
2. Create a new project (if you don't have one)
3. Enable "Maps JavaScript API"
4. Go to Credentials and create an API key
5. Copy and paste it into your `.env` file

### Step 4: Start the Servers

**Terminal 1 - Node.js Server (Main Backend):**
```bash
npm run dev
```
This starts the trip planner backend on http://localhost:3000

**Terminal 2 - Python Server (Blog Generator):**
```bash
python public/app.py
```
This starts the blog generator backend on http://localhost:8000

### Step 5: Access the Application
Open your browser and go to:
- http://localhost:3000/main.html (Landing page)
- http://localhost:3000/index.html (Trip Planner)
- http://localhost:3000/blog.html (Blog Generator)

## Security Improvements Made

✅ **Removed Hardcoded API Keys**
- Implemented secure backend endpoint `/api/maps-key`
- Google Maps API key is now served dynamically from the server
- API keys are no longer exposed in HTML files

✅ **Created .gitignore**
- Prevents committing sensitive files (`.env`, `node_modules`, etc.)
- Protects your API keys from being pushed to GitHub

✅ **Environment Variables**
- All sensitive keys are stored in `.env` file
- `.env.example` template provided for reference

## Project Architecture

```
trippie/
├── server.js              # Node.js Express server (Port 3000)
├── public/
│   ├── app.py            # Python FastAPI server (Port 8000)
│   ├── main.html         # Landing page
│   ├── index.html        # Trip planner interface
│   ├── blog.html         # Blog generator interface
│   ├── results.html      # Trip results display
│   └── ...
├── .env                  # Your API keys (DO NOT COMMIT)
├── .env.example          # Template for .env
├── .gitignore            # Git ignore rules
├── package.json          # Node.js dependencies
└── requirements.txt      # Python dependencies
```

## Important Notes

⚠️ **SECURITY WARNING**: 
Your old Google Maps API key (AIzaSyAKi4uthP2PXNkv3U1TroiO3_RuhnGC9RA) was exposed in the code. You should:
1. Go to Google Cloud Console
2. Delete or regenerate this API key
3. Use the new key in your `.env` file

## Troubleshooting

### Port Already in Use (EADDRINUSE)
If you get this error, find and kill the process:
```bash
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

### Google Maps Not Loading
1. Check that your `.env` file has the correct MAP_API key
2. Verify the API key has "Maps JavaScript API" enabled
3. Check browser console for error messages

### Blog Generator Not Working
1. Ensure Python server is running on port 8000
2. Verify all Python packages are installed:
   ```bash
   pip list | findstr "fastapi uvicorn transformers torch nltk"
   ```
3. Install missing packages if needed

### Gemini API Errors
1. Verify your GEMINI_API_KEY is valid
2. Check you have API quota remaining
3. Ensure internet connection is stable

## Features Overview

### Trip Planner (Node.js)
- AI-powered itinerary generation
- Multi-day trip planning
- Budget analysis (hotel & food)
- Multiple transport options
- Multi-language support
- Interactive map integration
- PDF/DOCX export

### Blog Generator (Python)
- Multi-image upload (up to 5 images)
- AI-powered narrative generation
- Image captioning with BLIP model
- Customizable tone and length
- SEO keyword generation
- Social media hashtags
- Meta descriptions
- Alt text for accessibility

## Support

For issues or questions:
- Email: pratapsubramani@gmail.com
- GitHub: https://github.com/pratap834/trippie

## Next Steps

1. ✅ Create `.env` file with your API keys
2. ✅ Install missing Python packages
3. ✅ Start both servers
4. ✅ Test the trip planner
5. ✅ Test the blog generator
6. Consider regenerating your exposed API key for security
