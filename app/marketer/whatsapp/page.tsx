'use client'

import { useState } from 'react'
import { Plus, Search, Smartphone, Send, CheckCircle, BarChart3, Clock, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { campaigns } from '@/lib/data/campaigns'
import { whatsappTemplates } from '@/lib/data/templates'
import { KPICard } from '@/components/shared/kpi-card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const whatsappCampaigns = campaigns.filter(c => c.type === 'whatsapp')

const whatsappPerformance = [
  { date: 'Mon', sent: 2800, delivered: 2744, read: 2195, replied: 549 },
  { date: 'Tue', sent: 3200, delivered: 3136, read: 2509, replied: 627 },
  { date: 'Wed', sent: 2500, delivered: 2450, read: 1960, replied: 490 },
  { date: 'Thu', sent: 3800, delivered: 3724, read: 2979, replied: 745 },
  { date: 'Fri', sent: 3000, delivered: 2940, read: 2352, replied: 588 },
  { date: 'Sat', sent: 1500, delivered: 1470, read: 1176, replied: 294 },
  { date: 'Sun', sent: 1200, delivered: 1176, read: 941, replied: 235 },
]

export default function WhatsAppMarketingPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const totalSent = whatsappCampaigns.reduce((acc, c) => acc + c.sent, 0)
  const totalDelivered = whatsappCampaigns.reduce((acc, c) => acc + c.delivered, 0)
  const totalOpened = whatsappCampaigns.reduce((acc, c) => acc + c.opened, 0)
  const totalClicked = whatsappCampaigns.reduce((acc, c) => acc + c.clicked, 0)

  const deliveryRate = totalSent > 0 ? ((totalDelivered / totalSent) * 100).toFixed(1) : '0'
  const readRate = totalDelivered > 0 ? ((totalOpened / totalDelivered) * 100).toFixed(1) : '0'

  const filteredCampaigns = whatsappCampaigns.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const approvedTemplates = whatsappTemplates.filter(t => t.status === 'approved').length
  const pendingTemplates = whatsappTemplates.filter(t => t.status === 'pending').length

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">WhatsApp Marketing</h1>
            <p className="text-muted-foreground">Manage your WhatsApp Business campaigns</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New WhatsApp Campaign
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Sent"
            value={totalSent.toLocaleString('en-US')}
            change={15.3}
            trend="up"
            icon={Send}
          />
          <KPICard
            title="Delivered"
            value={totalDelivered.toLocaleString('en-US')}
            change={14.8}
            trend="up"
            icon={CheckCircle}
          />
          <KPICard
            title="Read Rate"
            value={`${readRate}%`}
            change={3.2}
            trend="up"
            icon={Smartphone}
          />
          <KPICard
            title="Reply Rate"
            value="18.5%"
            change={2.1}
            trend="up"
            icon={BarChart3}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>WhatsApp Performance (Last 7 Days)</CardTitle>
              <CardDescription>Track message delivery, reads, and replies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={whatsappPerformance}>
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
                    <Area type="monotone" dataKey="delivered" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Delivered" />
                    <Area type="monotone" dataKey="read" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Read" />
                    <Area type="monotone" dataKey="replied" stackId="3" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} name="Replied" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Status</CardTitle>
              <CardDescription>WhatsApp template approvals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-medium">Approved</p>
                    <p className="text-xs text-muted-foreground">Ready to use</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">{approvedTemplates}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium">Pending</p>
                    <p className="text-xs text-muted-foreground">Awaiting approval</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">{pendingTemplates}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium">Rejected</p>
                    <p className="text-xs text-muted-foreground">Need revision</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">{whatsappTemplates.length - approvedTemplates - pendingTemplates}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>WhatsApp Campaigns</CardTitle>
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
                  <TableHead>Read Rate</TableHead>
                  <TableHead>Replies</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.slice(0, 10).map((campaign) => {
                  const readRate = campaign.delivered > 0 ? ((campaign.opened / campaign.delivered) * 100) : 0
                  
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
                          <Progress value={readRate} className="w-16 h-2" />
                          <span className="text-sm">{readRate.toFixed(1)}%</span>
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
