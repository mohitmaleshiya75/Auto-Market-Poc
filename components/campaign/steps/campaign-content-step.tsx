'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Palette, FileText } from 'lucide-react'

interface CampaignContentStepProps {
  onUpdate: (data: Record<string, unknown>) => void
  data?: {
    useTemplate?: boolean
    templateId?: string
    subject?: string
    previewText?: string
    content?: string
  }
}

const mockTemplates = [
  {
    id: 'tpl-1',
    name: 'Welcome Email',
    description: 'Perfect for new customer onboarding',
    preview: 'Welcome to our platform...',
    usage: 1234,
  },
  {
    id: 'tpl-2',
    name: 'Weekly Newsletter',
    description: 'Regular engagement and updates',
    preview: 'This week in our platform...',
    usage: 5678,
  },
  {
    id: 'tpl-3',
    name: 'Product Launch',
    description: 'Announce new products and features',
    preview: 'Introducing our latest feature...',
    usage: 234,
  },
  {
    id: 'tpl-4',
    name: 'Re-engagement Campaign',
    description: 'Win back inactive users',
    preview: 'We miss you! Come back to...',
    usage: 890,
  },
]

export function CampaignContentStep({ onUpdate, data = {} }: CampaignContentStepProps) {
  const [selectedTab, setSelectedTab] = useState<'template' | 'custom'>(
    data.useTemplate ? 'template' : 'custom'
  )

  const handleUpdate = (field: string, value: unknown) => {
    onUpdate({ [field]: value })
  }

  const handleTabChange = (tab: 'template' | 'custom') => {
    setSelectedTab(tab)
    handleUpdate('useTemplate', tab === 'template')
  }

  return (
    <Tabs value={selectedTab} onValueChange={(v) => handleTabChange(v as 'template' | 'custom')}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="template" className="gap-2">
          <Palette className="h-4 w-4" />
          Use Template
        </TabsTrigger>
        <TabsTrigger value="custom" className="gap-2">
          <FileText className="h-4 w-4" />
          Create Custom
        </TabsTrigger>
      </TabsList>

      <TabsContent value="template" className="space-y-4 mt-6">
        <p className="text-sm text-muted-foreground">
          Choose from pre-made templates or browse our template library
        </p>

        <div className="grid gap-3">
          {mockTemplates.map((template) => (
            <Card
              key={template.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                data.templateId === template.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleUpdate('templateId', template.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-1 italic">
                    {template.preview}
                  </p>
                </div>
                <Badge variant="outline" className="ml-4 flex-shrink-0">
                  {template.usage} used
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            Templates can be customized after selection. You can edit subject, preview text, and content.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="custom" className="space-y-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="subject">Email Subject *</Label>
          <Input
            id="subject"
            placeholder="e.g., Exciting news about our new feature!"
            value={(data.subject as string) || ''}
            onChange={(e) => handleUpdate('subject', e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Keep it short and compelling</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="previewText">Preview Text</Label>
          <Input
            id="previewText"
            placeholder="Shows in email client preview"
            value={(data.previewText as string) || ''}
            onChange={(e) => handleUpdate('previewText', e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Optional: helps recipients decide to open</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content *</Label>
          <Textarea
            id="content"
            placeholder="Write your campaign content or paste HTML..."
            value={(data.content as string) || ''}
            onChange={(e) => handleUpdate('content', e.target.value)}
            rows={8}
          />
          <p className="text-xs text-muted-foreground">
            Supports plain text, HTML, and personalization tags
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
