'use client'

import { useState } from 'react'
import { CampaignStepForm, type CampaignStep } from './campaign-step-form'
import { CampaignBasicsStep } from './steps/campaign-basics-step'
import { CampaignAudienceStep } from './steps/campaign-audience-step'
import { CampaignContentStep } from './steps/campaign-content-step'
import { CampaignScheduleStep } from './steps/campaign-schedule-step'
import { CampaignReviewStep } from './steps/campaign-review-step'
import { useAppStore } from '@/lib/store'

interface CampaignWizardProps {
  onComplete?: (campaignData: Record<string, unknown>) => void
}

export function CampaignWizard({ onComplete }: CampaignWizardProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({})

  const handleStepUpdate = (data: Record<string, unknown>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleComplete = (finalData: Record<string, unknown>) => {
    console.log('[v0] Campaign wizard completed with data:', finalData)
    
    // Create campaign object
    const campaignData = {
      id: `camp-${Date.now()}`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      ...finalData,
    }
    
    // Call the onComplete callback if provided
    if (onComplete) {
      onComplete(campaignData)
    }
  }

  const steps: CampaignStep[] = [
    {
      id: 'basics',
      title: 'Campaign Basics',
      description: 'Start with campaign name, description, and type',
      component: (
        <CampaignBasicsStep
          data={formData}
          onUpdate={handleStepUpdate}
        />
      ),
    },
    {
      id: 'audience',
      title: 'Select Audience',
      description: 'Choose your target audience and apply filters',
      component: (
        <CampaignAudienceStep
          data={formData}
          onUpdate={handleStepUpdate}
        />
      ),
    },
    {
      id: 'content',
      title: 'Campaign Content',
      description: 'Create or select content for your campaign',
      component: (
        <CampaignContentStep
          data={formData}
          onUpdate={handleStepUpdate}
        />
      ),
    },
    {
      id: 'schedule',
      title: 'Schedule Delivery',
      description: 'Set when and how your campaign should be sent',
      component: (
        <CampaignScheduleStep
          data={formData}
          onUpdate={handleStepUpdate}
        />
      ),
    },
    {
      id: 'review',
      title: 'Review & Launch',
      description: 'Review all details before launching your campaign',
      component: (
        <CampaignReviewStep
          data={formData}
          onUpdate={handleStepUpdate}
        />
      ),
    },
  ]

  return (
    <CampaignStepForm
      steps={steps}
      initialData={formData}
      onComplete={handleComplete}
    />
  )
}
