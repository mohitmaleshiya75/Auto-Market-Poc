'use client'

import { useState } from 'react'
import { Plus, Search, Mail, Send, Eye, Edit2, Copy, BarChart3, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { campaigns } from '@/lib/data/campaigns'
import { emailTemplates } from '@/lib/data/templates'
import { KPICard } from '@/components/shared/kpi-card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const emailCampaigns = campaigns.filter(c => c.type === 'email')

const emailPerformance = [
  { date: 'Mon', sent: 12500, delivered: 12125, opened: 3638, clicked: 728 },
  { date: 'Tue', sent: 15000, delivered: 14550, opened: 4365, clicked: 873 },
  { date: 'Wed', sent: 11000, delivered: 10670, opened: 3201, clicked: 640 },
  { date: 'Thu', sent: 18000, delivered: 17460, opened: 5238, clicked: 1048 },
  { date: 'Fri', sent: 14000, delivered: 13580, opened: 4074, clicked: 815 },
  { date: 'Sat', sent: 8000, delivered: 7760, opened: 2328, clicked: 466 },
  { date: 'Sun', sent: 6000, delivered: 5820, opened: 1746, clicked: 349 },
]

export default function EmailMarketingPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const totalSent = emailCampaigns.reduce((acc, c) => acc + c.sent, 0)
  const totalDelivered = emailCampaigns.reduce((acc, c) => acc + c.delivered, 0)
  const totalOpened = emailCampaigns.reduce((acc, c) => acc + c.opened, 0)
  const totalClicked = emailCampaigns.reduce((acc, c) => acc + c.clicked, 0)

  const avgOpenRate = totalDelivered > 0 ? ((totalOpened / totalDelivered) * 100).toFixed(1) : '0'
  const avgClickRate = totalOpened > 0 ? ((totalClicked / totalOpened) * 100).toFixed(1) : '0'

  const filteredCampaigns = emailCampaigns.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Marketing</h1>
          <p className="text-muted-foreground">Manage and monitor your email campaigns</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Email Campaign
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Sent"
          value={totalSent.toLocaleString('en-US')}
          change={8.2}
          trend="up"
          icon={Send}
        />
        <KPICard
          title="Delivered"
          value={totalDelivered.toLocaleString('en-US')}
          change={7.5}
          trend="up"
          icon={CheckCircle}
        />
        <KPICard
          title="Avg Open Rate"
          value={`${avgOpenRate}%`}
          change={2.1}
          trend="up"
          icon={Mail}
        />
        <KPICard
          title="Avg Click Rate"
          value={`${avgClickRate}%`}
          change={1.8}
          trend="up"
          icon={BarChart3}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Email Performance (Last 7 Days)</CardTitle>
            <CardDescription>Track your email delivery and engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-75">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emailPerformance}>
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
                  <Line type="monotone" dataKey="delivered" stroke="#10B981" strokeWidth={2} name="Delivered" />
                  <Line type="monotone" dataKey="opened" stroke="#3B82F6" strokeWidth={2} name="Opened" />
                  <Line type="monotone" dataKey="clicked" stroke="#8B5CF6" strokeWidth={2} name="Clicked" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Templates</CardTitle>
            <CardDescription>Your most used email templates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {emailTemplates.slice(0, 5).map((template) => (
              <div key={template.id} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{template.name}</p>
                  <p className="text-xs text-muted-foreground">{template.usageCount} uses</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Email Campaigns</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Delivered</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Click Rate</TableHead>
                <TableHead>Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.slice(0, 10).map((campaign) => {
                const openRate = campaign.delivered > 0 ? ((campaign.opened / campaign.delivered) * 100) : 0
                const clickRate = campaign.opened > 0 ? ((campaign.clicked / campaign.opened) * 100) : 0
                
                return (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-xs text-muted-foreground">{campaign.createdAt}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={campaign.status === 'completed' ? 'secondary' : campaign.status === 'running' ? 'default' : 'outline'}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.sent.toLocaleString('en-US')}</TableCell>
                    <TableCell>{campaign.delivered.toLocaleString('en-US')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={openRate} className="w-16 h-2" />
                        <span className="text-sm">{openRate.toFixed(1)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={clickRate} className="w-16 h-2" />
                        <span className="text-sm">{clickRate.toFixed(1)}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${campaign.revenue.toLocaleString('en-US')}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
