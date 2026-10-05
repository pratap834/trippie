# Trip Planner & Blog Creator

## Overview
Trip Planner & Blog Creator is a web application that helps users generate AI-powered travel itineraries and create travel blogs based on their images. The system integrates API calls to AI services (Gemini) for itinerary generation and blog creation. Users can view their plans on an interactive map and download them as a PDF.

## Features
- **AI-Powered Trip Itinerary**: Generates a complete travel plan based on user input.
- **Blog Creator**: Creates a storytelling travel blog based on images provided by user using BLIP model.
- **Interactive Map**: Displays travel locations dynamically.
- **PDF Export**: Allows users to download their travel itinerary or blog.

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5
- **Backend**: 
  - Node.js with Express.js (Trip Planner API)
  - Python with FastAPI (Blog Generator API)
- **AI Integration**: 
  - Google Gemini AI (gemini-2.0-flash-lite model)
  - BLIP Image Captioning Model
- **Mapping**: Google Maps API
- **PDF/Document Generation**: jsPDF, docx.js
- **Other**: NLTK (Natural Language Processing)

## Installation & Setup
<<<<<<< HEAD

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8 or higher
- npm or yarn

### 1. Clone the repository:
```sh
git clone https://github.com/pratap834/trippie.git
cd trippie
```

### 2. Install Node.js dependencies:
```sh
npm install
```

### 3. Install Python dependencies:
```sh
pip install -r requirements.txt
```

### 4. Set up API Keys:
- Obtain API keys for Google Gemini AI and Google Maps API
- Create a `.env` file in the root directory:
  ```sh
  GEMINI_API_KEY=your_gemini_api_key
  MAP_API=your_google_maps_api_key
  PORT=3000
  ```
- You can use `.env.example` as a template:
  ```sh
  copy .env.example .env
  ```
  Then edit `.env` with your actual API keys.

### 5. Run the applications:

**Terminal 1 - Node.js Server (Trip Planner):**
```sh
npm run dev
# or for production
npm start
```
The server will run at `http://localhost:3000`

**Terminal 2 - Python FastAPI Server (Blog Generator):**
```sh
python public/app.py
```
The server will run at `http://localhost:8000`

### 6. Access the Web App:
Open your browser and navigate to:
- Main page: `http://localhost:3000/main.html`
- Trip Planner: `http://localhost:3000/index.html`
- Blog Generator: `http://localhost:3000/blog.html`
=======
1. **Clone the repository:**
   ```sh
   git clone https://github.com/vasantha-kumar-s/trip-planner-ai.git 
   cd trip-planner-ai
   ```
2. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
3. **Set up API Keys:**
   - Obtain API keys for Gemini and Google Map API
   - Set them in a `.env` file:
     ```sh
     GEMINI_API_KEY=your_gemini_api_key
     MAP_API=your_map_api_key
     ```
4. **Run the application:**
   ```sh
   python app.py  # or appropriate command for your framework
   ```
5. **Access the Web App:**
   Open `http://localhost:5000` in your browser.
>>>>>>> a645a66456e3f6ad9fb996f4fe1d505b21109043

## Usage
1. **Enter trip details**: Provide location, dates, budget and language.
2. **Generate itinerary**: The AI generates a complete travel plan.
3. **View map**: The locations are plotted on an interactive map.
4. **Download PDF**: Save your itinerary or blog for offline use.

## Future Enhancements
- **User Authentication**: Allow users to save their itineraries.
- **Customization Options**: More control over itinerary and blog styling.

## Contributions
Contributions are welcome! Feel free to submit pull requests or report issues.

## Contact
For any queries, reach out to pratapsubramani@gmail.com.
