'use client'

import { useCampaignStore } from '@/lib/stores/campaign-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Step4Props {
  onNext: () => void
}

export default function ContentBuilderStep({ onNext }: Step4Props) {
  const { formData, updateFormData, markStepComplete, clearErrors } = useCampaignStore()

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value })
  }

  const handleNext = () => {
    clearErrors(4)
    markStepComplete(4)
    onNext()
  }

  const includesEmail = formData.channels.includes('email')
  const includesSMS = formData.channels.includes('sms')
  const includesWhatsApp = formData.channels.includes('whatsapp')

  return (
    <div className="space-y-6">
      <Tabs defaultValue={includesEmail ? 'email' : includesSMS ? 'sms' : 'whatsapp'} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {includesEmail && <TabsTrigger value="email">Email</TabsTrigger>}
          {includesSMS && <TabsTrigger value="sms">SMS</TabsTrigger>}
          {includesWhatsApp && <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>}
        </TabsList>

        {includesEmail && (
          <TabsContent value="email" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailSubject">Subject Line *</Label>
              <Input
                id="emailSubject"
                placeholder="Enter a compelling subject line"
                value={formData.emailSubject || ''}
                onChange={(e) => handleInputChange('emailSubject', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailPreview">Preview Text</Label>
              <Input
                id="emailPreview"
                placeholder="The snippet shown in inbox list"
                value={formData.emailPreview || ''}
                onChange={(e) => handleInputChange('emailPreview', e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="senderName">Sender Name</Label>
                <Input
                  id="senderName"
                  placeholder="e.g., AutoMarket Team"
                  value={formData.emailSenderName || ''}
                  onChange={(e) => handleInputChange('emailSenderName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="replyEmail">Reply-To Email</Label>
                <Input
                  id="replyEmail"
                  type="email"
                  placeholder="support@company.com"
                  value={formData.emailReplyTo || ''}
                  onChange={(e) => handleInputChange('emailReplyTo', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailTemplate">Template</Label>
              <Select value={formData.emailTemplate || ''} onValueChange={(value) => handleInputChange('emailTemplate', value)}>
                <SelectTrigger id="emailTemplate">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blank">Blank</SelectItem>
                  <SelectItem value="welcome">Welcome Series</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailContent">Email Body</Label>
              <Textarea
                id="emailContent"
                placeholder="Enter your email content (supports HTML and Markdown)"
                rows={8}
                value={formData.emailContent || ''}
                onChange={(e) => handleInputChange('emailContent', e.target.value)}
              />
            </div>
          </TabsContent>
        )}

        {includesSMS && (
          <TabsContent value="sms" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smsTitle">SMS Title</Label>
              <Input
                id="smsTitle"
                placeholder="Short title or campaign name"
                value={formData.smsTitle || ''}
                onChange={(e) => handleInputChange('smsTitle', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smsMessage">Message (160 characters)</Label>
              <Textarea
                id="smsMessage"
                placeholder="Enter your SMS message"
                rows={4}
                maxLength={160}
                value={formData.smsMessage || ''}
                onChange={(e) => {
                  handleInputChange('smsMessage', e.target.value)
                  updateFormData({ smsCounter: e.target.value.length })
                }}
              />
              <p className="text-xs text-muted-foreground">
                {(formData.smsMessage || '').length}/160 characters
              </p>
            </div>
          </TabsContent>
        )}

        {includesWhatsApp && (
          <TabsContent value="whatsapp" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsappTitle">Title</Label>
              <Input
                id="whatsappTitle"
                placeholder="Message title"
                value={formData.whatsappTitle || ''}
                onChange={(e) => handleInputChange('whatsappTitle', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappMessage">Message</Label>
              <Textarea
                id="whatsappMessage"
                placeholder="Enter your WhatsApp message"
                rows={4}
                value={formData.whatsappMessage || ''}
                onChange={(e) => handleInputChange('whatsappMessage', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappCTA">Call-to-Action</Label>
              <Input
                id="whatsappCTA"
                placeholder="e.g., Visit Store, Learn More"
                value={formData.whatsappCTA || ''}
                onChange={(e) => handleInputChange('whatsappCTA', e.target.value)}
              />
            </div>
          </TabsContent>
        )}
      </Tabs>

      <Button onClick={handleNext} className="w-full">
        Continue to Scheduling
      </Button>
    </div>
  )
}
