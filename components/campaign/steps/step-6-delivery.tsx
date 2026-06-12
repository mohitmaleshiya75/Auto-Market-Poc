'use client'

import { useCampaignStore } from '@/lib/stores/campaign-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface Step6Props {
  onNext: () => void
}

export default function DeliverySettingsStep({ onNext }: Step6Props) {
  const { formData, updateFormData, markStepComplete, clearErrors } = useCampaignStore()

  const handleCheckboxChange = (field: string, checked: boolean) => {
    updateFormData({ [field]: checked })
  }

  const handleSpeedChange = (value: string) => {
    updateFormData({ deliverySpeed: value as any })
  }

  const handleNext = () => {
    clearErrors(6)
    markStepComplete(6)
    onNext()
  }

  const speedDescription: Record<string, string> = {
    normal: 'Standard delivery with regular rate limiting',
    fast: 'Faster delivery with optimized scheduling',
    priority: 'Priority queue with faster throughput',
    enterprise: 'Maximum speed with dedicated resources',
  }

  return (
    <div className="space-y-6">
      {/* Delivery Speed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Delivery Speed</CardTitle>
          <CardDescription>Choose how quickly your campaign should be delivered</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deliverySpeed">Speed Level</Label>
            <Select value={formData.deliverySpeed} onValueChange={handleSpeedChange}>
              <SelectTrigger id="deliverySpeed">
                <SelectValue placeholder="Select delivery speed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground">
            {speedDescription[formData.deliverySpeed]}
          </p>
        </CardContent>
      </Card>

      {/* Tracking Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tracking & Analytics</CardTitle>
          <CardDescription>Select which metrics to track for this campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="openTracking"
              checked={formData.openTracking}
              onCheckedChange={(checked) => handleCheckboxChange('openTracking', checked as boolean)}
            />
            <Label htmlFor="openTracking" className="text-sm font-normal cursor-pointer">
              Open Tracking (Track email opens with tracking pixel)
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="clickTracking"
              checked={formData.clickTracking}
              onCheckedChange={(checked) => handleCheckboxChange('clickTracking', checked as boolean)}
            />
            <Label htmlFor="clickTracking" className="text-sm font-normal cursor-pointer">
              Click Tracking (Track link clicks in your content)
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="conversionTracking"
              checked={formData.conversionTracking}
              onCheckedChange={(checked) => handleCheckboxChange('conversionTracking', checked as boolean)}
            />
            <Label htmlFor="conversionTracking" className="text-sm font-normal cursor-pointer">
              Conversion Tracking (Track purchases or signup completions)
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="revenueTracking"
              checked={formData.revenueTracking}
              onCheckedChange={(checked) => handleCheckboxChange('revenueTracking', checked as boolean)}
            />
            <Label htmlFor="revenueTracking" className="text-sm font-normal cursor-pointer">
              Revenue Tracking (Track revenue from campaign conversions)
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="utmTracking"
              checked={formData.utmTracking}
              onCheckedChange={(checked) => handleCheckboxChange('utmTracking', checked as boolean)}
            />
            <Label htmlFor="utmTracking" className="text-sm font-normal cursor-pointer">
              UTM Parameters (Automatically add UTM codes to links)
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="googleAnalytics"
              checked={formData.googleAnalytics}
              onCheckedChange={(checked) => handleCheckboxChange('googleAnalytics', checked as boolean)}
            />
            <Label htmlFor="googleAnalytics" className="text-sm font-normal cursor-pointer">
              Google Analytics Integration (Send events to Google Analytics)
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
        <CardContent className="pt-6">
          <p className="text-sm text-green-900 dark:text-green-100">
            ✓ All tracking options are enabled by default. Disable if not needed to improve email deliverability.
          </p>
        </CardContent>
      </Card>

      <Button onClick={handleNext} className="w-full">
        Continue to Review & Launch
      </Button>
    </div>
  )
}
