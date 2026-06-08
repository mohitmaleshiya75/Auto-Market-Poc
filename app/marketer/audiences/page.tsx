'use client'

import { useState } from 'react'
import { Plus, Search, Users, Upload, Download, MoreHorizontal, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { segments } from '@/lib/data/segments'
import { StatCard } from '@/components/shared/stat-card'

export default function AudiencesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSegments = segments.filter(segment =>
    segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalContacts = segments.reduce((acc, s) => acc + s.customerCount, 0)
  const dynamicSegments = segments.filter(s => s.type === 'dynamic').length
  const staticSegments = segments.filter(s => s.type === 'static').length

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Audience Lists</h1>
            <p className="text-muted-foreground">Manage your audience segments and contact lists</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create List
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Total Segments"
            value={segments.length}
            icon={Users}
          />
          <StatCard
            title="Total Contacts"
            value={totalContacts.toLocaleString()}
            icon={Users}
          />
          <StatCard
            title="Dynamic Segments"
            value={dynamicSegments}
            icon={Users}
          />
          <StatCard
            title="Static Lists"
            value={staticSegments}
            icon={Users}
          />
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CardTitle>All Audiences</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search audiences..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
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
                  <TableHead>Audience Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contacts</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSegments.map((segment) => (
                  <TableRow key={segment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{segment.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{segment.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={segment.type === 'dynamic' ? 'default' : segment.type === 'smart' ? 'secondary' : 'outline'}>
                        {segment.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{segment.customerCount.toLocaleString()}</TableCell>
                    <TableCell>{segment.createdBy}</TableCell>
                    <TableCell className="text-muted-foreground">{segment.updatedAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Audience</DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
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
      </div>
  )
}
