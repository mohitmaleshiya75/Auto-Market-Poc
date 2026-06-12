'use client'

import { useState } from 'react'
import { Campaign } from '@/lib/types'
import { CampaignWizard } from './campaign-wizard'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface CampaignConfigurationProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onCampaignCreate?: (campaign: Campaign) => void
}

export function CampaignConfiguration({
  isOpen = false,
  onOpenChange,
  onCampaignCreate,
}: CampaignConfigurationProps) {
  const [open, setOpen] = useState(isOpen)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  const handleCampaignComplete = (campaignData: Record<string, unknown>) => {
    console.log('[v0] Campaign created:', campaignData)
    
    // Create Campaign object
    const campaign: Campaign = {
      id: campaignData.id as string,
      name: campaignData.name as string,
      type: campaignData.type as any,
      status: 'draft',
      subject: campaignData.subject as string | undefined,
      content: campaignData.content as string | undefined,
      audience: campaignData.audienceId as string || 'all',
      audienceSize: 0,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0,
      createdAt: new Date().toISOString(),
      createdBy: 'current-user',
    }

    onCampaignCreate?.(campaign)
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>
            Follow the steps below to create and configure your marketing campaign
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <CampaignWizard onComplete={handleCampaignComplete} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function CampaignConfigurationButton({
  onCampaignCreate,
}: {
  onCampaignCreate?: (campaign: Campaign) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Create Campaign
      </Button>

      <CampaignConfiguration
        isOpen={open}
        onOpenChange={setOpen}
        onCampaignCreate={onCampaignCreate}
      />
    </>
  )
}
