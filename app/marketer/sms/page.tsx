'use client'

import { useState } from 'react'
import { Plus, Search, MessageSquare, Send, CheckCircle, BarChart3, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { campaigns } from '@/lib/data/campaigns'
import { smsTemplates } from '@/lib/data/templates'
import { KPICard } from '@/components/shared/kpi-card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const smsCampaigns = campaigns.filter(c => c.type === 'sms')

const smsPerformance = [
  { date: 'Mon', sent: 4500, delivered: 4410, clicked: 882 },
  { date: 'Tue', sent: 5200, delivered: 5096, clicked: 1019 },
  { date: 'Wed', sent: 3800, delivered: 3724, clicked: 745 },
  { date: 'Thu', sent: 6100, delivered: 5978, clicked: 1196 },
  { date: 'Fri', sent: 4800, delivered: 4704, clicked: 941 },
  { date: 'Sat', sent: 2500, delivered: 2450, clicked: 490 },
  { date: 'Sun', sent: 2000, delivered: 1960, clicked: 392 },
]

export default function SMSMarketingPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const totalSent = smsCampaigns.reduce((acc, c) => acc + c.sent, 0)
  const totalDelivered = smsCampaigns.reduce((acc, c) => acc + c.delivered, 0)
  const totalClicked = smsCampaigns.reduce((acc, c) => acc + c.clicked, 0)

  const deliveryRate = totalSent > 0 ? ((totalDelivered / totalSent) * 100).toFixed(1) : '0'
  const clickRate = totalDelivered > 0 ? ((totalClicked / totalDelivered) * 100).toFixed(1) : '0'

  const filteredCampaigns = smsCampaigns.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SMS Marketing</h1>
            <p className="text-muted-foreground">Manage and monitor your SMS campaigns</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New SMS Campaign
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Sent"
            value={totalSent.toLocaleString('en-US')}
            change={12.5}
            trend="up"
            icon={Send}
          />
          <KPICard
            title="Delivered"
            value={totalDelivered.toLocaleString('en-US')}
            change={11.2}
            trend="up"
            icon={CheckCircle}
          />
          <KPICard
            title="Delivery Rate"
            value={`${deliveryRate}%`}
            change={0.8}
            trend="up"
            icon={MessageSquare}
          />
          <KPICard
            title="Click Rate"
            value={`${clickRate}%`}
            change={2.3}
            trend="up"
            icon={BarChart3}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>SMS Performance (Last 7 Days)</CardTitle>
              <CardDescription>Track your SMS delivery and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={smsPerformance}>
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
                    <Bar dataKey="sent" fill="#3B82F6" name="Sent" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="delivered" fill="#10B981" name="Delivered" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="clicked" fill="#8B5CF6" name="Clicked" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Templates</CardTitle>
              <CardDescription>Quick access to your templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {smsTemplates.slice(0, 5).map((template) => (
                <div key={template.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{template.name}</p>
                    <Badge variant="secondary">{template.characterCount} chars</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{template.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>SMS Campaigns</CardTitle>
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
                  <TableHead>Delivery Rate</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.slice(0, 10).map((campaign) => {
                  const deliveryRate = campaign.sent > 0 ? ((campaign.delivered / campaign.sent) * 100) : 0
                  
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
                      <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                      <TableCell>{campaign.delivered.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={deliveryRate} className="w-16 h-2" />
                          <span className="text-sm">{deliveryRate.toFixed(1)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{campaign.clicked.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">${campaign.revenue.toLocaleString()}</TableCell>
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
