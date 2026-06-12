'use client'

import { Mail, MessageSquare, Smartphone, Bell, Zap } from 'lucide-react'
import { useCampaignStore } from '@/lib/stores/campaign-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

interface Step3Props {
  onNext: () => void
}

const CHANNELS = [
  { id: 'email', name: 'Email', icon: Mail, description: 'Email campaigns with full customization' },
  { id: 'sms', name: 'SMS', icon: MessageSquare, description: 'Text message campaigns' },
  { id: 'whatsapp', name: 'WhatsApp', icon: Smartphone, description: 'WhatsApp Business messages' },
  { id: 'push', name: 'Push Notification', icon: Bell, description: 'Mobile push notifications' },
]

export default function ChannelSelectionStep({ onNext }: Step3Props) {
  const { formData, updateFormData, markStepComplete, clearErrors } = useCampaignStore()

  const toggleChannel = (channel: any) => {
    const updated = formData.channels.includes(channel)
      ? formData.channels.filter((ch) => ch !== channel)
      : [...formData.channels, channel]
    updateFormData({ channels: updated })
  }

  const handleNext = () => {
    if (formData.channels.length === 0) {
      return
    }
    clearErrors(3)
    markStepComplete(3)
    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {CHANNELS.map((channel) => {
          const Icon = channel.icon
          const isSelected = formData.channels.includes(channel.id as any)

          return (
            <Card
              key={channel.id}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => toggleChannel(channel.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Checkbox checked={isSelected} onCheckedChange={() => toggleChannel(channel.id)} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{channel.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{channel.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="space-y-1">
              <p className="font-medium text-sm text-blue-900 dark:text-blue-100">Multi-Channel Campaigns</p>
              <p className="text-xs text-blue-800 dark:text-blue-200">
                Select multiple channels to reach your audience across different platforms simultaneously.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleNext} disabled={formData.channels.length === 0} className="w-full">
        Continue to Content Builder
      </Button>
    </div>
  )
}
