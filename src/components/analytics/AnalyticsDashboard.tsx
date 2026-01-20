'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Users, Eye, MousePointerClick, Globe, ArrowUpRight } from 'lucide-react'
import { logout } from '@/app/admin/actions'

interface AnalyticsDashboardProps {
  initialData: {
    dataPoints: { name: string; views: number; visitors: number }[]
    totalViews: number
    totalVisitors: number
    topPages: { name: string; value: number }[]
    topCountries: { name: string; value: number }[]
    topReferrers: { name: string; value: number }[]
  }
  period: '24h' | '7d' | '30d'
}

export default function AnalyticsDashboard({ initialData, period }: AnalyticsDashboardProps) {
  const router = useRouter()

  const handlePeriodChange = (newPeriod: string) => {
    router.push(`/admin?period=${newPeriod}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <div className="flex items-center gap-2">
          <select
            value={period}
            onChange={(e) => handlePeriodChange(e.target.value)}
            className="p-2 border rounded-md bg-white text-sm"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <form action={logout}>
            <button type="submit" className="p-2 text-sm text-red-600 hover:text-red-800 border border-red-200 rounded-md bg-white">
              Logout
            </button>
          </form>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialData.totalViews.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialData.totalVisitors.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Pages</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialData.topPages.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialData.topCountries.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={initialData.dataPoints}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee' }}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar dataKey="views" fill="black" radius={[4, 4, 0, 0]} name="Page Views" />
                <Bar dataKey="visitors" fill="#888888" radius={[4, 4, 0, 0]} name="Unique Visitors" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {initialData.topPages.map((page, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-sm font-medium leading-none truncate max-w-[200px]" title={page.name}>
                      {page.name}
                    </span>
                  </div>
                  <div className="font-bold text-sm">{page.value.toLocaleString()}</div>
                </div>
              ))}
              {initialData.topPages.length === 0 && <div className="text-sm text-gray-500">No data available</div>}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {initialData.topCountries.map((country, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium leading-none">{country.name}</div>
                  </div>
                  <div className="font-bold text-sm">{country.value.toLocaleString()}</div>
                </div>
              ))}
              {initialData.topCountries.length === 0 && <div className="text-sm text-gray-500">No data available</div>}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {initialData.topReferrers.map((ref, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium leading-none truncate max-w-[150px]" title={ref.name}>{ref.name}</div>
                  </div>
                  <div className="font-bold text-sm">{ref.value.toLocaleString()}</div>
                </div>
              ))}
              {initialData.topReferrers.length === 0 && <div className="text-sm text-gray-500">No data available</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
