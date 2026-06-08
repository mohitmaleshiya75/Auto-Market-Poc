'use client'

import { useState } from 'react'
import { Plus, Search, Filter, MoreHorizontal, Play, Pause, Mail, MessageSquare, Smartphone, Bell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { campaigns } from '@/lib/data/campaigns'
import { StatCard } from '@/components/shared/stat-card'

const statusColors: Record<string, string> = {
  'draft': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  'scheduled': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  'running': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  'paused': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  'completed': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  'archived': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
}

const typeIcons: Record<string, React.ElementType> = {
  'email': Mail,
  'sms': MessageSquare,
  'whatsapp': Smartphone,
  'push': Bell,
}

export default function MarketerCampaignsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: campaigns.length,
    active: campaigns.filter(c => c.status === 'running').length,
    scheduled: campaigns.filter(c => c.status === 'scheduled').length,
    completed: campaigns.filter(c => c.status === 'completed').length,
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
            <p className="text-muted-foreground">Manage your marketing campaigns</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total Campaigns" value={stats.total} icon={Mail} />
          <StatCard title="Active" value={stats.active} icon={Play} />
          <StatCard title="Scheduled" value={stats.scheduled} icon={Bell} />
          <StatCard title="Completed" value={stats.completed} icon={Mail} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CardTitle>All Campaigns</CardTitle>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="push">Push</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Open Rate</TableHead>
                  <TableHead>Click Rate</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.slice(0, 15).map((campaign) => {
                  const TypeIcon = typeIcons[campaign.type] || Mail
                  const openRate = campaign.delivered > 0 ? ((campaign.opened / campaign.delivered) * 100).toFixed(1) : '0'
                  const clickRate = campaign.opened > 0 ? ((campaign.clicked / campaign.opened) * 100).toFixed(1) : '0'
                  
                  return (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-sm text-muted-foreground">{campaign.createdAt}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">{campaign.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[campaign.status]}>{campaign.status}</Badge>
                      </TableCell>
                      <TableCell>{campaign.audience}</TableCell>
                      <TableCell>{campaign.sent.toLocaleString('en-US')}</TableCell>
                      <TableCell>{openRate}%</TableCell>
                      <TableCell>{clickRate}%</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {campaign.status === 'running' ? (
                              <DropdownMenuItem>Pause Campaign</DropdownMenuItem>
                            ) : campaign.status === 'paused' ? (
                              <DropdownMenuItem>Resume Campaign</DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
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
