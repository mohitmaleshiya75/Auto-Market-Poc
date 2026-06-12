'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/select'
import { Calendar, Clock, Zap } from 'lucide-react'

interface CampaignScheduleStepProps {
  onUpdate: (data: Record<string, unknown>) => void
  data?: {
    scheduleType?: 'immediate' | 'scheduled' | 'recurring'
    scheduledDate?: string
    scheduledTime?: string
    timezone?: string
  }
}

export function CampaignScheduleStep({ onUpdate, data = {} }: CampaignScheduleStepProps) {
  const scheduleType = (data.scheduleType as string) || 'immediate'

  const handleUpdate = (field: string, value: unknown) => {
    onUpdate({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-semibold">When should this campaign run? *</Label>

        <div className="space-y-3">
          <Card
            className={`p-4 cursor-pointer transition-all border-2 ${
              scheduleType === 'immediate'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleUpdate('scheduleType', 'immediate')}
          >
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium">Send Immediately</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Campaign will be sent to all recipients right away
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-4 cursor-pointer transition-all border-2 ${
              scheduleType === 'scheduled'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleUpdate('scheduleType', 'scheduled')}
          >
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium">Schedule for Later</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose a specific date and time to send
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-4 cursor-pointer transition-all border-2 ${
              scheduleType === 'recurring'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleUpdate('scheduleType', 'recurring')}
          >
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium">Recurring Campaign</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Set up automatic recurring sends on a schedule
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {scheduleType === 'scheduled' && (
        <div className="space-y-4 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={(data.scheduledDate as string) || ''}
                onChange={(e) => handleUpdate('scheduledDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={(data.scheduledTime as string) || ''}
                onChange={(e) => handleUpdate('scheduledTime', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <select
              id="timezone"
              value={(data.timezone as string) || 'UTC'}
              onChange={(e) => handleUpdate('timezone', e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Standard Time</option>
              <option value="CST">Central Standard Time</option>
              <option value="MST">Mountain Standard Time</option>
              <option value="PST">Pacific Standard Time</option>
              <option value="GMT">Greenwich Mean Time</option>
              <option value="IST">Indian Standard Time</option>
            </select>
          </div>
        </div>
      )}

      {scheduleType === 'recurring' && (
        <div className="space-y-4 pt-4 border-t">
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              Recurring campaigns will be set up in the next step. You can configure frequency, duration, and other parameters.
            </p>
          </div>
        </div>
      )}

      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h4 className="font-medium text-sm text-amber-900 dark:text-amber-100 mb-2">Smart Send Time</h4>
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Enable smart send time to automatically send when each recipient is most likely to engage
        </p>
      </div>
    </div>
  )
}
