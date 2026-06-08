'use client'

import { useState } from 'react'
import { Plus, Search, Mail, MessageSquare, Smartphone, Eye, Edit2, Copy, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { emailTemplates, smsTemplates, whatsappTemplates } from '@/lib/data/templates'

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEmailTemplates = emailTemplates.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredSmsTemplates = smsTemplates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredWhatsappTemplates = whatsappTemplates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
            <p className="text-muted-foreground">Manage your email, SMS, and WhatsApp templates</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Email Templates</CardTitle>
              <Mail className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{emailTemplates.length}</p>
              <p className="text-xs text-muted-foreground">Active templates</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">SMS Templates</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{smsTemplates.length}</p>
              <p className="text-xs text-muted-foreground">Active templates</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">WhatsApp Templates</CardTitle>
              <Smartphone className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{whatsappTemplates.length}</p>
              <p className="text-xs text-muted-foreground">Active templates</p>
            </CardContent>
          </Card>
        </div>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Tabs defaultValue="email" className="space-y-6">
          <TabsList>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="sms" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              SMS
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="gap-2">
              <Smartphone className="h-4 w-4" />
              WhatsApp
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEmailTemplates.map((template) => (
                <Card key={template.id} className="group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="mt-1">{template.category}</CardDescription>
                      </div>
                      <Badge variant="secondary">{template.usageCount} uses</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-foreground">{template.subject}</p>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{template.previewText}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{template.updatedAt}</p>
                      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sms">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredSmsTemplates.map((template) => (
                <Card key={template.id} className="group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="mt-1">{template.category}</CardDescription>
                      </div>
                      <Badge variant="secondary">{template.characterCount} chars</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{template.usageCount} uses</p>
                      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="whatsapp">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredWhatsappTemplates.map((template) => (
                <Card key={template.id} className="group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="mt-1">{template.category}</CardDescription>
                      </div>
                      <Badge className={
                        template.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' :
                        template.status === 'pending' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                        'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      }>
                        {template.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{template.usageCount} uses</p>
                      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
  )
}
