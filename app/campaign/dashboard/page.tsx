'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  Download,
  Eye,
  FileDown,
  Mail,
  MessageSquare,
  MousePointerClick,
  Plus,
  Reply,
  Send,
  Smartphone,
  Target,
  UserCheck,
  UserMinus,
  Users,
  XCircle,
} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
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
  campaignCoverageCards,
  campaignCoverageKpis,
  campaignDeliveryFields,
  databaseRequirements,
  multiChannelCoverage,
  propertyLaunchCampaign,
  recipientLists,
  recipientStatusBreakdown,
  smartAudienceInsights,
  CampaignCoverageChannel,
  CampaignDetail,
  CampaignRecipientRow,
  CampaignRecipientStatus,
} from '@/lib/data/campaign-coverage'
import { cn } from '@/lib/utils'

const channelIcon: Record<CampaignCoverageChannel, React.ElementType> = {
  email: Mail,
  whatsapp: Smartphone,
  sms: MessageSquare,
}

const channelColor: Record<CampaignCoverageChannel, string> = {
  email: 'text-emerald-600',
  whatsapp: 'text-cyan-600',
  sms: 'text-blue-600',
}

const statusBadgeClasses: Record<CampaignRecipientStatus, string> = {
  Sent: 'border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300',
  'Not Sent': 'border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300',
  Failed: 'border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300',
  Opened: 'border-cyan-200 bg-cyan-100 text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-300',
  Converted: 'border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
  Unsubscribed: 'border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300',
}

function formatNumber(value: number) {
  return value.toLocaleString('en-US')
}

