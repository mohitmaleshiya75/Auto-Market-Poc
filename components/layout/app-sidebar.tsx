'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { 
  LayoutDashboard, Users, Target, UserPlus, Megaphone, Zap, BarChart3, 
  FileText, Upload, Shield, ScrollText, Settings, Mail, MessageSquare, 
  Smartphone, Bell, Calendar, TestTube2, ChevronLeft, ChevronRight,
  TrendingUp, PieChart, DollarSign, Workflow, Palette, Contact, LineChart,
  Building2
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Workspace } from '@/lib/types'

interface SidebarItem {
  label: string
  href: string
  icon: React.ElementType
}

const sidebarConfigs: Record<Workspace, { title: string; items: SidebarItem[] }> = {
  admin: {
    title: 'Admin',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'Customer Management', href: '/admin/customers', icon: Users },
      { label: 'Audience Segmentation', href: '/admin/segments', icon: Target },
      { label: 'Lead Management', href: '/admin/leads', icon: UserPlus },
      { label: 'Email Marketing', href: '/admin/email', icon: Mail },
      { label: 'Campaign Management', href: '/admin/campaigns', icon: Megaphone },
      { label: 'Automation Center', href: '/admin/automation', icon: Zap },
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      { label: 'Reports', href: '/admin/reports', icon: FileText },
      { label: 'Data Imports', href: '/admin/imports', icon: Upload },
      { label: 'User Management', href: '/admin/users', icon: Shield },
      { label: 'Role Management', href: '/admin/roles', icon: Building2 },
      { label: 'Audit Logs', href: '/admin/audit', icon: ScrollText },
      { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
    ],
  },
  marketer: {
    title: 'Marketer',
    items: [
      { label: 'Dashboard', href: '/marketer/dashboard', icon: LayoutDashboard },
      { label: 'Lead Coverage', href: '/marketer/lead-coverage', icon: PieChart },
      { label: 'Campaigns', href: '/marketer/campaigns', icon: Megaphone },
      { label: 'Templates', href: '/marketer/templates', icon: Palette },
      { label: 'Email Marketing', href: '/marketer/email', icon: Mail },
      { label: 'SMS Marketing', href: '/marketer/sms', icon: MessageSquare },
      { label: 'WhatsApp Marketing', href: '/marketer/whatsapp', icon: Smartphone },
      { label: 'Journey Builder', href: '/marketer/journeys', icon: Workflow },
      { label: 'Audience Lists', href: '/marketer/audiences', icon: Contact },
      { label: 'Automation', href: '/marketer/automation', icon: Zap },
      { label: 'Performance Analytics', href: '/marketer/analytics', icon: LineChart },
    ],
  },
  campaign: {
    title: 'Campaign Manager',
    items: [
      { label: 'Campaign Dashboard', href: '/campaign/dashboard', icon: LayoutDashboard },
      { label: 'Email Campaigns', href: '/campaign/email', icon: Mail },
      { label: 'SMS Campaigns', href: '/campaign/sms', icon: MessageSquare },
      { label: 'WhatsApp Campaigns', href: '/campaign/whatsapp', icon: Smartphone },
      { label: 'Push Notifications', href: '/campaign/push', icon: Bell },
      { label: 'Campaign Calendar', href: '/campaign/calendar', icon: Calendar },
      { label: 'Campaign Reports', href: '/campaign/reports', icon: FileText },
      { label: 'A/B Testing', href: '/campaign/ab-testing', icon: TestTube2 },
    ],
  },
  analytics: {
    title: 'Analytics',
    items: [
      { label: 'Executive Dashboard', href: '/analytics/dashboard', icon: LayoutDashboard },
      { label: 'Campaign Analytics', href: '/analytics/campaigns', icon: Megaphone },
      { label: 'Customer Analytics', href: '/analytics/customers', icon: Users },
      { label: 'Revenue Analytics', href: '/analytics/revenue', icon: DollarSign },
      { label: 'Funnel Analytics', href: '/analytics/funnel', icon: TrendingUp },
      { label: 'Conversion Reports', href: '/analytics/conversions', icon: PieChart },
      { label: 'ROI Reports', href: '/analytics/roi', icon: BarChart3 },
      { label: 'Custom Reports', href: '/analytics/custom', icon: FileText },
    ],
  },
}

export function AppSidebar() {
  const pathname = usePathname()
  const { currentWorkspace, sidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useAppStore()
  
  const config = sidebarConfigs[currentWorkspace]

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      // Automatically collapse sidebar on smaller screens (less than 1024px)
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setSidebarCollapsed])

  // Auto-collapse sidebar ONLY on mobile navigation (< 768px)
  useEffect(() => {
    if (window.innerWidth < 768 && !sidebarCollapsed) {
      setSidebarCollapsed(true)
    }
  }, [pathname, sidebarCollapsed, setSidebarCollapsed])
  
  return (
    <aside className={cn(
      'flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300',
      sidebarCollapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
        {!sidebarCollapsed && (
          <span className="text-lg font-bold text-sidebar-foreground">
            {config.title}
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {config.items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    sidebarCollapsed && 'justify-center px-2'
                  )}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      <div className="border-t border-sidebar-border p-4">
        {!sidebarCollapsed && (
          <p className="text-xs text-sidebar-foreground/60">
            AutoMarket Platform v1.0
          </p>
        )}
      </div>
    </aside>
  )
}
