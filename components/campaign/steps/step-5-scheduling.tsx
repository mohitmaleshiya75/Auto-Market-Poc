'use client'

import { useCampaignStore } from '@/lib/stores/campaign-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

interface Step5Props {
  onNext: () => void
}

const TIMEZONES = [
  'UTC',
  'EST (Eastern Standard Time)',
  'CST (Central Standard Time)',
  'MST (Mountain Standard Time)',
  'PST (Pacific Standard Time)',
  'GMT (Greenwich Mean Time)',
  'IST (India Standard Time)',
  'JST (Japan Standard Time)',
  'AEST (Australian Eastern Standard Time)',
]

export default function SchedulingStep({ onNext }: Step5Props) {
  const { formData, updateFormData, markStepComplete, clearErrors } = useCampaignStore()

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value })
  }

  const handleNext = () => {
    const errors: string[] = []
    if (!formData.sendDate) errors.push('Send date is required')
    if (!formData.sendTime) errors.push('Send time is required')
    
    if (errors.length > 0) {
      return
    }

    clearErrors(5)
    markStepComplete(5)
    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sendDate">Send Date *</Label>
          <Input
            id="sendDate"
            type="date"
            value={formData.sendDate}
            onChange={(e) => handleInputChange('sendDate', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sendTime">Send Time *</Label>
          <Input
            id="sendTime"
            type="time"
            value={formData.sendTime}
            onChange={(e) => handleInputChange('sendTime', e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">Campaign Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">Campaign End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz} value={tz}>{tz}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Send Frequency</Label>
          <Select value={formData.frequency} onValueChange={(value) => handleInputChange('frequency', value)}>
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="once">Send Once</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
        <CardContent className="pt-6">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            ℹ️ Campaigns are scheduled in the timezone you select. Make sure to account for user locations for optimal delivery.
          </p>
        </CardContent>
      </Card>

      <Button onClick={handleNext} className="w-full">
        Continue to Delivery Settings
      </Button>
    </div>
  )
}
