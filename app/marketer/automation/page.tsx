'use client'

import { Plus, Play, Pause, Settings, Zap, Mail, MessageSquare, Clock, Users, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { KPICard } from '@/components/shared/kpi-card'

const automations = [
  { id: 'AUT-001', name: 'Welcome Email', trigger: 'New Signup', status: 'active', sent: 45200, converted: 12440, rate: 27.5 },
  { id: 'AUT-002', name: 'Cart Abandonment', trigger: 'Cart Abandoned > 1hr', status: 'active', sent: 18500, converted: 5180, rate: 28.0 },
  { id: 'AUT-003', name: 'Browse Abandonment', trigger: 'Product Viewed > 24hr', status: 'active', sent: 32100, converted: 4815, rate: 15.0 },
  { id: 'AUT-004', name: 'Post-Purchase Review', trigger: 'Order Delivered', status: 'active', sent: 28400, converted: 8520, rate: 30.0 },
  { id: 'AUT-005', name: 'Win-Back Campaign', trigger: 'Inactive > 60 days', status: 'paused', sent: 12300, converted: 1230, rate: 10.0 },
  { id: 'AUT-006', name: 'Birthday Offer', trigger: 'Birthday', status: 'active', sent: 8900, converted: 3560, rate: 40.0 },
  { id: 'AUT-007', name: 'Loyalty Reward', trigger: '5th Purchase', status: 'active', sent: 5600, converted: 2800, rate: 50.0 },
  { id: 'AUT-008', name: 'Subscription Renewal', trigger: '7 days before renewal', status: 'draft', sent: 0, converted: 0, rate: 0 },
]

export default function MarketerAutomationPage() {
  const activeAutomations = automations.filter(a => a.status === 'active').length
  const totalSent = automations.reduce((acc, a) => acc + a.sent, 0)
  const totalConverted = automations.reduce((acc, a) => acc + a.converted, 0)
  const avgRate = automations.filter(a => a.rate > 0).reduce((acc, a) => acc + a.rate, 0) / automations.filter(a => a.rate > 0).length

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Automation</h1>
            <p className="text-muted-foreground">Manage automated marketing workflows</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Automation
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Active Automations"
            value={activeAutomations}
            change={2.0}
            trend="up"
            icon={Zap}
          />
          <KPICard
            title="Total Sent"
            value={totalSent.toLocaleString()}
            change={15.3}
            trend="up"
            icon={Mail}
          />
          <KPICard
            title="Conversions"
            value={totalConverted.toLocaleString()}
            change={12.8}
            trend="up"
            icon={Users}
          />
          <KPICard
            title="Avg Conversion Rate"
            value={`${avgRate.toFixed(1)}%`}
            change={3.5}
            trend="up"
            icon={TrendingUp}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {automations.map((automation) => (
            <Card key={automation.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{automation.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Zap className="h-3 w-3" />
                      {automation.trigger}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      automation.status === 'active' ? 'default' :
                      automation.status === 'paused' ? 'secondary' : 'outline'
                    }>
                      {automation.status}
                    </Badge>
                    <Switch
                      checked={automation.status === 'active'}
                      disabled={automation.status === 'draft'}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-2xl font-bold">{automation.sent.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Messages Sent</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{automation.converted.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Conversions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{automation.rate}%</p>
                    <p className="text-xs text-muted-foreground">Conv. Rate</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Stats
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  )
}
