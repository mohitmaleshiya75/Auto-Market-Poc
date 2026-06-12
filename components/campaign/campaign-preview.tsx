'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Monitor, Smartphone } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface CampaignPreviewProps {
  subject?: string
  previewText?: string
  content?: string
  campaignType?: 'email' | 'sms' | 'whatsapp' | 'push' | 'multichannel'
}

export function CampaignPreview({
  subject,
  previewText,
  content,
  campaignType = 'email',
}: CampaignPreviewProps) {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="desktop" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="desktop" className="gap-2">
            <Monitor className="h-4 w-4" />
            Desktop
          </TabsTrigger>
          <TabsTrigger value="mobile" className="gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="desktop" className="space-y-4 mt-6">
          <Card className="border-2">
            <CardHeader className="space-y-2 pb-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-muted-foreground">From:</p>
                  <p className="text-sm font-semibold">campaigns@automarket.com</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground">Subject:</p>
                <p className="font-semibold text-base line-clamp-2">
                  {subject || 'No subject line'}
                </p>
              </div>
              {previewText && (
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-muted-foreground">Preview:</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{previewText}</p>
                </div>
              )}
            </CardHeader>
            <div className="border-t" />
            <CardContent className="py-6 space-y-4">
              {content ? (
                <div className="prose dark:prose-invert max-w-none text-sm line-clamp-[20]">
                  {content.split('\n').map((line, i) => (
                    <p key={i} className="text-muted-foreground mb-4">
                      {line || '​'}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No content preview available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="mt-6">
          <Card className="border-2 mx-auto max-w-sm">
            <CardHeader className="space-y-2 pb-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground">From:</p>
                  <p className="text-xs font-semibold truncate">campaigns@automarket.com</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground line-clamp-2">
                  {subject || 'No subject line'}
                </p>
              </div>
              {previewText && (
                <p className="text-xs text-muted-foreground line-clamp-2">{previewText}</p>
              )}
            </CardHeader>
            <div className="border-t" />
            <CardContent className="py-4 space-y-2">
              {content ? (
                <div className="text-xs text-muted-foreground space-y-2 line-clamp-[12]">
                  {content.split('\n').slice(0, 10).map((line, i) => (
                    <p key={i}>
                      {line || '​'}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-6 text-xs">
                  No content
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-medium text-blue-900 dark:text-blue-100">Preview Tips</p>
              <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-xs">
                <li>• Keep subject lines under 50 characters for mobile</li>
                <li>• Use clear, readable fonts and adequate spacing</li>
                <li>• Test with different email clients and devices</li>
                <li>• Include alt text for all images</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
