import { create } from 'zustand'
import { Campaign, CampaignStatus, CampaignType } from '@/lib/types'

interface CampaignFormData {
  // Step 1: Campaign Information
  name: string
  description: string
  objective: string
  type: CampaignType
  priority: 'low' | 'medium' | 'high' | 'critical'
  owner: string
  budget: number
  expectedRevenue: number

  // Step 2: Audience Selection
  selectedSegments: string[]
  selectedCustomers: string[]
  audienceCount: number

  // Step 3: Channel Selection
  channels: CampaignType[]

  // Step 4: Content Builder
  emailSubject?: string
  emailPreview?: string
  emailSenderName?: string
  emailReplyTo?: string
  emailTemplate?: string
  emailContent?: string

  smsTitle?: string
  smsMessage?: string
  smsCounter?: number

  whatsappTitle?: string
  whatsappMessage?: string
  whatsappMedia?: string
  whatsappCTA?: string

  // Step 5: Scheduling
  startDate: string
  endDate: string
  sendDate: string
  sendTime: string
  timezone: string
  frequency: 'once' | 'daily' | 'weekly' | 'monthly'

  // Step 6: Delivery Settings
  deliverySpeed: 'normal' | 'fast' | 'priority' | 'enterprise'
  openTracking: boolean
  clickTracking: boolean
  conversionTracking: boolean
  revenueTracking: boolean
  utmTracking: boolean
  googleAnalytics: boolean

  // Step 7: Review & Launch
  estimatedReach: number
  estimatedOpens: number
  estimatedClicks: number
  estimatedConversions: number
  estimatedRevenue: number
}

interface CampaignState {
  // Form data
  currentStep: number
  formData: CampaignFormData
  completedSteps: Set<number>
  errors: Record<number, string[]>

  // Campaigns list
  campaigns: Campaign[]

  // Actions
  setStep: (step: number) => void
  updateFormData: (data: Partial<CampaignFormData>) => void
  markStepComplete: (step: number) => void
  markStepIncomplete: (step: number) => void
  setErrors: (step: number, errors: string[]) => void
  clearErrors: (step: number) => void

  // Campaign operations
  createCampaign: (campaign: Campaign) => void
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
  cloneCampaign: (id: string) => void
  pauseCampaign: (id: string) => void
  resumeCampaign: (id: string) => void
  archiveCampaign: (id: string) => void

  // Form reset
  resetForm: () => void
  getCampaignById: (id: string) => Campaign | undefined
}

const defaultFormData: CampaignFormData = {
  name: '',
  description: '',
  objective: '',
  type: 'email',
  priority: 'medium',
  owner: '',
  budget: 0,
  expectedRevenue: 0,
  selectedSegments: [],
  selectedCustomers: [],
  audienceCount: 0,
  channels: ['email'],
  emailSubject: '',
  emailPreview: '',
  emailSenderName: '',
  emailReplyTo: '',
  emailTemplate: '',
  emailContent: '',
  smsTitle: '',
  smsMessage: '',
  smsCounter: 0,
  whatsappTitle: '',
  whatsappMessage: '',
  whatsappMedia: '',
  whatsappCTA: '',
  startDate: '',
  endDate: '',
  sendDate: '',
  sendTime: '',
  timezone: 'UTC',
  frequency: 'once',
  deliverySpeed: 'normal',
  openTracking: true,
  clickTracking: true,
  conversionTracking: true,
  revenueTracking: true,
  utmTracking: true,
  googleAnalytics: false,
  estimatedReach: 0,
  estimatedOpens: 0,
  estimatedClicks: 0,
  estimatedConversions: 0,
  estimatedRevenue: 0,
}

export const useCampaignStore = create<CampaignState>((set, get) => ({
  currentStep: 1,
  formData: defaultFormData,
  completedSteps: new Set(),
  errors: {},
  campaigns: [],

  setStep: (step) => set({ currentStep: step }),

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  markStepComplete: (step) =>
    set((state) => {
      const newCompletedSteps = new Set(state.completedSteps)
      newCompletedSteps.add(step)
      return { completedSteps: newCompletedSteps }
    }),

  markStepIncomplete: (step) =>
    set((state) => {
      const newCompletedSteps = new Set(state.completedSteps)
      newCompletedSteps.delete(step)
      return { completedSteps: newCompletedSteps }
    }),

  setErrors: (step, errors) =>
    set((state) => ({
      errors: { ...state.errors, [step]: errors },
    })),

  clearErrors: (step) =>
    set((state) => {
      const newErrors = { ...state.errors }
      delete newErrors[step]
      return { errors: newErrors }
    }),

  createCampaign: (campaign) =>
    set((state) => ({
      campaigns: [...state.campaigns, campaign],
    })),

  updateCampaign: (id, updates) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, ...updates } : campaign
      ),
    })),

  deleteCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.filter((campaign) => campaign.id !== id),
    })),

  cloneCampaign: (id) =>
    set((state) => {
      const original = state.campaigns.find((c) => c.id === id)
      if (!original) return state

      const cloned: Campaign = {
        ...original,
        id: `${original.id}-clone-${Date.now()}`,
        name: `${original.name} (Copy)`,
        status: 'draft',
        createdAt: new Date().toISOString(),
      }

      return { campaigns: [...state.campaigns, cloned] }
    }),

  pauseCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status: 'paused' as CampaignStatus } : campaign
      ),
    })),

  resumeCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status: 'running' as CampaignStatus } : campaign
      ),
    })),

  archiveCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status: 'archived' as CampaignStatus } : campaign
      ),
    })),

  resetForm: () =>
    set({
      currentStep: 1,
      formData: defaultFormData,
      completedSteps: new Set(),
      errors: {},
    }),

  getCampaignById: (id) => get().campaigns.find((c) => c.id === id),
}))
