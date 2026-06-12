import { DashboardLayout } from '@/components/layout'

export default function CampaignLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout workspace="campaign">
      {children}
    </DashboardLayout>
  )
}
