'use client'

import { useCampaignStore } from '@/lib/stores/campaign-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

interface Step1Props {
  onNext: () => void
}

export default function CampaignInfoStep({ onNext }: Step1Props) {
  const { formData, updateFormData, markStepComplete, clearErrors } = useCampaignStore()

  const handleInputChange = (field: string, value: any) => {
    updateFormData({ [field]: value })
  }

  const handleNext = () => {
    const errors: string[] = []

    if (!formData.name.trim()) errors.push('Campaign name is required')
    if (!formData.objective) errors.push('Campaign objective is required')
    if (!formData.type) errors.push('Campaign type is required')
    if (!formData.owner) errors.push('Campaign owner is required')

    if (errors.length > 0) {
      return
    }

    clearErrors(1)
    markStepComplete(1)
    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Campaign Name *</Label>
          <Input
            id="name"
            placeholder="e.g., Summer Sale 2026"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="objective">Campaign Objective *</Label>
          <Select value={formData.objective} onValueChange={(value) => handleInputChange('objective', value)}>
            <SelectTrigger id="objective">
              <SelectValue placeholder="Select objective" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="awareness">Brand Awareness</SelectItem>
              <SelectItem value="consideration">Lead Generation</SelectItem>
              <SelectItem value="conversion">Sales & Conversions</SelectItem>
              <SelectItem value="retention">Customer Retention</SelectItem>
              <SelectItem value="reactivation">Reactivation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Campaign Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your campaign goals and strategy..."
          rows={4}
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Campaign Type *</Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="push">Push Notification</SelectItem>
              <SelectItem value="multichannel">Multi-Channel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority Level</Label>
          <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="owner">Campaign Owner *</Label>
          <Select value={formData.owner} onValueChange={(value) => handleInputChange('owner', value)}>
            <SelectTrigger id="owner">
              <SelectValue placeholder="Select owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sarah">Sarah Johnson</SelectItem>
              <SelectItem value="michael">Michael Chen</SelectItem>
              <SelectItem value="emily">Emily Rodriguez</SelectItem>
              <SelectItem value="david">David Kim</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget (USD)</Label>
          <Input
            id="budget"
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="expectedRevenue">Expected Revenue (USD)</Label>
        <Input
          id="expectedRevenue"
          type="number"
          placeholder="0.00"
          min="0"
          step="0.01"
          value={formData.expectedRevenue}
          onChange={(e) => handleInputChange('expectedRevenue', parseFloat(e.target.value) || 0)}
        />
      </div>

      <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            💡 <strong>Tip:</strong> A clear campaign objective helps you measure success and optimize your strategy.
          </p>
        </CardContent>
      </Card>

      <Button onClick={handleNext} className="w-full">
        Continue to Audience Selection
      </Button>
    </div>
  )
}
