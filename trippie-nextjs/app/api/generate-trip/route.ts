import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

function extractJsonFromText(text: string): string {
  // Try to match JSON inside markdown code blocks
  const markdownJsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/)
  if (markdownJsonMatch && markdownJsonMatch[1]) {
    return markdownJsonMatch[1]
  }
  
  // Try to match standalone JSON object
  const jsonMatch = text.match(/(\{[\s\S]*\})/)
  if (jsonMatch && jsonMatch[1]) {
    return jsonMatch[1]
  }
  
  return text
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { destination, language, duration, transport, hotelBudget, foodBudget, people } = body
    
    const prompt = `Create a detailed trip plan for ${destination} for ${duration} days. 
    The plan should use ${transport} as the primary mode of transportation for ${people}.
    The daily hotel budget is ${hotelBudget} per night and the food budget is ${foodBudget} per meal.
    Please provide the response in ${language} language.
    
    IMPORTANT: I need the response ONLY as a raw JSON object with no markdown formatting, code blocks, or explanations.
    
    The JSON structure should be as follows:
    {
      "schedule": [
        {
          "description": "Brief overview of the day",
          "activities": ["Activity 1", "Activity 2", "Activity 3"],
          "restaurants": ["Restaurant 1 (approximate price range)", "Restaurant 2 (approximate price range)"]
        }
      ],
      "hotels": {
        "cheap": ["Budget Hotel 1 (price per night)", "Budget Hotel 2 (price per night)", "Budget Hotel 3 (price per night)"],
        "affordable": ["Mid-range Hotel 1 (price per night)", "Mid-range Hotel 2 (price per night)", "Mid-range Hotel 3 (price per night)"],
        "expensive": ["Luxury Hotel 1 (price per night)", "Luxury Hotel 2 (price per night)", "Luxury Hotel 3 (price per night)"]
      },
      "localFood": ["Local dish 1 (approximate price)", "Local dish 2 (approximate price)", "Local dish 3 (approximate price)", "Local dish 4 (approximate price)", "Local dish 5 (approximate price)"],
      "budgetAnalysis": {
        "hotelOptions": "Brief analysis of hotel options that match the ${hotelBudget} per night budget",
        "foodOptions": "Brief analysis of food options that match the ${foodBudget} per meal budget",
        "recommendedOptions": "Specific recommendations within budget"
      }
    }
    
    The schedule array should have exactly ${duration} days.
    For each day, provide 3-5 activities and 2-3 restaurant recommendations with approximate price ranges.
    For hotels, provide exactly 3 options for each price category with approximate prices per night.
    Analyze if the ${hotelBudget} per night budget is low, medium, or high for this destination and recommend appropriate options.
    Analyze if the ${foodBudget} per meal budget is low, medium, or high for this destination and recommend appropriate options.
    For local food, provide 5 must-try local dishes or specialties with approximate prices.
    
    Return ONLY the raw JSON with no extra text or formatting.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    console.log("Raw response from Gemini:", text)
    
    try {
      const cleanedJsonText = extractJsonFromText(text)
      console.log("Cleaned JSON text:", cleanedJsonText)
      
      const jsonResponse = JSON.parse(cleanedJsonText)
      return NextResponse.json(jsonResponse)
    } catch (jsonError: any) {
      console.error('Error parsing JSON response:', jsonError)
      return NextResponse.json({ 
        error: 'Failed to parse JSON from Gemini response', 
        details: jsonError.message,
        rawResponse: text
      }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Error generating trip plan:', error)
    return NextResponse.json({ 
      error: 'Failed to generate trip plan', 
      details: error.message 
    }, { status: 500 })
  }
}
