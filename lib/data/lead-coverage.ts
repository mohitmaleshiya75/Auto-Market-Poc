export type CoverageChannel = 'email' | 'whatsapp' | 'sms'
export type RecipientStatus = 'delivered' | 'opened' | 'clicked' | 'read' | 'replied' | 'failed'
export type LeadCoverageStatus =
  | 'Never Contacted'
  | 'Contacted'
  | 'Opened'
  | 'Clicked'
  | 'Converted'
  | 'Failed'

export interface CoverageLead {
  lead_id: string
  name: string
  email: string
  phone: string
  source: string
}

export interface CampaignRecipient {
  lead_id: string
  campaign_id: string
  channel: CoverageChannel
  status: RecipientStatus
  sent_at: string
}

export interface LeadContactHistory {
  lead_id: string
  channel: CoverageChannel
  campaign_id: string
  status: RecipientStatus | 'converted'
  timestamp: string
}

export interface LeadCoverageRow extends CoverageLead {
  lastCampaign: string
  emailStatus: LeadCoverageStatus
  whatsappStatus: LeadCoverageStatus
  smsStatus: LeadCoverageStatus
  contactCount: number
  lastContactDate: string
  overallStatus: LeadCoverageStatus
}

export interface ChannelCoverage {
  channel: CoverageChannel
  label: string
  totalEligible: number
  sent: number
  delivered: number
  opened?: number
  clicked?: number
  read?: number
  replies?: number
  failed?: number
}

export interface CampaignCoverage {
  campaignId: string
  campaignName: string
  channel: CoverageChannel
  audienceSelected: number
  successfullyContacted: number
  failed: number
  skipped: number
  remainingAudience: number
  coveragePercentage: number
}

export interface StatusDistributionItem {
  name: string
  value: number
  color: string
}

const leadSources = [
  'Website Import',
  'Trade Show',
  'LinkedIn Ads',
  'Partner Referral',
  'Webinar',
  'Pricing Page',
  'Manual Upload',
  'Marketplace',
]

const firstNames = [
  'Aarav',
  'Maya',
  'Noah',
  'Sophia',
  'Liam',
  'Isha',
  'Ethan',
  'Nora',
  'Kabir',
  'Olivia',
]

const lastNames = [
  'Sharma',
  'Patel',
  'Johnson',
  'Chen',
  'Garcia',
  'Mehta',
  'Wilson',
  'Rao',
  'Brown',
  'Kapoor',
]

export const coverageChannels: ChannelCoverage[] = [
  {
    channel: 'email',
    label: 'Email',
    totalEligible: 1000,
    sent: 200,
    delivered: 190,
    opened: 120,
    clicked: 40,
    failed: 10,
  },
  {
    channel: 'whatsapp',
    label: 'WhatsApp',
    totalEligible: 1000,
    sent: 150,
    delivered: 145,
    read: 90,
    replies: 20,
    failed: 5,
  },
  {
    channel: 'sms',
    label: 'SMS',
    totalEligible: 1000,
    sent: 100,
    delivered: 95,
    failed: 5,
  },
]

export const campaignCoverage: CampaignCoverage[] = [
  {
    campaignId: 'CAM-EMAIL-001',
    campaignName: 'Enterprise Email Nurture',
    channel: 'email',
    audienceSelected: 1000,
    successfullyContacted: 190,
    failed: 10,
    skipped: 0,
    remainingAudience: 800,
    coveragePercentage: 19,
  },
  {
    campaignId: 'CAM-WA-002',
    campaignName: 'WhatsApp Demo Push',
    channel: 'whatsapp',
    audienceSelected: 1000,
    successfullyContacted: 145,
    failed: 5,
    skipped: 0,
    remainingAudience: 850,
    coveragePercentage: 14.5,
  },
  {
    campaignId: 'CAM-SMS-003',
    campaignName: 'SMS Trial Reminder',
    channel: 'sms',
    audienceSelected: 1000,
    successfullyContacted: 95,
    failed: 5,
    skipped: 0,
    remainingAudience: 900,
    coveragePercentage: 9.5,
  },
]

