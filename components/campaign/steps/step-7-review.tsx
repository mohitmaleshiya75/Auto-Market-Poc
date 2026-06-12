'use client'

import { useCampaignStore } from '@/lib/stores/campaign-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Users, Calendar, Settings, Zap, CheckCircle } from 'lucide-react'

interface Step7Props {
  onNext: () => void
}

export default function ReviewLaunchStep({ onNext }: Step7Props) {
  const { formData, createCampaign, resetForm } = useCampaignStore()

  const handleLaunch = () => {
    // Create the campaign
    const newCampaign = {
      id: `CAMP-${Date.now()}`,
      name: formData.name,
      type: formData.type,
      status: 'scheduled' as const,
      subject: formData.emailSubject,
      content: formData.emailContent,
      audience: formData.selectedSegments.join(', '),
      audienceSize: formData.audienceCount,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0,
      createdAt: new Date().toISOString(),
      scheduledAt: `${formData.sendDate}T${formData.sendTime}`,
      createdBy: formData.owner,
    }

    createCampaign(newCampaign)
    resetForm()
    
    // Redirect to dashboard
    window.location.href = '/campaign/dashboard'
  }

  const estimateMetrics = () => {
    const reach = formData.audienceCount
    const openRate = 0.35 // 35% average open rate
    const clickRate = 0.12 // 12% average click rate
    const conversionRate = 0.05 // 5% average conversion rate

    return {
      reach,
      opens: Math.floor(reach * openRate),
      clicks: Math.floor(reach * openRate * clickRate),
      conversions: Math.floor(reach * openRate * clickRate * conversionRate),
      revenue: Math.floor(reach * openRate * clickRate * conversionRate * 50),
    }
  }

  const metrics = estimateMetrics()

  return (
    <div className="space-y-6">
      {/* Campaign Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Campaign Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Campaign Name</p>
              <p className="font-semibold">{formData.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="font-semibold capitalize">{formData.type}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Objective</p>
              <p className="font-semibold capitalize">{formData.objective}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Owner</p>
              <p className="font-semibold">{formData.owner}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audience Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-5 w-5" />
            Audience Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Audience Size</span>
            <span className="text-lg font-semibold">{formData.audienceCount.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Based on {formData.selectedSegments.length} selected segment{formData.selectedSegments.length !== 1 ? 's' : ''}
          </p>
        </CardContent>
      </Card>

      {/* Channels & Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Channels & Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {formData.channels.map((channel) => (
              <Badge key={channel} variant="secondary" className="capitalize">
                {channel}
              </Badge>
            ))}
          </div>
          {formData.emailSubject && (
            <div>
              <p className="text-xs text-muted-foreground">Email Subject</p>
              <p className="text-sm font-medium">{formData.emailSubject}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Send Date & Time</span>
            <span className="font-semibold">
              {new Date(formData.sendDate).toLocaleDateString()} at {formData.sendTime}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Timezone: {formData.timezone}</p>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Delivery Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Delivery Speed</span>
            <span className="font-semibold capitalize">{formData.deliverySpeed}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tracking Enabled</span>
            <span className="font-semibold">
              {[formData.openTracking, formData.clickTracking, formData.conversionTracking].filter(Boolean).length} / 3
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Estimated Performance */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 dark:from-blue-950 dark:to-cyan-950 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Estimated Performance
          </CardTitle>
          <CardDescription>Projected metrics based on historical data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-md bg-white dark:bg-slate-900 p-3">
              <p className="text-xs text-muted-foreground">Estimated Reach</p>
              <p className="text-2xl font-bold text-blue-600">{metrics.reach.toLocaleString()}</p>
            </div>
            <div className="rounded-md bg-white dark:bg-slate-900 p-3">
              <p className="text-xs text-muted-foreground">Est. Opens</p>
              <p className="text-2xl font-bold text-cyan-600">{metrics.opens.toLocaleString()}</p>
            </div>
            <div className="rounded-md bg-white dark:bg-slate-900 p-3">
              <p className="text-xs text-muted-foreground">Est. Clicks</p>
              <p className="text-2xl font-bold text-green-600">{metrics.clicks.toLocaleString()}</p>
            </div>
            <div className="rounded-md bg-white dark:bg-slate-900 p-3">
              <p className="text-xs text-muted-foreground">Est. Conversions</p>
              <p className="text-2xl font-bold text-emerald-600">{metrics.conversions.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          Save as Draft
        </Button>
        <Button onClick={handleLaunch} className="flex-1">
          Launch Campaign
        </Button>
      </div>
    </div>
  )
}
