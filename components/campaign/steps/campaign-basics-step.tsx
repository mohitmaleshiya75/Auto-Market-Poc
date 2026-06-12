'use client'

import { CampaignType } from '@/lib/types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Mail, MessageSquare, Smartphone, Bell } from 'lucide-react'

interface CampaignBasicsStepProps {
  onUpdate: (data: Record<string, unknown>) => void
  data?: {
    name?: string
    description?: string
    type?: CampaignType
  }
}

const campaignTypeOptions = [
  { value: 'email', label: 'Email Campaign', icon: Mail, description: 'Send emails to your audience' },
  { value: 'sms', label: 'SMS Campaign', icon: MessageSquare, description: 'Send text messages' },
  { value: 'whatsapp', label: 'WhatsApp Campaign', icon: Smartphone, description: 'Send WhatsApp messages' },
  { value: 'push', label: 'Push Notifications', icon: Bell, description: 'Send push notifications' },
  { value: 'multichannel', label: 'Multi-channel', icon: Mail, description: 'Combine multiple channels' },
] as const

export function CampaignBasicsStep({ onUpdate, data = {} }: CampaignBasicsStepProps) {
  const handleChange = (field: string, value: unknown) => {
    onUpdate({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Campaign Name *</Label>
        <Input
          id="name"
          placeholder="e.g., Summer Sale Campaign"
          value={(data.name as string) || ''}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <p className="text-sm text-muted-foreground">Give your campaign a memorable name</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the purpose and goals of this campaign"
          value={(data.description as string) || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-3">
        <Label>Campaign Type *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {campaignTypeOptions.map((option) => {
            const Icon = option.icon
            const isSelected = data.type === option.value
            return (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleChange('type', option.value)}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-1 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{option.label}</h4>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
