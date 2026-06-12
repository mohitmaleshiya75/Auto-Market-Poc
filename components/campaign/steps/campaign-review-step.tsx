'use client'

import { CampaignType } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, AlertCircle } from 'lucide-react'

interface CampaignReviewStepProps {
  onUpdate?: (data: Record<string, unknown>) => void
  data?: {
    name?: string
    description?: string
    type?: CampaignType
    audienceId?: string
    audienceSize?: number
    subject?: string
    content?: string
    scheduleType?: string
    scheduledDate?: string
    scheduledTime?: string
  }
}

const campaignTypeLabels: Record<CampaignType, string> = {
  email: 'Email Campaign',
  sms: 'SMS Campaign',
  whatsapp: 'WhatsApp Campaign',
  push: 'Push Notifications',
  multichannel: 'Multi-channel Campaign',
}

const audienceLabels: Record<string, string> = {
  'seg-1': 'Active Customers (15,234 contacts)',
  'seg-2': 'VIP Users (3,456 contacts)',
  'seg-3': 'Churned Users (8,934 contacts)',
  'seg-4': 'Trial Users (2,123 contacts)',
}

export function CampaignReviewStep({ data = {} }: CampaignReviewStepProps) {
  const hasAllRequired =
    data.name &&
    data.type &&
    data.audienceId &&
    (data.subject || data.content)

  const scheduleDisplay = data.scheduleType === 'scheduled'
    ? `${data.scheduledDate} at ${data.scheduledTime}`
    : data.scheduleType === 'immediate'
      ? 'Immediately'
      : 'Recurring'

  return (
    <div className="space-y-6">
      {!hasAllRequired && (
        <div className="flex gap-3 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800 dark:text-amber-200">
            <p className="font-medium">Complete all required fields</p>
            <p>Go back to previous steps to fill in missing information</p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Campaign Name</p>
              <p className="font-medium mt-1">{data.name || 'Not specified'}</p>
            </div>
            {data.name && <CheckCircle2 className="h-5 w-5 text-green-600" />}
          </div>

          <Separator />

          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <div className="mt-1">
                <Badge variant="outline">
                  {data.type ? campaignTypeLabels[data.type] : 'Not specified'}
                </Badge>
              </div>
            </div>
            {data.type && <CheckCircle2 className="h-5 w-5 text-green-600" />}
          </div>

          <Separator />

          {data.description && (
            <>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-sm mt-1 line-clamp-2">{data.description}</p>
              </div>
              <Separator />
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Audience Segment</p>
              <p className="font-medium mt-1">
                {data.audienceId ? audienceLabels[data.audienceId] || data.audienceId : 'Not specified'}
              </p>
            </div>
            {data.audienceId && <CheckCircle2 className="h-5 w-5 text-green-600" />}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.subject && (
            <>
              <div>
                <p className="text-sm text-muted-foreground">Subject</p>
                <p className="font-medium mt-1 line-clamp-2">{data.subject}</p>
              </div>
              <Separator />
            </>
          )}

          {data.content && (
            <div>
              <p className="text-sm text-muted-foreground">Content Preview</p>
              <p className="text-sm mt-1 line-clamp-3 text-muted-foreground">{data.content}</p>
            </div>
          )}

          {!data.subject && !data.content && (
            <p className="text-muted-foreground">No content specified</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Send Time</p>
              <p className="font-medium mt-1">{scheduleDisplay}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-sm text-green-900 dark:text-green-100">Ready to launch</h4>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Click &quot;Complete&quot; to create this campaign. You can make edits and schedule it anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
