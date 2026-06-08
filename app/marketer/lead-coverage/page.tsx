'use client'

import {
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
  Database,
  Eye,
  Mail,
  MessageSquare,
  MousePointerClick,
  PieChart as PieChartIcon,
  Reply,
  Send,
  ShieldAlert,
  Smartphone,
  Target,
  UserCheck,
  UserMinus,
  Users,
  XCircle,
} from 'lucide-react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
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
  audienceSelectionInsight,
  campaignCoverage,
  coverageChannels,
  leadCoverageRows,
  leadCoverageStats,
  leadStatusDistribution,
  LeadCoverageStatus,
} from '@/lib/data/lead-coverage'
import { cn } from '@/lib/utils'

const statusBadgeClasses: Record<LeadCoverageStatus, string> = {
  'Never Contacted': 'border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300',
  Contacted: 'border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300',
  Opened: 'border-cyan-200 bg-cyan-100 text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-300',
  Clicked: 'border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  Converted: 'border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
  Failed: 'border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300',
}

const channelIcon = {
  email: Mail,
  whatsapp: Smartphone,
  sms: MessageSquare,
}

const channelColor = {
  email: 'text-emerald-600',
  whatsapp: 'text-cyan-600',
  sms: 'text-blue-600',
}

function formatNumber(value: number) {
  return value.toLocaleString('en-US')
}

