import { Navbar } from '@/components/shared/navbar'
import { TripForm } from '@/components/planner/trip-form'

export default function PlannerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Plan Your Dream Trip</h1>
            <p className="text-xl text-muted-foreground">
              Tell us about your travel plans and we'll create a personalized itinerary
            </p>
          </div>
          <TripForm />
        </div>
      </div>
    </div>
  )
}
