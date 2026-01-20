'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface Subscriber {
  email: string;
  timestamp: number;
  date: string;
  country?: string;
  city?: string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface AnalyticsData {
  overview: {
    views: number;
    visitors: number;
  };
  data: {
    chart?: { date: string; views: number; visitors: number; subscribers?: number }[];
    pages: { name: string; value: number }[];
    countries: { name: string; value: number }[];
    cities: { name: string; value: number }[];
    referrers: { name: string; value: number }[];
    topVisitors?: {
      id: string;
      value: number;
      email: string | null;
      ip: string | null;
      country?: string | null;
      city?: string | null;
      referrer?: string | null;
      lastSeen?: string;
    }[];
    recentVisitors?: {
      id: string;
      ip?: string;
      country?: string;
      city?: string;
      referrer?: string | null;
      userAgent?: string;
      lastSeen: string;
      email?: string;
    }[];
    pagination?: PaginationMeta;
  };
}

const getCountryName = (code: string) => {
  try {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(code) || code;
  } catch {
    return code;
  }
};

export default function AdminDashboard() {
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subPagination, setSubPagination] = useState<PaginationMeta | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [activeTab, setActiveTab] = useState('analytics');
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState('7');
  const [subscribersTimeRange, setSubscribersTimeRange] = useState('all');
  const [subPage, setSubPage] = useState(1);
  const [visitorPage, setVisitorPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null);
  const [countryPage, setCountryPage] = useState(1);
  const [cityPage, setCityPage] = useState(1);
  const [pagesPage, setPagesPage] = useState(1);
  const [referrersPage, setReferrersPage] = useState(1);
  const [visitorsPage, setVisitorsPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [subSearchTerm] = useState('');
  const [debouncedSubSearch, setDebouncedSubSearch] = useState('');
  const [referrersLimit, setReferrersLimit] = useState(14);

  const loadData = async (visP = visitorPage) => {
    setLoading(true);
    setError('');

    try {
      // Build date range
      let analyticsFrom, analyticsTo;
      const now = new Date();

      const getDateStr = (date: Date) => {
        return date.toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
      };

      const pstToday = getDateStr(now);
      let granularity = 'day';

      if (analyticsTimeRange === 'all') {
        analyticsFrom = 'all';
        analyticsTo = pstToday;
      } else if (analyticsTimeRange === '0') {
        analyticsFrom = pstToday;
        analyticsTo = pstToday;
        granularity = 'hour';
      } else {
        const start = new Date(now);
        start.setDate(start.getDate() - parseInt(analyticsTimeRange));
        analyticsFrom = getDateStr(start);
        analyticsTo = pstToday;
      }

      const headers = { 'Cache-Control': 'no-store' };
      let analyticsUrl = `/api/analytics?from=${analyticsFrom}&to=${analyticsTo}&visitorPage=${visP}&visitorLimit=15&timeZone=America/Los_Angeles&granularity=${granularity}${selectedCountry ? `&country=${encodeURIComponent(selectedCountry)}` : ''}`;

      if (selectedVisitor) {
        analyticsUrl += `&visitorId=${encodeURIComponent(selectedVisitor)}`;
      } else if (debouncedSearch) {
        analyticsUrl += `&search=${encodeURIComponent(debouncedSearch)}`;
      }

      const subPromise = Promise.resolve({
        subscribers: [],
        pagination: { page: 1, limit: 15, total: 0, totalPages: 0 }
      });

      const [subData, analyticsRes] = await Promise.all([
        subPromise,
        fetch(analyticsUrl, { headers, cache: 'no-store', credentials: 'include' })
      ]);

      let analyticsData;
      if (analyticsRes.ok) {
        analyticsData = await analyticsRes.json();
      } else {
        if (analyticsRes.status === 401) {
          // Not authenticated, redirect to login
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to fetch analytics');
      }

      setSubscribers(subData.subscribers);
      setSubPagination(subData.pagination);
      setAnalytics(analyticsData);

    } catch (e: unknown) {
      setError((e as Error).message || 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh when timeRange or pages change
  useEffect(() => {
    loadData(visitorPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analyticsTimeRange, subscribersTimeRange, subPage, visitorPage, selectedCountry, selectedVisitor, debouncedSearch, debouncedSubSearch]);

  // Search Debounce (Visitors)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setVisitorPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Search Debounce (Subscribers)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSubSearch(subSearchTerm);
      setSubPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [subSearchTerm]);

  // Handle Resize for Referrers Limit
  useEffect(() => {
    const handleResize = () => {
      setReferrersLimit(window.innerWidth >= 768 ? 14 : 7);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const PaginationControls = ({ meta, onPageChange }: { meta: PaginationMeta, onPageChange: (p: number) => void }) => {
    if (!meta || meta.totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const { page, totalPages } = meta;

      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        if (page > 3) pages.push('...');

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
          if (i > 1 && i < totalPages) pages.push(i);
        }

        if (page < totalPages - 2) pages.push('...');
        if (totalPages > 1) pages.push(totalPages);
      }
      return pages;
    };

    const pages = getPageNumbers();

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-t border-gray-800">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => onPageChange(Math.max(1, meta.page - 1))}
            disabled={meta.page === 1}
            className="relative inline-flex items-center rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-400 self-center">
            {meta.page} / {meta.totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(meta.totalPages, meta.page + 1))}
            disabled={meta.page === meta.totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-400">
              Showing <span className="font-medium">{(meta.page - 1) * meta.limit + 1}</span> to <span className="font-medium">{Math.min(meta.page * meta.limit, meta.total)}</span> of <span className="font-medium">{meta.total}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => onPageChange(Math.max(1, meta.page - 1))}
                disabled={meta.page === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <span className="h-5 w-5" aria-hidden="true">&lsaquo;</span>
              </button>

              {pages.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof p === 'number' ? onPageChange(p) : null}
                  disabled={typeof p !== 'number'}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${p === meta.page
                    ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-default'
                    : 'text-gray-300 ring-1 ring-inset ring-gray-700 hover:bg-gray-800 focus:outline-offset-0 cursor-pointer'
                    } ${typeof p !== 'number' ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => onPageChange(Math.min(meta.totalPages, meta.page + 1))}
                disabled={meta.page === meta.totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <span className="h-5 w-5" aria-hidden="true">&rsaquo;</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              {activeTab === 'subscribers'
                ? `Total Subscribers: ${subPagination?.total || subscribers.length}`
                : `Views${analyticsTimeRange === 'all' ? ' (All Time)' : analyticsTimeRange === '0' ? '' : ` (Last ${analyticsTimeRange} Days)`}: ${analytics?.overview?.views || 0}`}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-2 mb-6 gap-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === 'analytics'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-400 hover:text-white'
                }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === 'subscribers'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-400 hover:text-white'
                }`}
            >
              Subscribers
            </button>
          </div>

          <select
            value={activeTab === 'analytics' ? analyticsTimeRange : subscribersTimeRange}
            onChange={(e) => {
              if (activeTab === 'analytics') setAnalyticsTimeRange(e.target.value);
              else setSubscribersTimeRange(e.target.value);
            }}
            className="bg-gray-900 border border-gray-700 text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block p-2"
          >
            <option value="0">Today</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-500 rounded text-red-400">
            {error}
          </div>
        )}

        {activeTab === 'subscribers' ? (
          <div className="bg-gray-900 shadow overflow-hidden sm:rounded-md border border-gray-800 flex flex-col">
            <div className="p-8 text-center text-gray-500">
              Subscribers feature disabled
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <p className="text-sm text-gray-400">Total Views</p>
                <p className="text-2xl font-bold text-white">{analytics?.overview?.views || 0}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <p className="text-sm text-gray-400">Unique Visitors</p>
                <p className="text-2xl font-bold text-indigo-400">{analytics?.overview?.visitors || 0}</p>
              </div>
            </div>

            {/* Traffic Chart - Simplified for brevity, you can add the full chart implementation */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <h3 className="text-sm font-medium text-white mb-4">Traffic Overview</h3>
              {analytics?.data?.chart && analytics.data.chart.length > 0 ? (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics.data.chart}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip />
                      <Area type="monotone" dataKey="views" stroke="#818cf8" fill="#818cf8" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="visitors" stroke="#34d399" fill="#34d399" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-72 flex items-center justify-center text-gray-500">
                  No chart data available
                </div>
              )}
            </div>

            {/* Add more sections as needed */}
          </div>
        )}
      </div>
    </div>
  );
}