export const leadStatusDistribution: StatusDistributionItem[] = [
  { name: 'Never Contacted', value: 550, color: '#64748B' },
  { name: 'Contacted Once', value: 320, color: '#2563EB' },
  { name: 'Contacted Multiple Times', value: 55, color: '#0891B2' },
  { name: 'Converted', value: 45, color: '#16A34A' },
  { name: 'Unsubscribed', value: 10, color: '#F59E0B' },
  { name: 'Failed Delivery', value: 20, color: '#DC2626' },
]

export const audienceSelectionInsight = {
  totalLeadsAvailable: 1000,
  alreadyContacted: 450,
  neverContacted: 550,
  selectedAudience: 620,
  selectedAlreadyContacted: 180,
  selectedNeverContacted: 440,
  suggestion: 'Target Uncontacted Leads First',
  warning: 'Some selected leads already received previous campaigns.',
}

function generateCoverageLeads(count: number): CoverageLead[] {
  return Array.from({ length: count }, (_, index) => {
    const leadNumber = index + 1
    const firstName = firstNames[index % firstNames.length]
    const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length]
    const source = leadSources[index % leadSources.length]

    return {
      lead_id: `LEAD-${leadNumber.toString().padStart(4, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${leadNumber}@example.com`,
      phone: `+1 ${String(415 + (index % 70)).padStart(3, '0')}-${String(200 + (index % 800)).padStart(3, '0')}-${String(1000 + index).slice(-4)}`,
      source,
    }
  })
}

function recipientStatusForChannel(channel: CoverageChannel, indexInChannel: number): RecipientStatus {
  if (channel === 'email') {
    if (indexInChannel < 10) return 'failed'
    if (indexInChannel < 80) return 'delivered'
    if (indexInChannel < 160) return 'opened'
    return 'clicked'
  }

  if (channel === 'whatsapp') {
    if (indexInChannel < 5) return 'failed'
    if (indexInChannel < 60) return 'delivered'
    if (indexInChannel < 130) return 'read'
    return 'replied'
  }

  if (indexInChannel < 5) return 'failed'
  return 'delivered'
}

function generateCampaignRecipients(): CampaignRecipient[] {
  const campaignDefinitions = [
    { campaign_id: 'CAM-EMAIL-001', channel: 'email' as const, start: 0, count: 200, sent_at: '2026-05-28' },
    { campaign_id: 'CAM-WA-002', channel: 'whatsapp' as const, start: 200, count: 150, sent_at: '2026-06-01' },
    { campaign_id: 'CAM-SMS-003', channel: 'sms' as const, start: 350, count: 100, sent_at: '2026-06-04' },
  ]

  return campaignDefinitions.flatMap((campaign) =>
    Array.from({ length: campaign.count }, (_, index) => ({
      lead_id: `LEAD-${(campaign.start + index + 1).toString().padStart(4, '0')}`,
      campaign_id: campaign.campaign_id,
      channel: campaign.channel,
      status: recipientStatusForChannel(campaign.channel, index),
      sent_at: campaign.sent_at,
    })),
  )
}

const campaignNameById: Record<string, string> = {
  'CAM-EMAIL-001': 'Enterprise Email Nurture',
  'CAM-WA-002': 'WhatsApp Demo Push',
  'CAM-SMS-003': 'SMS Trial Reminder',
}

const statusPriority: Record<LeadCoverageStatus, number> = {
  Converted: 6,
  Clicked: 5,
  Opened: 4,
  Contacted: 3,
  Failed: 2,
  'Never Contacted': 1,
}

function toCoverageStatus(recipient: CampaignRecipient): LeadCoverageStatus {
  if (recipient.status === 'failed') return 'Failed'
  if (recipient.status === 'clicked' || recipient.status === 'replied') return 'Clicked'
  if (recipient.status === 'opened' || recipient.status === 'read') return 'Opened'
  return 'Contacted'
}

