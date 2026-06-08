export type CampaignCoverageChannel = 'email' | 'whatsapp' | 'sms'
export type CampaignRecipientStatus =
  | 'Sent'
  | 'Not Sent'
  | 'Failed'
  | 'Opened'
  | 'Converted'
  | 'Unsubscribed'

export interface CampaignCoverageKpis {
  totalDatabaseLeads: number
  campaignAudience: number
  successfullyContacted: number
  failedDeliveries: number
  remainingUncontacted: number
  leadsNotSuccessfullyContacted: number
  audienceNotSelected: number
  coveragePercentage: number
}

export interface MultiChannelCoverage {
  channel: CampaignCoverageChannel
  label: string
  targetAudience: number
  sent: number
  delivered: number
  opened?: number
  clicked?: number
  read?: number
  replies?: number
  failed?: number
  coverage: number
}

export interface RecipientBreakdown {
  label: string
  count: number
  color: string
}

export interface CampaignRecipientRow {
  leadId: string
  leadName: string
  email: string
  phone: string
  source: string
  status: CampaignRecipientStatus
  lastCampaign: string
  lastContactDate: string
}

export interface CampaignDetail {
  id: string
  name: string
  type: string
  createdBy: string
  createdDate: string
  audienceSize: number
  coverage: number
  performance: {
    deliveredRate: number
    openRate: number
    clickRate: number
    conversionRate: number
  }
}

export const campaignCoverageKpis: CampaignCoverageKpis = {
  totalDatabaseLeads: 10000,
  campaignAudience: 3000,
  successfullyContacted: 2800,
  failedDeliveries: 200,
  remainingUncontacted: 7000,
  leadsNotSuccessfullyContacted: 7200,
  audienceNotSelected: 7000,
  coveragePercentage: 28,
}

export const propertyLaunchCampaign: CampaignDetail = {
  id: 'CAM-PL-2026-001',
  name: 'Property Launch Campaign',
  type: 'Multi-channel Launch',
  createdBy: 'Priya Shah',
  createdDate: '2026-06-01',
  audienceSize: campaignCoverageKpis.campaignAudience,
  coverage: campaignCoverageKpis.coveragePercentage,
  performance: {
    deliveredRate: 96.4,
    openRate: 66.7,
    clickRate: 23.2,
    conversionRate: 8.9,
  },
}

export const campaignCoverageCards: CampaignDetail[] = [
  propertyLaunchCampaign,
  {
    id: 'CAM-WB-2026-014',
    name: 'Broker Win-back Campaign',
    type: 'Email + WhatsApp',
    createdBy: 'Arjun Menon',
    createdDate: '2026-05-24',
    audienceSize: 1800,
    coverage: 18,
    performance: {
      deliveredRate: 94.8,
      openRate: 52.3,
      clickRate: 17.4,
      conversionRate: 5.8,
    },
  },
  {
    id: 'CAM-VIP-2026-008',
    name: 'VIP Site Visit Reminder',
    type: 'SMS + WhatsApp',
    createdBy: 'Neha Kapoor',
    createdDate: '2026-05-18',
    audienceSize: 1200,
    coverage: 12,
    performance: {
      deliveredRate: 97.1,
      openRate: 74.2,
      clickRate: 19.1,
      conversionRate: 10.3,
    },
  },
]

export const multiChannelCoverage: MultiChannelCoverage[] = [
  {
    channel: 'email',
    label: 'Email',
    targetAudience: 3000,
    sent: 2800,
    delivered: 2700,
    opened: 1800,
    clicked: 650,
    failed: 200,
    coverage: 28,
  },
  {
    channel: 'whatsapp',
    label: 'WhatsApp',
    targetAudience: 3000,
    sent: 2500,
    delivered: 2450,
    read: 1700,
    replies: 250,
    failed: 50,
    coverage: 25,
  },
  {
    channel: 'sms',
    label: 'SMS',
    targetAudience: 3000,
    sent: 2000,
    delivered: 1950,
    failed: 50,
    coverage: 20,
  },
]

export const recipientStatusBreakdown: RecipientBreakdown[] = [
  { label: 'Never Contacted', count: 5800, color: '#64748B' },
  { label: 'Contacted Once', count: 2900, color: '#2563EB' },
  { label: 'Contacted Multiple Times', count: 800, color: '#0891B2' },
  { label: 'Converted', count: 250, color: '#16A34A' },
  { label: 'Failed', count: 200, color: '#DC2626' },
  { label: 'Unsubscribed', count: 50, color: '#F59E0B' },
]

export const smartAudienceInsights = {
  totalLeads: 10000,
  alreadyContacted: 4200,
  neverContacted: 5800,
  selectedAlreadyContacted: 1500,
  recommendation: 'Target Never Contacted Leads First',
  warning: '1,500 selected leads already received previous campaigns.',
}

const leadSources = ['Website', 'Property Expo', 'Referral', 'Paid Ads', 'WhatsApp Import', 'Broker Network']
const firstNames = ['Aarav', 'Maya', 'Nisha', 'Rohan', 'Isha', 'Kabir', 'Anaya', 'Dev', 'Tara', 'Neil']
const lastNames = ['Sharma', 'Patel', 'Mehta', 'Rao', 'Kapoor', 'Iyer', 'Khan', 'Bose', 'Nair', 'Gupta']

function createRecipientRows(status: CampaignRecipientStatus, start: number, count: number): CampaignRecipientRow[] {
  return Array.from({ length: count }, (_, index) => {
    const leadNumber = start + index
    const firstName = firstNames[leadNumber % firstNames.length]
    const lastName = lastNames[Math.floor(leadNumber / firstNames.length) % lastNames.length]
    const source = leadSources[leadNumber % leadSources.length]
    const contacted = status !== 'Not Sent'

    return {
      leadId: `LEAD-${leadNumber.toString().padStart(5, '0')}`,
      leadName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${leadNumber}@automarket.example`,
      phone: `+91 ${String(70000 + leadNumber).slice(0, 5)} ${String(10000 + leadNumber).slice(-5)}`,
      source,
      status,
      lastCampaign: contacted ? propertyLaunchCampaign.name : 'None',
      lastContactDate: contacted ? '2026-06-07' : 'Not contacted',
    }
  })
}

export const recipientLists = {
  sent: createRecipientRows('Sent', 1001, 8),
  notSent: createRecipientRows('Not Sent', 4201, 8),
  failed: createRecipientRows('Failed', 2801, 8),
  opened: createRecipientRows('Opened', 1501, 8),
  converted: createRecipientRows('Converted', 2401, 8),
}

export const databaseRequirements = [
  'campaigns',
  'campaign_recipients',
  'recipient_status',
  'campaign_delivery_logs',
  'lead_contact_history',
]

export const campaignDeliveryFields = [
  'Lead ID',
  'Campaign ID',
  'Channel',
  'Status',
  'Sent At',
  'Delivered At',
  'Opened At',
  'Clicked At',
  'Converted At',
]
