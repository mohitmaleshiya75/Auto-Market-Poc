'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export interface CampaignStep {
  id: string
  title: string
  description: string
  component: React.ReactNode
}

interface CampaignStepFormProps {
  steps: CampaignStep[]
  onComplete: (data: Record<string, unknown>) => void
  initialData?: Record<string, unknown>
}

export function CampaignStepForm({
  steps,
  onComplete,
  initialData = {},
}: CampaignStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData)

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(formData)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (data: Record<string, unknown>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Step Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-muted-foreground mt-1">{step.description}</p>
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicator Dots */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((s, index) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(index)}
            className={cn(
              'min-w-fit px-4 py-2 rounded-full text-sm font-medium transition-colors',
              index === currentStep
                ? 'bg-primary text-primary-foreground'
                : index < currentStep
                  ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-200'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {step.component}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          {currentStep + 1} / {steps.length}
        </div>

        <Button
          onClick={handleNext}
          className="gap-2"
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