function generateLeadContactHistory(recipients: CampaignRecipient[]): LeadContactHistory[] {
  const campaignHistory = recipients.map((recipient) => ({
    lead_id: recipient.lead_id,
    channel: recipient.channel,
    campaign_id: recipient.campaign_id,
    status: recipient.status,
    timestamp: recipient.sent_at,
  }))

  const priorTouches: LeadContactHistory[] = Array.from({ length: 55 }, (_, index) => ({
    lead_id: `LEAD-${(index + 1).toString().padStart(4, '0')}`,
    channel: (index % 2 === 0 ? 'email' : 'sms') as CoverageChannel,
    campaign_id: 'CAM-HIST-000',
    status: 'delivered',
    timestamp: '2026-05-12',
  }))

  const conversions: LeadContactHistory[] = Array.from({ length: 45 }, (_, index) => ({
    lead_id: `LEAD-${(156 + index).toString().padStart(4, '0')}`,
    channel: 'email',
    campaign_id: 'CAM-EMAIL-001',
    status: 'converted',
    timestamp: '2026-06-06',
  }))

  return [...campaignHistory, ...priorTouches, ...conversions]
}

function buildLeadCoverageRows(
  leads: CoverageLead[],
  recipients: CampaignRecipient[],
  history: LeadContactHistory[],
): LeadCoverageRow[] {
  const recipientsByLead = new Map<string, CampaignRecipient[]>()
  const historyByLead = new Map<string, LeadContactHistory[]>()

  recipients.forEach((recipient) => {
    recipientsByLead.set(recipient.lead_id, [...(recipientsByLead.get(recipient.lead_id) || []), recipient])
  })

  history.forEach((entry) => {
    historyByLead.set(entry.lead_id, [...(historyByLead.get(entry.lead_id) || []), entry])
  })

  return leads.map((lead) => {
    const leadRecipients = recipientsByLead.get(lead.lead_id) || []
    const leadHistory = historyByLead.get(lead.lead_id) || []
    const conversion = leadHistory.some((entry) => entry.status === 'converted')

    const channelStatus = (channel: CoverageChannel) => {
      const recipient = leadRecipients.find((entry) => entry.channel === channel)
      return recipient ? toCoverageStatus(recipient) : 'Never Contacted'
    }

    const statuses = [channelStatus('email'), channelStatus('whatsapp'), channelStatus('sms')]
    const overallStatus = conversion
      ? 'Converted'
      : statuses.reduce((best, status) => (statusPriority[status] > statusPriority[best] ? status : best), 'Never Contacted' as LeadCoverageStatus)

    const lastHistory = [...leadHistory].sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0]
    const lastCampaign = lastHistory ? campaignNameById[lastHistory.campaign_id] || 'Historical Campaign' : 'None'

    return {
      ...lead,
      lastCampaign,
      emailStatus: channelStatus('email'),
      whatsappStatus: channelStatus('whatsapp'),
      smsStatus: channelStatus('sms'),
      contactCount: leadHistory.filter((entry) => entry.status !== 'converted').length,
      lastContactDate: lastHistory?.timestamp || 'Not contacted',
      overallStatus,
    }
  })
}

export const coverageLeads = generateCoverageLeads(1000)
export const campaignRecipients = generateCampaignRecipients()
export const leadContactHistory = generateLeadContactHistory(campaignRecipients)
export const leadCoverageRows = buildLeadCoverageRows(coverageLeads, campaignRecipients, leadContactHistory)

export const leadCoverageStats = {
  totalLeads: coverageLeads.length,
  contactedLeads: 450,
  remainingLeads: 550,
  coveragePercentage: 45,
  convertedLeads: 45,
  failedDeliveries: 20,
  emailRecipients: 200,
  whatsappRecipients: 150,
  smsRecipients: 100,
}
