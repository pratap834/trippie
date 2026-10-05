export interface TripFormData {
  destination: string
  language: string
  duration: number
  transport: 'private' | 'public'
  hotelBudget: number
  foodBudget: number
  people: number
}

export interface DaySchedule {
  description: string
  activities: string[]
  restaurants: string[]
}

export interface HotelOptions {
  cheap: string[]
  affordable: string[]
  expensive: string[]
}

export interface BudgetAnalysis {
  hotelOptions: string
  foodOptions: string
  recommendedOptions: string
}

export interface TripPlan {
  schedule: DaySchedule[]
  hotels: HotelOptions
  localFood: string[]
  budgetAnalysis: BudgetAnalysis
}

export interface TripState {
  tripData: TripFormData | null
  tripPlan: TripPlan | null
  setTripData: (data: TripFormData) => void
  setTripPlan: (plan: TripPlan) => void
  clearTrip: () => void
}
