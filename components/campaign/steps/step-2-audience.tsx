'use client'

import { useCampaignStore } from '@/lib/stores/campaign-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

interface Step2Props {
  onNext: () => void
}

const MOCK_SEGMENTS = [
  { id: 'seg-1', name: 'Active Customers', count: 5420 },
  { id: 'seg-2', name: 'At-Risk Churners', count: 1850 },
  { id: 'seg-3', name: 'High-Value Prospects', count: 3240 },
  { id: 'seg-4', name: 'Email Engaged', count: 8900 },
  { id: 'seg-5', name: 'Mobile Users', count: 6700 },
]

export default function AudienceSelectionStep({ onNext }: Step2Props) {
  const { formData, updateFormData, markStepComplete, clearErrors } = useCampaignStore()
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSegment = (segmentId: string) => {
    const updated = formData.selectedSegments.includes(segmentId)
      ? formData.selectedSegments.filter((id) => id !== segmentId)
      : [...formData.selectedSegments, segmentId]
    updateFormData({ selectedSegments: updated })

    const totalAudience = MOCK_SEGMENTS.filter((s) => updated.includes(s.id)).reduce((sum, s) => sum + s.count, 0)
    updateFormData({ audienceCount: totalAudience })
  }

  const handleNext = () => {
    if (formData.selectedSegments.length === 0) {
      return
    }
    clearErrors(2)
    markStepComplete(2)
    onNext()
  }

  const filteredSegments = MOCK_SEGMENTS.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalAudience = MOCK_SEGMENTS.filter((s) =>
    formData.selectedSegments.includes(s.id)
  ).reduce((sum, s) => sum + s.count, 0)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Search Segments</Label>
        <Input
          placeholder="Search by name, location, or characteristic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Available Segments</CardTitle>
          <CardDescription>Select one or more segments to target</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredSegments.map((segment) => (
            <div key={segment.id} className="flex items-center gap-3 rounded-md border p-3 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => toggleSegment(segment.id)}
            >
              <Checkbox
                checked={formData.selectedSegments.includes(segment.id)}
                onCheckedChange={() => toggleSegment(segment.id)}
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{segment.name}</p>
                <p className="text-xs text-muted-foreground">{segment.count.toLocaleString()} people</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
        <CardContent className="pt-6">
          <p className="text-sm font-medium text-green-900 dark:text-green-100">
            Selected Audience: <span className="text-lg font-bold">{totalAudience.toLocaleString()} people</span>
          </p>
          <p className="text-xs text-green-800 dark:text-green-200 mt-1">
            Estimated reach based on selected segments
          </p>
        </CardContent>
      </Card>

      <Button onClick={handleNext} disabled={formData.selectedSegments.length === 0} className="w-full">
        Continue to Channel Selection
      </Button>
    </div>
  )
}
