'use client'

import { useState } from 'react'
import { Plus, Mail, Send, Clock, Archive, Trash2, Settings, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { KPICard } from '@/components/shared/kpi-card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const emailCampaigns = [
  {
    id: 'EMAIL-001',
    name: 'Welcome Series - Part 1',
    subject: 'Welcome to AutoMarket!',
    status: 'sent',
    audienceSize: 5420,
    sent: 5420,
    delivered: 5410,
    opened: 2156,
    clicked: 648,
    converted: 162,
    createdAt: '2026-06-10',
    createdBy: 'Sarah Johnson',
    openRate: 39.8,
    clickRate: 12.0,
  },
  {
    id: 'EMAIL-002',
    name: 'Product Launch Announcement',
    subject: 'Introducing AutoMarket Pro 2.0',
    status: 'sent',
    audienceSize: 12840,
    sent: 12840,
    delivered: 12789,
    opened: 5373,
    clicked: 1614,
    converted: 402,
    createdAt: '2026-06-08',
    createdBy: 'Michael Chen',
    openRate: 41.8,
    clickRate: 12.6,
  },
  {
    id: 'EMAIL-003',
    name: 'Spring Sale - 40% Off',
    subject: 'Limited Time: Save 40% on All Plans',
    status: 'running',
    audienceSize: 8900,
    sent: 8900,
    delivered: 8834,
    opened: 3176,
    clicked: 667,
    converted: 134,
    createdAt: '2026-06-05',
    createdBy: 'Emily Rodriguez',
    openRate: 35.9,
    clickRate: 7.5,
  },
  {
    id: 'EMAIL-004',
    name: 'Webinar Invitation',
    subject: 'Join Our Free Webinar: Email Marketing Mastery',
    status: 'scheduled',
    audienceSize: 3400,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    createdAt: '2026-06-11',
    createdBy: 'David Kim',
    openRate: 0,
    clickRate: 0,
  },
  {
    id: 'EMAIL-005',
    name: 'Abandoned Cart - Reminder 1',
    subject: 'You left something behind...',
    status: 'running',
    audienceSize: 2150,
    sent: 2150,
    delivered: 2145,
    opened: 1037,
    clicked: 414,
    converted: 83,
    createdAt: '2026-06-07',
    createdBy: 'Sarah Johnson',
    openRate: 48.2,
    clickRate: 19.3,
  },
]

const templates = [
  {
    id: 'TMPL-001',
    name: 'Welcome Email',
    category: 'Onboarding',
    usageCount: 12,
    lastUsed: '2026-06-10',
  },
  {
    id: 'TMPL-002',
    name: 'Newsletter',
    category: 'Marketing',
    usageCount: 45,
    lastUsed: '2026-06-11',
  },
  {
    id: 'TMPL-003',
    name: 'Promotional',
    category: 'Sales',
    usageCount: 23,
    lastUsed: '2026-06-09',
  },
  {
    id: 'TMPL-004',
    name: 'Product Update',
    category: 'Product',
    usageCount: 8,
    lastUsed: '2026-06-06',
  },
]

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    sent: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    running: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    scheduled: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    paused: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }
  return (
    <Badge className={colors[status] || colors.draft} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export default function EmailMarketingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState('campaigns')

  const totalSent = emailCampaigns.reduce((sum, c) => sum + c.sent, 0)
  const totalOpened = emailCampaigns.reduce((sum, c) => sum + c.opened, 0)
  const totalClicked = emailCampaigns.reduce((sum, c) => sum + c.clicked, 0)
  const avgOpenRate = (totalOpened / totalSent * 100) || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Marketing</h1>
          <p className="text-muted-foreground">Create, manage, and track email campaigns</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Email Campaign
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Emails Sent"
          value={totalSent.toLocaleString()}
          change={24.5}
          changeType="increase"
          icon={Send}
        />
        <KPICard
          title="Total Opened"
          value={totalOpened.toLocaleString()}
          change={18.2}
          changeType="increase"
          icon={Mail}
        />
        <KPICard
          title="Avg Open Rate"
          value={`${avgOpenRate.toFixed(1)}%`}
          change={3.2}
          changeType="increase"
          icon={Clock}
        />
        <KPICard
          title="Total Clicked"
          value={totalClicked.toLocaleString()}
          change={12.8}
          changeType="increase"
          icon={Mail}
        />
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>Email Campaigns</CardTitle>
                  <CardDescription>View and manage all email campaigns</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search campaigns..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Opened</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>{campaign.subject}</TableCell>
                      <TableCell>
                        <StatusBadge status={campaign.status} />
                      </TableCell>
                      <TableCell>{campaign.audienceSize.toLocaleString()}</TableCell>
                      <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                      <TableCell>{campaign.opened.toLocaleString()}</TableCell>
                      <TableCell>{campaign.openRate.toFixed(1)}%</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              ⋮
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>View Analytics</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Manage reusable email templates</CardDescription>
                </div>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {templates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:bg-accent transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription>{template.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Used {template.usageCount} times</span>
                        <span className="text-xs text-muted-foreground">Last: {template.lastUsed}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Use
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Automation Rules</CardTitle>
              <CardDescription>Set up automated email triggers and workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <Zap className="h-12 w-12 text-muted-foreground" />
                <div className="text-center">
                  <p className="font-medium">No automation rules created yet</p>
                  <p className="text-sm text-muted-foreground">Create automated email workflows to engage your audience</p>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Automation Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Import missing icon
import { Zap } from 'lucide-react'
