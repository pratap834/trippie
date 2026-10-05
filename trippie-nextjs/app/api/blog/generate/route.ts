import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Forward request to Python FastAPI service
    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000'
    const response = await fetch(`${pythonApiUrl}/generate-blog`, {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error(`Python API returned ${response.status}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error generating blog:', error)
    return NextResponse.json(
      { error: 'Failed to generate blog', details: error.message },
      { status: 500 }
    )
  }
}
