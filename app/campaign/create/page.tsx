'use client'

import { useState, useCallback } from 'react'
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react'
import { useCampaignStore } from '@/lib/stores/campaign-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import CampaignInfoStep from '@/components/campaign/steps/step-1-info'
import AudienceSelectionStep from '@/components/campaign/steps/step-2-audience'
import ChannelSelectionStep from '@/components/campaign/steps/step-3-channels'
import ContentBuilderStep from '@/components/campaign/steps/step-4-content'
import SchedulingStep from '@/components/campaign/steps/step-5-scheduling'
import DeliverySettingsStep from '@/components/campaign/steps/step-6-delivery'
import ReviewLaunchStep from '@/components/campaign/steps/step-7-review'

const STEPS = [
  { number: 1, title: 'Campaign Information', description: 'Basic campaign details' },
  { number: 2, title: 'Audience Selection', description: 'Choose your target audience' },
  { number: 3, title: 'Channel Selection', description: 'Select communication channels' },
  { number: 4, title: 'Content Builder', description: 'Create your message content' },
  { number: 5, title: 'Scheduling', description: 'Set delivery schedule' },
  { number: 6, title: 'Delivery Settings', description: 'Configure tracking & delivery' },
  { number: 7, title: 'Review & Launch', description: 'Review and launch campaign' },
]

const STEP_COMPONENTS = [
  null, // Index 0 (steps are 1-indexed)
  CampaignInfoStep,
  AudienceSelectionStep,
  ChannelSelectionStep,
  ContentBuilderStep,
  SchedulingStep,
  DeliverySettingsStep,
  ReviewLaunchStep,
]

export default function CampaignCreatePage() {
  const { currentStep, setStep, completedSteps, errors, formData } = useCampaignStore()
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)

  const StepComponent = STEP_COMPONENTS[currentStep] as any

  const handleNext = useCallback(() => {
    if (currentStep < STEPS.length) {
      setStep(currentStep + 1)
    }
  }, [currentStep, setStep])

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setStep(currentStep - 1)
    }
  }, [currentStep, setStep])

  const handleStepClick = (step: number) => {
    if (step < currentStep || completedSteps.has(step - 1)) {
      setStep(step)
    }
  }

  const currentStepData = STEPS[currentStep - 1]
  const currentStepErrors = errors[currentStep] || []
  const progressPercent = (currentStep / STEPS.length) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Campaign</h1>
        <p className="text-muted-foreground">Follow these steps to create and launch your marketing campaign</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Step {currentStep} of {STEPS.length}</span>
          <span className="text-sm text-muted-foreground">{Math.round(progressPercent)}% Complete</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Step Navigation Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {STEPS.map((step) => {
                const isCompleted = completedSteps.has(step.number)
                const isActive = currentStep === step.number
                const isAccessible = step.number < currentStep || isCompleted

                return (
                  <button
                    key={step.number}
                    onClick={() => handleStepClick(step.number)}
                    disabled={!isAccessible && !isActive}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium'
                        : isCompleted
                        ? 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800'
                        : !isAccessible
                        ? 'text-muted-foreground opacity-50 cursor-not-allowed'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : isActive
                          ? 'bg-white text-primary'
                          : 'border border-current'
                      }`}>
                        {isCompleted ? '✓' : step.number}
                      </div>
                      <div>
                        <p className="font-medium">{step.title}</p>
                        <p className="text-xs opacity-75">{step.description}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{currentStepData.title}</CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStepErrors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-1">
                      {currentStepErrors.map((error, i) => (
                        <p key={i}>{error}</p>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {StepComponent && <StepComponent onNext={handleNext} />}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              {currentStep < STEPS.length && (
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              {currentStep === STEPS.length && (
                <Button className="gap-2">
                  Launch Campaign
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
