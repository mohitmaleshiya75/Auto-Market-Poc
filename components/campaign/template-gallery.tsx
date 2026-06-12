'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Eye } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CampaignPreview } from './campaign-preview'

interface Template {
  id: string
  name: string
  category: string
  description: string
  subject: string
  content: string
  previewText?: string
  thumbnail?: string
  usage: number
}

const mockTemplates: Template[] = [
  {
    id: 'tpl-1',
    name: 'Welcome Onboarding',
    category: 'Onboarding',
    description: 'Perfect for welcoming new customers to your platform',
    subject: 'Welcome to AutoMarket! Let\'s get you started',
    previewText: 'Everything you need to succeed in one place',
    content: 'Hi there!\n\nWelcome to AutoMarket. We\'re excited to have you on board.\n\nTo get started, here are some key resources:\n- Platform Overview\n- Getting Started Guide\n- Video Tutorials\n\nIf you have any questions, our support team is here to help!',
    usage: 1234,
  },
  {
    id: 'tpl-2',
    name: 'Weekly Newsletter',
    category: 'Newsletter',
    description: 'Regular engagement content and platform updates',
    subject: 'This Week in AutoMarket: New Features & Updates',
    previewText: 'Check out what\'s new this week',
    content: 'This week we\'re excited to announce:\n\n1. NEW: Campaign Analytics Dashboard\nTrack real-time performance metrics\n\n2. IMPROVED: Email Template Builder\nNew blocks and customization options\n\n3. UPDATED: API Documentation\nComprehensive guides and examples\n\nLearn more →',
    usage: 5678,
  },
  {
    id: 'tpl-3',
    name: 'Product Announcement',
    category: 'Product',
    description: 'Announce new products or major feature releases',
    subject: 'Introducing the All-New Campaign Automation Suite',
    previewText: 'Save hours on campaign management',
    content: 'We\'re thrilled to introduce Campaign Automation!\n\nWith this powerful new feature, you can:\n✓ Set up complex multi-step journeys\n✓ Automate follow-ups based on user behavior\n✓ Increase conversion rates by 3x\n✓ Save 10+ hours per week\n\nGet started today →',
    usage: 234,
  },
  {
    id: 'tpl-4',
    name: 'Re-engagement Campaign',
    category: 'Retention',
    description: 'Win back inactive users with compelling offers',
    subject: 'We miss you! Here\'s an exclusive offer',
    previewText: 'Limited time: 30% off for returning customers',
    content: 'Hi [Name],\n\nIt\'s been a while since we\'ve seen you in AutoMarket.\n\nWe\'ve been adding amazing new features, and we\'d love for you to check them out!\n\nEXCLUSIVE OFFER:\nGet 30% off your next month\nUse code: COMEBACK30\n\nCome back and see what\'s new →',
    usage: 890,
  },
  {
    id: 'tpl-5',
    name: 'Event Invitation',
    category: 'Events',
    description: 'Invite users to webinars, conferences, or meetups',
    subject: 'You\'re Invited: Marketing Automation Masterclass',
    previewText: 'Learn from industry experts',
    content: 'Save the date!\n\n📅 Date: June 15, 2024\n🕐 Time: 2:00 PM EST\n📍 Location: Virtual\n\nJoin us for a live masterclass on marketing automation best practices.\n\nSpots are limited. Claim yours now →\n\nAgenda:\n- Email Marketing Best Practices\n- Campaign Segmentation Strategies\n- Q&A with Industry Experts',
    usage: 456,
  },
  {
    id: 'tpl-6',
    name: 'Feedback Survey',
    category: 'Feedback',
    description: 'Gather user feedback and improve your service',
    subject: 'Help us improve: Share your feedback (2 min survey)',
    previewText: 'Your opinion matters to us',
    content: 'Hi [Name],\n\nWe value your feedback! To help us serve you better, we\'ve created a short 2-minute survey.\n\nTake the survey →\n\nYour input helps us:\n- Improve our features\n- Fix any issues\n- Build what you need next\n\nThank you for being part of our community!',
    usage: 789,
  },
]

interface TemplateGalleryProps {
  onSelectTemplate?: (template: Template) => void
  showPreview?: boolean
}

export function TemplateGallery({ onSelectTemplate, showPreview = true }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)

  const categories = Array.from(new Set(mockTemplates.map((t) => t.category)))

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base line-clamp-1">{template.name}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">
                    {template.description}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="w-fit">
                {template.category}
              </Badge>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Subject:</p>
                <p className="text-sm font-medium line-clamp-2">{template.subject}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-muted-foreground">{template.usage} used</span>
                <div className="flex gap-2">
                  {showPreview && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewTemplate(template)}
                      className="gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  )}
                  {onSelectTemplate && (
                    <Button
                      size="sm"
                      onClick={() => onSelectTemplate(template)}
                    >
                      Use
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center">
              No templates found matching your criteria
            </p>
          </CardContent>
        </Card>
      )}

      {/* Preview Dialog */}
      {previewTemplate && (
        <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{previewTemplate.name}</DialogTitle>
              <DialogDescription>{previewTemplate.category}</DialogDescription>
            </DialogHeader>
            <div className="mt-6">
              <CampaignPreview
                subject={previewTemplate.subject}
                previewText={previewTemplate.previewText}
                content={previewTemplate.content}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
