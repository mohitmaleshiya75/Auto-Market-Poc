import { DashboardLayout } from '@/components/layout'

export default function MarketerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout workspace="marketer">
      {children}
    </DashboardLayout>
  )
}
