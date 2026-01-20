import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAnalyticsData } from '@/lib/analytics'
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')

  if (!token || token.value !== 'true') {
    redirect('/admin/login')
  }

  const resolvedParams = await searchParams
  const period = (resolvedParams.period as '24h' | '7d' | '30d') || '24h'

  const data = await getAnalyticsData(period)

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <AnalyticsDashboard initialData={data} period={period} />
      </div>
    </div>
  )
}
