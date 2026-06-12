'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Zap, Filter } from 'lucide-react'

interface CampaignAudienceStepProps {
  onUpdate: (data: Record<string, unknown>) => void
  data?: {
    audienceType?: 'segment' | 'list' | 'all'
    audienceId?: string
    selectedTags?: string[]
  }
}

const mockSegments = [
  {
    id: 'seg-1',
    name: 'Active Customers',
    description: 'Customers with activity in the last 30 days',
    size: 15234,
  },
  {
    id: 'seg-2',
    name: 'VIP Users',
    description: 'High-value customers with lifetime value > $5000',
    size: 3456,
  },
  {
    id: 'seg-3',
    name: 'Churned Users',
    description: 'Customers inactive for more than 90 days',
    size: 8934,
  },
  {
    id: 'seg-4',
    name: 'Trial Users',
    description: 'New users in trial period',
    size: 2123,
  },
]

const mockTags = [
  'engaged',
  'high-value',
  'newsletter-subscriber',
  'mobile-user',
  'desktop-user',
  'organic-traffic',
  'paid-traffic',
]

export function CampaignAudienceStep({ onUpdate, data = {} }: CampaignAudienceStepProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleAudienceSelect = (audienceId: string) => {
    onUpdate({ audienceType: 'segment', audienceId })
  }

  const handleTagToggle = (tag: string) => {
    const selectedTags = (data.selectedTags as string[]) || []
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    onUpdate({ selectedTags: updated })
  }

  const selectedTags = (data.selectedTags as string[]) || []

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <Label className="text-base font-semibold">Select Audience Segment *</Label>
        </div>

        <Input
          placeholder="Search segments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />

        <div className="grid gap-3">
          {mockSegments
            .filter(
              (seg) =>
                seg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                seg.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((segment) => (
              <Card
                key={segment.id}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  data.audienceId === segment.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleAudienceSelect(segment.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{segment.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{segment.description}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <Badge variant="outline">{segment.size.toLocaleString()}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">contacts</p>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>

      <div className="border-t pt-6 space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <Label className="text-base font-semibold">Apply Tags (Optional)</Label>
        </div>

        <div className="flex flex-wrap gap-2">
          {mockTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex gap-3">
          <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-sm text-blue-900 dark:text-blue-100">Advanced Filtering</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Create custom audience filters based on behavior, demographics, and engagement metrics
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
