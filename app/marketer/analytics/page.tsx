'use client'

import { TrendingUp, TrendingDown, Mail, MessageSquare, Smartphone, Users, DollarSign, Target } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { KPICard } from '@/components/shared/kpi-card'
import { campaigns } from '@/lib/data/campaigns'
import { analyticsRecords } from '@/lib/data/analytics'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts'

const last30DaysAnalytics = analyticsRecords.slice(0, 30).reverse()

const channelData = [
  { name: 'Email', value: 45, color: '#10B981' },
  { name: 'SMS', value: 25, color: '#3B82F6' },
  { name: 'WhatsApp', value: 20, color: '#8B5CF6' },
  { name: 'Push', value: 10, color: '#F59E0B' },
]

const conversionData = last30DaysAnalytics.map(d => ({
  date: d.date.split('-').slice(1).join('/'),
  conversions: d.conversions,
  revenue: d.revenue / 1000
}))

const campaignPerformance = [
  { name: 'Summer Sale', sent: 45000, opened: 15750, clicked: 4500, converted: 1350 },
  { name: 'Product Launch', sent: 38000, opened: 14440, clicked: 4180, converted: 1140 },
  { name: 'Flash Sale', sent: 52000, opened: 20800, clicked: 6240, converted: 1872 },
  { name: 'Newsletter', sent: 65000, opened: 19500, clicked: 3900, converted: 780 },
  { name: 'Re-engagement', sent: 28000, opened: 7000, clicked: 1680, converted: 420 },
]

export default function MarketerAnalyticsPage() {
  const totalRevenue = analyticsRecords.reduce((acc, r) => acc + r.revenue, 0)
  const totalConversions = analyticsRecords.reduce((acc, r) => acc + r.conversions, 0)
  const avgConversionRate = (analyticsRecords.reduce((acc, r) => acc + r.conversionRate, 0) / analyticsRecords.length).toFixed(1)
  const totalCampaigns = campaigns.length

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
          <p className="text-muted-foreground">Track your marketing performance and ROI</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Revenue"
            value={`$${(totalRevenue / 1000000).toFixed(1)}M`}
            change={18.5}
            trend="up"
            icon={DollarSign}
          />
          <KPICard
            title="Conversions"
            value={totalConversions.toLocaleString('en-US')}
            change={12.3}
            trend="up"
            icon={Target}
          />
          <KPICard
            title="Avg Conv. Rate"
            value={`${avgConversionRate}%`}
            change={2.1}
            trend="up"
            icon={TrendingUp}
          />
          <KPICard
            title="Active Campaigns"
            value={campaigns.filter(c => c.status === 'running').length}
            change={3}
            trend="up"
            icon={Mail}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Conversions & Revenue Trend</CardTitle>
              <CardDescription>Last 30 days performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis yAxisId="left" className="text-xs" />
                    <YAxis yAxisId="right" orientation="right" className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} name="Conversions" />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue ($K)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Channel Distribution</CardTitle>
              <CardDescription>Messages sent by channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Funnel metrics by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sent" fill="#E5E7EB" name="Sent" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="opened" fill="#10B981" name="Opened" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="clicked" fill="#3B82F6" name="Clicked" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="converted" fill="#8B5CF6" name="Converted" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
