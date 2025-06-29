import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>

        {/* Progress Section Skeleton */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Progress value={20} className="h-3 mb-8" />
          
          {/* Step Indicators Skeleton */}
          <div className="flex justify-between">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="w-12 h-12 rounded-full mb-3" />
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <Card className="border-2 border-blue-100 mb-12">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {/* Form Fields Skeleton */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-5 w-32" />
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full" />
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-12 w-full" />
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-12 w-full" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-12 w-full" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-5 w-28" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-24 w-full rounded-lg" />
                  <Skeleton className="h-24 w-full rounded-lg" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons Skeleton */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-12 w-24" />
        </div>
      </div>
    </div>
  )
}