function formatPercent(value: number) {
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`
}

function StatusBadge({ status }: { status: LeadCoverageStatus }) {
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

function ChannelTrackingCard({ channel }: { channel: (typeof coverageChannels)[number] }) {
  const Icon = channelIcon[channel.channel]
  const failed = channel.failed || Math.max(channel.sent - channel.delivered, 0)

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={cn('rounded-md bg-muted p-2', channelColor[channel.channel])}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{channel.label}</CardTitle>
              <CardDescription>Total Eligible = {formatNumber(channel.totalEligible)}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary">{formatPercent((channel.sent / channel.totalEligible) * 100)} sent</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ChannelMetric icon={Send} label="Sent" value={channel.sent} total={channel.totalEligible} />
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
        <ChannelMetric icon={XCircle} label="Failed" value={failed} total={channel.sent} />
      </CardContent>
    </Card>
  )
}

export default function LeadCoverageDashboard() {
  const coverageProgress = leadCoverageStats.coveragePercentage
  const visibleRows = leadCoverageRows.slice(0, 12)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lead Coverage Dashboard</h1>
          <p className="text-muted-foreground">
            Enterprise reporting for contacted, uncontacted, converted, and failed lead coverage.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Database className="mr-2 h-4 w-4" />
            Export Coverage
          </Button>
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Build Uncontacted Audience
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <KPICard title="Total Leads" value={formatNumber(leadCoverageStats.totalLeads)} icon={Users} />
        <KPICard title="Contacted Leads" value={formatNumber(leadCoverageStats.contactedLeads)} icon={UserCheck} iconColor="text-blue-600" />
        <KPICard title="Remaining Leads" value={formatNumber(leadCoverageStats.remainingLeads)} icon={UserMinus} iconColor="text-slate-600" />
        <KPICard title="Coverage Percentage" value={formatPercent(coverageProgress)} icon={PieChartIcon} iconColor="text-cyan-600" />
        <KPICard title="Converted Leads" value={formatNumber(leadCoverageStats.convertedLeads)} icon={CircleDollarSign} iconColor="text-green-600" />
        <KPICard title="Failed Deliveries" value={formatNumber(leadCoverageStats.failedDeliveries)} icon={ShieldAlert} iconColor="text-red-600" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle>Database Coverage</CardTitle>
              <CardDescription>
                Remaining = Total Leads - Contacted Leads. Coverage = Contacted Leads / Total Leads.
              </CardDescription>
            </div>
            <Badge variant="secondary">{formatNumber(leadCoverageStats.contactedLeads)} / {formatNumber(leadCoverageStats.totalLeads)} Leads Contacted</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={coverageProgress} className="h-4 [&_[data-slot=progress-indicator]]:bg-emerald-500" />
          <div className="grid gap-3 text-sm md:grid-cols-4">
            <div className="rounded-md border p-3">
              <p className="text-muted-foreground">Coverage</p>
              <p className="text-2xl font-bold">{formatPercent(coverageProgress)}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-muted-foreground">Email Recipients</p>
              <p className="text-2xl font-bold">{formatNumber(leadCoverageStats.emailRecipients)}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-muted-foreground">WhatsApp Recipients</p>
              <p className="text-2xl font-bold">{formatNumber(leadCoverageStats.whatsappRecipients)}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-muted-foreground">SMS Recipients</p>
              <p className="text-2xl font-bold">{formatNumber(leadCoverageStats.smsRecipients)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        {coverageChannels.map((channel) => (
          <ChannelTrackingCard key={channel.channel} channel={channel} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
            <CardDescription>Primary coverage state across the full database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadStatusDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={62}
                    outerRadius={104}
                    paddingAngle={3}
                  >
                    {leadStatusDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Status Progress</CardTitle>
            <CardDescription>Pie, progress, and cards reconcile to {formatNumber(leadCoverageStats.totalLeads)} total leads</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {leadStatusDistribution.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium tabular-nums">
                    {formatNumber(item.value)} ({formatPercent((item.value / leadCoverageStats.totalLeads) * 100)})
                  </span>
                </div>
                <Progress value={(item.value / leadCoverageStats.totalLeads) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {leadStatusDistribution.map((item) => (
          <Card key={item.name}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: item.color }} />
                <p className="text-sm text-muted-foreground">{item.name}</p>
              </div>
              <p className="mt-2 text-2xl font-bold">{formatNumber(item.value)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Coverage Tracking</CardTitle>
          <CardDescription>Audience coverage and remaining reach by campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Audience Selected</TableHead>
                <TableHead>Successfully Contacted</TableHead>
                <TableHead>Failed</TableHead>
                <TableHead>Skipped</TableHead>
                <TableHead>Remaining Audience</TableHead>
                <TableHead>Coverage Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignCoverage.map((campaign) => {
                const Icon = channelIcon[campaign.channel]

                return (
                  <TableRow key={campaign.campaignId}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={cn('rounded-md bg-muted p-2', channelColor[campaign.channel])}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{campaign.campaignName}</p>
                          <p className="text-xs text-muted-foreground">{campaign.campaignId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatNumber(campaign.audienceSelected)}</TableCell>
                    <TableCell>{formatNumber(campaign.successfullyContacted)}</TableCell>
                    <TableCell className="text-red-600">{formatNumber(campaign.failed)}</TableCell>
                    <TableCell>{formatNumber(campaign.skipped)}</TableCell>
                    <TableCell>{formatNumber(campaign.remainingAudience)}</TableCell>
                    <TableCell className="min-w-[180px]">
                      <div className="flex items-center gap-3">
                        <Progress value={campaign.coveragePercentage} className="h-2" />
                        <span className="w-12 text-right tabular-nums">{formatPercent(campaign.coveragePercentage)}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Audience Selection Intelligence</CardTitle>
            <CardDescription>Pre-launch coverage check before sending a new campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">Total Leads Available</p>
                <p className="text-2xl font-bold">{formatNumber(audienceSelectionInsight.totalLeadsAvailable)}</p>
              </div>
              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">Already Contacted</p>
                <p className="text-2xl font-bold text-blue-600">{formatNumber(audienceSelectionInsight.alreadyContacted)}</p>
              </div>
              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">Never Contacted</p>
                <p className="text-2xl font-bold text-emerald-600">{formatNumber(audienceSelectionInsight.neverContacted)}</p>
              </div>
            </div>

            <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Campaign launch warning</AlertTitle>
              <AlertDescription>{audienceSelectionInsight.warning}</AlertDescription>
            </Alert>

            <div className="rounded-md border p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">{audienceSelectionInsight.suggestion}</p>
                  <p className="text-sm text-muted-foreground">
                    Selected audience includes {formatNumber(audienceSelectionInsight.selectedAlreadyContacted)} previously contacted leads and {formatNumber(audienceSelectionInsight.selectedNeverContacted)} untouched leads.
                  </p>
                </div>
                <Button variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Apply Segment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Design</CardTitle>
            <CardDescription>Coverage entities used by the dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-md border p-3">
              <p className="font-medium">Leads Table</p>
              <p className="text-muted-foreground">lead_id, name, email, phone</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="font-medium">Campaign Recipients Table</p>
              <p className="text-muted-foreground">lead_id, campaign_id, channel, status, sent_at</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="font-medium">Lead Contact History Table</p>
              <p className="text-muted-foreground">lead_id, channel, campaign_id, status, timestamp</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Table</CardTitle>
          <CardDescription>Lead-level coverage, channel status, contact count, and last campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Last Campaign</TableHead>
                <TableHead>Email Status</TableHead>
                <TableHead>WhatsApp Status</TableHead>
                <TableHead>SMS Status</TableHead>
                <TableHead>Contact Count</TableHead>
                <TableHead>Last Contact Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRows.map((lead) => (
                <TableRow key={lead.lead_id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <StatusBadge status={lead.overallStatus} />
                    </div>
                  </TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{lead.lastCampaign}</TableCell>
                  <TableCell><StatusBadge status={lead.emailStatus} /></TableCell>
                  <TableCell><StatusBadge status={lead.whatsappStatus} /></TableCell>
                  <TableCell><StatusBadge status={lead.smsStatus} /></TableCell>
                  <TableCell>{lead.contactCount}</TableCell>
                  <TableCell>{lead.lastContactDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
