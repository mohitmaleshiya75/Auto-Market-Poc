'use client'

import { TrendingUp, TrendingDown, Mail, MessageSquare, Smartphone, Users, BarChart3, Megaphone, Target, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { KPICard } from '@/components/shared/kpi-card'
import { campaigns } from '@/lib/data/campaigns'
import { analyticsRecords } from '@/lib/data/analytics'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const recentCampaigns = campaigns.slice(0, 5)
const last7DaysAnalytics = analyticsRecords.slice(0, 7).reverse()

const channelPerformance = [
  { name: 'Email', sent: 125000, delivered: 118750, opened: 35625, clicked: 11875 },
  { name: 'SMS', sent: 45000, delivered: 44100, opened: 44100, clicked: 8820 },
  { name: 'WhatsApp', sent: 28000, delivered: 27440, opened: 21952, clicked: 6586 },
  { name: 'Push', sent: 85000, delivered: 76500, opened: 30600, clicked: 7650 },
]

const channelColors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B']

const audienceGrowth = last7DaysAnalytics.map(d => ({
  date: d.date.split('-').slice(1).join('/'),
  customers: d.customers,
  newCustomers: d.newCustomers
}))

export default function MarketerDashboard() {
  const totalCampaigns = campaigns.length
  const activeCampaigns = campaigns.filter(c => c.status === 'running').length
  const totalSent = campaigns.reduce((acc, c) => acc + c.sent, 0)
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenue, 0)

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marketer Dashboard</h1>
            <p className="text-muted-foreground">Overview of your marketing performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">View Reports</Button>
            <Button>Create Campaign</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Active Campaigns"
            value={activeCampaigns}
            change={12.0}
            trend="up"
            icon={Megaphone}
          />
          <KPICard
            title="Total Messages Sent"
            value={totalSent.toLocaleString('en-US')}
            change={8.5}
            trend="up"
            icon={Mail}
          />
          <KPICard
            title="Avg Open Rate"
            value="28.4%"
            change={2.3}
            trend="up"
            icon={BarChart3}
          />
          <KPICard
            title="Campaign Revenue"
            value={`$${(totalRevenue / 1000).toFixed(0)}K`}
            change={15.2}
            trend="up"
            icon={TrendingUp}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Audience Growth</CardTitle>
              <CardDescription>Total customers and new signups over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={audienceGrowth}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line type="monotone" dataKey="customers" stroke="#10B981" strokeWidth={2} name="Total Customers" />
                    <Line type="monotone" dataKey="newCustomers" stroke="#3B82F6" strokeWidth={2} name="New Customers" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Channel Performance</CardTitle>
              <CardDescription>Messages sent by channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelPerformance}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="sent" fill="#10B981" name="Sent" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="opened" fill="#3B82F6" name="Opened" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="clicked" fill="#8B5CF6" name="Clicked" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Your latest campaign activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-lg p-2 ${
                        campaign.type === 'email' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400' :
                        campaign.type === 'sms' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                        campaign.type === 'whatsapp' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' :
                        'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
                      }`}>
                        {campaign.type === 'email' && <Mail className="h-5 w-5" />}
                        {campaign.type === 'sms' && <MessageSquare className="h-5 w-5" />}
                        {campaign.type === 'whatsapp' && <Smartphone className="h-5 w-5" />}
                        {campaign.type === 'push' && <Megaphone className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">{campaign.sent.toLocaleString('en-US')} sent</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{((campaign.opened / campaign.delivered) * 100).toFixed(1)}% opened</p>
                        <p className="text-xs text-muted-foreground">{campaign.clicked.toLocaleString('en-US')} clicks</p>
                      </div>
                      <Badge variant={
                        campaign.status === 'running' ? 'default' :
                        campaign.status === 'completed' ? 'secondary' :
                        'outline'
                      }>
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common marketing tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Create Email Campaign
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send SMS Blast
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="mr-2 h-4 w-4" />
                Build Audience Segment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Zap className="mr-2 h-4 w-4" />
                Create Automation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Import Contacts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