function formatPercent(value: number) {
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`
}

function StatusBadge({ status }: { status: CampaignRecipientStatus }) {
  return (
    <Badge variant="outline" className={cn('whitespace-nowrap', statusBadgeClasses[status])}>
      {status}
    </Badge>
  )
}

function ChannelMetric({
  icon: Icon,
  label,
  value,
  total,
}: {
  icon: React.ElementType
  label: string
  value: number
  total: number
}) {
  const percentage = total > 0 ? (value / total) * 100 : 0

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </div>
        <span className="font-medium tabular-nums">{formatNumber(value)}</span>
      </div>
      <Progress value={percentage} className="h-1.5" />
    </div>
  )
}

function MultiChannelCoverageCard({ channel }: { channel: (typeof multiChannelCoverage)[number] }) {
  const Icon = channelIcon[channel.channel]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={cn('rounded-md bg-muted p-2', channelColor[channel.channel])}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{channel.label} Coverage</CardTitle>
              <CardDescription>Target Audience: {formatNumber(channel.targetAudience)}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary">{formatPercent(channel.coverage)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ChannelMetric icon={Send} label="Sent" value={channel.sent} total={campaignCoverageKpis.totalDatabaseLeads} />
        <ChannelMetric icon={CheckCircle2} label="Delivered" value={channel.delivered} total={channel.sent} />
        {channel.opened !== undefined && (
          <ChannelMetric icon={Eye} label="Opened" value={channel.opened} total={channel.delivered} />
        )}
        {channel.clicked !== undefined && (
          <ChannelMetric icon={MousePointerClick} label="Clicked" value={channel.clicked} total={channel.delivered} />
        )}
        {channel.read !== undefined && (
          <ChannelMetric icon={Eye} label="Read" value={channel.read} total={channel.delivered} />
        )}
        {channel.replies !== undefined && (
          <ChannelMetric icon={Reply} label="Replies" value={channel.replies} total={channel.delivered} />
        )}
        {channel.failed !== undefined && (
          <ChannelMetric icon={XCircle} label="Failed" value={channel.failed} total={channel.sent} />
        )}
      </CardContent>
    </Card>
  )
}

function RecipientTable({ rows }: { rows: CampaignRecipientRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lead Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Campaign</TableHead>
          <TableHead>Last Contact Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((recipient) => (
          <TableRow key={recipient.leadId}>
            <TableCell>
              <div>
                <p className="font-medium">{recipient.leadName}</p>
                <p className="text-xs text-muted-foreground">{recipient.leadId}</p>
              </div>
            </TableCell>
            <TableCell>{recipient.email}</TableCell>
            <TableCell>{recipient.phone}</TableCell>
            <TableCell>{recipient.source}</TableCell>
            <TableCell><StatusBadge status={recipient.status} /></TableCell>
            <TableCell>{recipient.lastCampaign}</TableCell>
            <TableCell>{recipient.lastContactDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function CampaignDetailPanel({ campaign }: { campaign: CampaignDetail }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <CardTitle>{campaign.name}</CardTitle>
            <CardDescription>{campaign.type} created by {campaign.createdBy} on {campaign.createdDate}</CardDescription>
          </div>
          <Badge variant="secondary">{formatPercent(campaign.coverage)} coverage</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-md border p-3">
            <p className="text-sm text-muted-foreground">Audience Size</p>
            <p className="text-2xl font-bold">{formatNumber(campaign.audienceSize)}</p>
          </div>
          <div className="rounded-md border p-3">
            <p className="text-sm text-muted-foreground">Delivery Rate</p>
            <p className="text-2xl font-bold">{formatPercent(campaign.performance.deliveredRate)}</p>
          </div>
          <div className="rounded-md border p-3">
            <p className="text-sm text-muted-foreground">Open Rate</p>
            <p className="text-2xl font-bold">{formatPercent(campaign.performance.openRate)}</p>
          </div>
          <div className="rounded-md border p-3">
            <p className="text-sm text-muted-foreground">Conversion Rate</p>
            <p className="text-2xl font-bold">{formatPercent(campaign.performance.conversionRate)}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-sm text-muted-foreground">Total Selected</p>
            <p className="text-xl font-bold">{formatNumber(campaignCoverageKpis.campaignAudience)}</p>
          </div>
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-sm text-muted-foreground">Successfully Contacted</p>
            <p className="text-xl font-bold text-green-600">{formatNumber(campaignCoverageKpis.successfullyContacted)}</p>
          </div>
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-sm text-muted-foreground">Failed</p>
            <p className="text-xl font-bold text-red-600">{formatNumber(campaignCoverageKpis.failedDeliveries)}</p>
          </div>
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="text-xl font-bold">{formatNumber(campaignCoverageKpis.remainingUncontacted)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline">View Sent List</Button>
          <Button variant="outline">View Not Sent List</Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export Sent List
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export Not Sent List
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export Failed List
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CampaignDashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignDetail>(propertyLaunchCampaign)

  return (
    <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campaign Coverage & Recipient Tracking</h1>
            <p className="text-muted-foreground">
              Track exactly which leads received campaigns, which failed, and which remain untouched.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Coverage
            </Button>
            <Button>
              <Target className="mr-2 h-4 w-4" />
              Target Never Contacted
            </Button>
            <Link href="/campaign/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <KPICard title="Total Database Leads" value={formatNumber(campaignCoverageKpis.totalDatabaseLeads)} icon={Database} />
          <KPICard title="Campaign Audience" value={formatNumber(campaignCoverageKpis.campaignAudience)} icon={Users} iconColor="text-blue-600" />
          <KPICard title="Successfully Contacted" value={formatNumber(campaignCoverageKpis.successfullyContacted)} icon={UserCheck} iconColor="text-green-600" />
          <KPICard title="Failed Deliveries" value={formatNumber(campaignCoverageKpis.failedDeliveries)} icon={XCircle} iconColor="text-red-600" />
          <KPICard title="Remaining Uncontacted" value={formatNumber(campaignCoverageKpis.remainingUncontacted)} icon={UserMinus} iconColor="text-slate-600" />
          <KPICard title="Coverage Percentage" value={formatPercent(campaignCoverageKpis.coveragePercentage)} icon={Target} iconColor="text-cyan-600" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Database Coverage</CardTitle>
              <CardDescription>
                Successfully Contacted / Total Database Leads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={campaignCoverageKpis.coveragePercentage} className="h-4 [&_[data-slot=progress-indicator]]:bg-emerald-500" />
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-bold">{formatPercent(campaignCoverageKpis.coveragePercentage)}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(campaignCoverageKpis.successfullyContacted)} of {formatNumber(campaignCoverageKpis.totalDatabaseLeads)} Leads Contacted
                  </p>
                </div>
                <Badge variant="secondary">{formatNumber(campaignCoverageKpis.audienceNotSelected)} not in selected audience</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Remaining Leads</CardTitle>
              <CardDescription>Total database leads not successfully contacted</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={72} className="h-4 [&_[data-slot=progress-indicator]]:bg-slate-500" />
              <div>
                <p className="text-4xl font-bold">72%</p>
                <p className="text-sm text-muted-foreground">
                  {formatNumber(campaignCoverageKpis.leadsNotSuccessfullyContacted)} Leads Not Contacted
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {multiChannelCoverage.map((channel) => (
            <MultiChannelCoverageCard key={channel.channel} channel={channel} />
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recipient Status Breakdown</CardTitle>
            <CardDescription>Database-wide recipient state for this campaign launch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recipientStatusBreakdown.map((item) => (
                <div key={item.label} className="rounded-md border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: item.color }} />
                      <p className="font-medium">{item.label}</p>
                    </div>
                    <Badge variant="outline">{formatPercent((item.count / campaignCoverageKpis.totalDatabaseLeads) * 100)}</Badge>
                  </div>
                  <p className="mt-3 text-2xl font-bold">{formatNumber(item.count)}</p>
                  <Progress value={(item.count / campaignCoverageKpis.totalDatabaseLeads) * 100} className="mt-3 h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recipient List Management</CardTitle>
            <CardDescription>Audit every recipient by delivery and engagement status</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sent">
              <TabsList className="h-auto flex-wrap justify-start">
                <TabsTrigger value="sent">Sent Recipients</TabsTrigger>
                <TabsTrigger value="not-sent">Not Sent Recipients</TabsTrigger>
                <TabsTrigger value="failed">Failed Recipients</TabsTrigger>
                <TabsTrigger value="opened">Opened Recipients</TabsTrigger>
                <TabsTrigger value="converted">Converted Recipients</TabsTrigger>
              </TabsList>
              <TabsContent value="sent">
                <RecipientTable rows={recipientLists.sent} />
              </TabsContent>
              <TabsContent value="not-sent">
                <RecipientTable rows={recipientLists.notSent} />
              </TabsContent>
              <TabsContent value="failed">
                <RecipientTable rows={recipientLists.failed} />
              </TabsContent>
              <TabsContent value="opened">
                <RecipientTable rows={recipientLists.opened} />
              </TabsContent>
              <TabsContent value="converted">
                <RecipientTable rows={recipientLists.converted} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Campaigns</CardTitle>
              <CardDescription>Click a campaign to inspect coverage details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {campaignCoverageCards.map((campaign) => (
                <button
                  key={campaign.id}
                  type="button"
                  onClick={() => setSelectedCampaign(campaign)}
                  className={cn(
                    'w-full rounded-md border p-4 text-left transition-colors hover:bg-muted/50',
                    selectedCampaign.id === campaign.id && 'border-primary bg-muted/40',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{campaign.name}</p>
                    <Badge variant="secondary">{formatPercent(campaign.coverage)}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{campaign.type}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Audience {formatNumber(campaign.audienceSize)} leads
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="xl:col-span-2">
            <CampaignDetailPanel campaign={selectedCampaign} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Smart Audience Insights</CardTitle>
              <CardDescription>Pre-send recommendations based on prior contact history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-md border p-4">
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold">{formatNumber(smartAudienceInsights.totalLeads)}</p>
                </div>
                <div className="rounded-md border p-4">
                  <p className="text-sm text-muted-foreground">Already Contacted</p>
                  <p className="text-2xl font-bold text-blue-600">{formatNumber(smartAudienceInsights.alreadyContacted)}</p>
                </div>
                <div className="rounded-md border p-4">
                  <p className="text-sm text-muted-foreground">Never Contacted</p>
                  <p className="text-2xl font-bold text-green-600">{formatNumber(smartAudienceInsights.neverContacted)}</p>
                </div>
              </div>

              <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{smartAudienceInsights.recommendation}</AlertTitle>
                <AlertDescription>{smartAudienceInsights.warning}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Requirements</CardTitle>
              <CardDescription>Recipient coverage storage model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {databaseRequirements.map((table) => (
                  <div key={table} className="rounded-md border px-3 py-2 text-sm font-medium">
                    {table}
                  </div>
                ))}
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Stored delivery fields</p>
                <div className="flex flex-wrap gap-2">
                  {campaignDeliveryFields.map((field) => (
                    <Badge key={field} variant="outline">{field}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
