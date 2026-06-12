'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminEmailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Marketing Management</h1>
        <p className="text-muted-foreground mt-2">Configure and manage email marketing settings for the platform</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>Manage email templates and configurations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Email template management coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SMTP Configuration</CardTitle>
            <CardDescription>Configure SMTP servers and email credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">SMTP configuration coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Deliverability</CardTitle>
            <CardDescription>Monitor and manage email deliverability metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Deliverability analytics coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
