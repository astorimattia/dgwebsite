'use client';

import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import MobileHeader from '@/components/MobileHeader';
import Footer from '@/components/Footer';

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

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState('7'); // Default 7 Days
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
  const [referrersLimit, setReferrersLimit] = useState(14); // Default to desktop limit

  // Sorting is default by Date Descending from backend


  // helper to set cookie
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  // helper to get cookie
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const verifyAndLoad = async (pwd: string, visP = visitorPage) => {
    setLoading(true);
    setError('');

    try {
      // Build date range
      // Analytics Dates (based on analyticsTimeRange)
      let analyticsFrom, analyticsTo;
      const now = new Date();

      // Helper to get YYYY-MM-DD in PST
      const getDateStr = (date: Date) => {
        // Using en-CA (YYYY-MM-DD)
        return date.toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
      };

      const pstToday = getDateStr(now);
      let granularity = 'day';

      if (analyticsTimeRange === 'all') {
        analyticsFrom = 'all';
        analyticsTo = pstToday;
      } else if (analyticsTimeRange === '0') {
        // Today (PST)
        analyticsFrom = pstToday;
        analyticsTo = pstToday;
        granularity = 'hour';
      } else {
        // Last N Days
        const start = new Date(now);
        start.setDate(start.getDate() - parseInt(analyticsTimeRange));
        analyticsFrom = getDateStr(start);
        analyticsTo = pstToday;
        // If 24h or similar small range, maybe hour? 
        // User logic defaulted to day unless '0' (Today).
      }

      // Fetch both concurrently
      // Add cache: 'no-store' to prevent stale data
      const headers = { 'Cache-Control': 'no-store' };
      // URL UPDATED: Pointing to /api/analytics
      let analyticsUrl = `/api/analytics?key=${pwd}&from=${analyticsFrom}&to=${analyticsTo}&visitorPage=${visP}&visitorLimit=15&timeZone=America/Los_Angeles&granularity=${granularity}${selectedCountry ? `&country=${encodeURIComponent(selectedCountry)}` : ''}`;

      if (selectedVisitor) {
        analyticsUrl += `&visitorId=${encodeURIComponent(selectedVisitor)}`;
      } else if (debouncedSearch) {
        analyticsUrl += `&search=${encodeURIComponent(debouncedSearch)}`;
      }

      const analyticsRes = await fetch(analyticsUrl, { headers, cache: 'no-store' });

      let analyticsData;
      if (analyticsRes.ok) {
        analyticsData = await analyticsRes.json();
      } else {
        if (analyticsRes.status === 401) throw new Error('Invalid credentials');
        throw new Error('Failed to fetch analytics');
      }


      setAnalytics(analyticsData);
      setIsAuthenticated(true);
      setPassword(pwd); // Sync state
      setCookie('admin_secret', pwd, 30); // Persist login

      // Auto-identify as Admin
      try {
        await fetch('/api/identify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identity: 'Admin' })
        });
      } catch (err) {
        console.error('Failed to identify as admin', err);
      }

    } catch (e: unknown) {
      setError((e as Error).message || 'Failed to connect to server');
      setCookie('admin_secret', '', -1);
    } finally {
      setLoading(false);
    }
  };

  // Initial load: Check URL param or Cookie
  useEffect(() => {
    if (isAuthenticated) return; // Don't run if already logged in

    const params = new URLSearchParams(window.location.search);
    const urlSecret = params.get('secret');
    const cookieSecret = getCookie('admin_secret');

    if (urlSecret) {
      verifyAndLoad(urlSecret);
    } else if (cookieSecret) {
      verifyAndLoad(cookieSecret);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh when timeRange or pages change
  useEffect(() => {
    if (isAuthenticated && password) {
      verifyAndLoad(password, visitorPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analyticsTimeRange, visitorPage, selectedCountry, selectedVisitor, debouncedSearch]);

  // Search Debounce (Visitors)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setVisitorPage(1); // Reset pagination on search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);



  // Handle Resize for Referrers Limit
  useEffect(() => {
    const handleResize = () => {
      setReferrersLimit(window.innerWidth >= 768 ? 14 : 7);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    verifyAndLoad(password);
  };

  const handleLogout = () => {
    setCookie('admin_secret', '', -1);
    window.location.href = '/admin'; // Hard reload to clear state
  };

  const PaginationControls = ({ meta, onPageChange }: { meta: PaginationMeta, onPageChange: (p: number) => void }) => {
    if (!meta || meta.totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const { page, totalPages } = meta;

      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        // Always include 1
        pages.push(1);

        if (page > 3) pages.push('...');

        // Neighbors
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
          if (i > 1 && i < totalPages) pages.push(i);
        }

        if (page < totalPages - 2) pages.push('...');

        // Always include last
        if (totalPages > 1) pages.push(totalPages);
      }
      return pages;
    };

    const pages = getPageNumbers();

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => onPageChange(Math.max(1, meta.page - 1))}
            disabled={meta.page === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-700 self-center">
            {meta.page} / {meta.totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(meta.totalPages, meta.page + 1))}
            disabled={meta.page === meta.totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(meta.page - 1) * meta.limit + 1}</span> to <span className="font-medium">{Math.min(meta.page * meta.limit, meta.total)}</span> of <span className="font-medium">{meta.total}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => onPageChange(Math.max(1, meta.page - 1))}
                disabled={meta.page === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
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
                    ? 'z-10 bg-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-default'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 cursor-pointer'
                    } ${typeof p !== 'number' ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => onPageChange(Math.min(meta.totalPages, meta.page + 1))}
                disabled={meta.page === meta.totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white text-black">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-normal font-gt-america-regular tracking-tight">Admin Access</h1>
            <p className="mt-2 text-gray-500">Enter secure key to view dashboard</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-200 placeholder-gray-400 text-black bg-white focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Secret Key"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Access Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col bg-white text-black">
      <main className="flex-1 p-[0_20px] md:p-[30px_40px] min-h-screen min-h-[100dvh] md:h-screen overflow-y-auto flex flex-col">
        <MobileHeader />

        <div className="max-w-4xl mx-auto w-full pt-4 md:pt-0">
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <div>
              <h1 className="text-2xl font-normal font-gt-america-regular">Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">
                Views{analyticsTimeRange === 'all' ? ' (All Time)' : analyticsTimeRange === '0' ? '' : ` (Last ${analyticsTimeRange} Days)`}: {analytics?.overview?.views || 0}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-black cursor-pointer transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="flex justify-end mb-6 gap-4">
            <select
              value={analyticsTimeRange}
              onChange={(e) => {
                setAnalyticsTimeRange(e.target.value);
              }}
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-black focus:border-black block p-2 cursor-pointer"
            >
              <option value="0">Today</option>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-2xl font-normal font-gt-america-regular text-black">{analytics?.overview?.views || 0}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500">Unique Visitors</p>
                <p className="text-2xl font-normal font-gt-america-regular text-black">{analytics?.overview?.visitors || 0}</p>
              </div>
            </div>

            {/* Traffic Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Traffic Overview */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden col-span-2 shadow-sm">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">Traffic Overview</h3>
                </div>
                <div className="p-4 h-72">
                  {analytics?.data?.chart && analytics.data.chart.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={analytics.data.chart}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#000" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#000" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis
                          dataKey="date"
                          stroke="#9ca3af"
                          fontSize={12}
                          tickFormatter={(str: string) => {
                            if (str.includes('T')) {
                              return new Date(str).toLocaleTimeString('en-US', {
                                timeZone: 'America/Los_Angeles',
                                hour: 'numeric',
                                hour12: true
                              });
                            }
                            const [y, m, d] = str.split('-').map(Number);
                            const date = new Date(y, m - 1, d);
                            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                          }}
                        />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', color: '#000', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          itemStyle={{ color: '#000' }}
                          labelStyle={{ color: '#6b7280' }}
                          labelFormatter={(label: string) => {
                            if (label.includes('T')) {
                              const pstTime = new Date(label).toLocaleTimeString('en-US', {
                                timeZone: 'America/Los_Angeles',
                                hour: 'numeric',
                                hour12: true
                              });
                              const pstDate = new Date(label).toLocaleDateString('en-US', {
                                timeZone: 'America/Los_Angeles',
                                month: 'short',
                                day: 'numeric'
                              });
                              return `${pstDate}, ${pstTime} (PST)`;
                            }
                            const [y, m, d] = label.split('-').map(Number);
                            const date = new Date(y, m - 1, d);
                            return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="views"
                          stroke="#000"
                          fillOpacity={1}
                          fill="url(#colorViews)"
                          name="Total Views"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="visitors"
                          stroke="#9ca3af"
                          fillOpacity={1}
                          fill="url(#colorVisitors)"
                          name="Unique Visitors"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No chart data available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Top Lists */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Referrers */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-[340px] md:col-span-2 shadow-sm">
                <div className="px-4 border-b border-gray-200 flex-shrink-0 h-[48px] flex items-center bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-900">Top Referrers</h3>
                </div>
                {analytics && analytics.data.referrers && analytics.data.referrers.length > 0 ? (
                  <>
                    <div className="p-4 flex-1 overflow-hidden">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                        {analytics.data.referrers
                          .slice((referrersPage - 1) * referrersLimit, referrersPage * referrersLimit)
                          .map((r, i) => (
                            <li key={i} className="flex justify-between items-center group border-b border-gray-100 pb-2 md:border-none md:pb-0">
                              <span
                                className="text-sm font-medium text-gray-700 truncate max-w-[300px]"
                                title={r.name}
                              >
                                {r.name}
                              </span>
                              <span className="text-sm font-mono text-gray-500 flex-shrink-0">{r.value}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="px-4 flex justify-between items-center border-t border-gray-200 h-[42px] flex-shrink-0 bg-gray-50">
                      <div className="w-[60px]">
                        {referrersPage > 1 && (
                          <button
                            onClick={() => setReferrersPage(p => Math.max(1, p - 1))}
                            className="text-xs text-gray-500 hover:text-black cursor-pointer"
                          >
                            Previous
                          </button>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {referrersPage} / {Math.ceil(analytics.data.referrers.length / referrersLimit)}
                      </span>
                      <div className="w-[60px] flex justify-end">
                        {referrersPage < Math.ceil(analytics.data.referrers.length / referrersLimit) && (
                          <button
                            onClick={() => setReferrersPage(p => Math.min(Math.ceil(analytics.data.referrers.length / referrersLimit), p + 1))}
                            className="text-xs text-gray-500 hover:text-black cursor-pointer"
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 flex-1 flex items-center justify-center">
                    <p className="text-sm text-gray-400">No data yet</p>
                  </div>
                )}
              </div>

              {/* Top Visitors */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-[340px] shadow-sm">
                <div className="px-4 border-b border-gray-200 flex-shrink-0 h-[48px] flex items-center bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-900">Top Visitors</h3>
                </div>
                {analytics && analytics.data.topVisitors && analytics.data.topVisitors.length > 0 ? (
                  <>
                    <div className="p-4 flex-1 overflow-hidden">
                      <ul className="space-y-3">
                        {analytics.data.topVisitors
                          .slice((visitorsPage - 1) * 7, visitorsPage * 7)
                          .map((v, i) => (
                            <li
                              key={i}
                              className={`flex justify-between items-center group cursor-pointer transition-colors ${selectedVisitor === v.id ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                              onClick={() => {
                                setSelectedVisitor(selectedVisitor === v.id ? null : v.id);
                                setPagesPage(1); // Reset pages pagination
                                setVisitorPage(1); // Reset visitor pagination
                              }}
                            >
                              <div className="flex flex-col overflow-hidden mr-2">
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm truncate font-mono text-xs ${selectedVisitor === v.id ? 'text-black font-semibold' : 'text-gray-600 group-hover:text-black'}`}>{v.ip || 'Unknown'}</span>
                                  {(v.city || v.country) && (
                                    <span className={`text-xs truncate ${selectedVisitor === v.id ? 'text-gray-500' : 'text-gray-400'}`}>
                                      {v.city && v.city !== 'unknown' ? decodeURIComponent(v.city) : ''}
                                      {v.city && v.country ? ', ' : ''}
                                      {v.country ? getCountryName(v.country) : ''}
                                      {v.referrer && v.referrer !== 'unknown' && (
                                        <span className="text-gray-400"> via {v.referrer}</span>
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-sm font-mono text-gray-500 flex-shrink-0">{v.value}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="px-4 flex justify-between items-center border-t border-gray-200 h-[42px] flex-shrink-0 bg-gray-50">
                      <div className="w-[60px]">
                        {visitorsPage > 1 && (
                          <button
                            onClick={() => setVisitorsPage(p => Math.max(1, p - 1))}
                            className="text-xs text-gray-500 hover:text-black cursor-pointer"
                          >
                            Previous
                          </button>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {visitorsPage} / {Math.ceil(analytics.data.topVisitors.length / 7)}
                      </span>
                      <div className="w-[60px] flex justify-end">
                        {visitorsPage < Math.ceil(analytics.data.topVisitors.length / 7) && (
                          <button
                            onClick={() => setVisitorsPage(p => Math.min(Math.ceil((analytics.data.topVisitors?.length || 0) / 7), p + 1))}
                            className="text-xs text-gray-500 hover:text-black cursor-pointer"
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 flex-1 flex items-center justify-center">
                    <p className="text-sm text-gray-400">No data yet</p>
                  </div>
                )}
              </div>

              {/* Top Pages */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-[340px] shadow-sm">
                <div className="px-4 border-b border-gray-200 flex-shrink-0 h-[48px] flex items-center justify-between bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-900 truncate max-w-[200px]" title={selectedVisitor ? `Pages visited by ${selectedVisitor}` : 'Top Pages'}>
                    {selectedVisitor ? `Pages by Visitor` : 'Top Pages'}
                  </h3>
                  {selectedVisitor && (
                    <button onClick={() => { setSelectedVisitor(null); setVisitorPage(1); }} className="flex-shrink-0 text-xs text-gray-500 hover:text-black cursor-pointer border border-gray-300 rounded px-1.5 py-0.5 bg-white">
                      Clear
                    </button>
                  )}
                </div>
                {analytics && analytics.data.pages.length > 0 ? (
                  <>
                    <div className="p-4 flex-1 overflow-hidden">
                      <ul className="space-y-3">
                        {analytics.data.pages
                          .slice((pagesPage - 1) * 7, pagesPage * 7)
                          .map((p, i) => (
                            <li key={i} className="flex justify-between items-center">
                              <span className="text-sm text-gray-700 truncate" title={p.name}>{p.name}</span>
                              <span className="text-sm font-mono text-gray-500">{p.value}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="px-4 flex justify-between items-center border-t border-gray-200 h-[42px] flex-shrink-0 bg-gray-50">
                      <div className="w-[60px]">
                        {pagesPage > 1 && (
                          <button
                            onClick={() => setPagesPage(p => Math.max(1, p - 1))}
                            className="text-xs text-gray-500 hover:text-black cursor-pointer"
                          >
                            Previous
                          </button>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {pagesPage} / {Math.ceil(analytics.data.pages.length / 7)}
                      </span>
                      <div className="w-[60px] flex justify-end">
                        {pagesPage < Math.ceil(analytics.data.pages.length / 7) && (
                          <button
                            onClick={() => setPagesPage(p => Math.min(Math.ceil(analytics.data.pages.length / 7), p + 1))}
                            className="text-xs text-gray-500 hover:text-black cursor-pointer"
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 flex-1 flex items-center justify-center">
                    <p className="text-sm text-gray-400">No data yet</p>
                  </div>
                )}
              </div>

              {/* Top Countries */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-[340px] shadow-sm">
                <div className="px-4 border-b border-gray-200 flex-shrink-0 h-[48px] flex items-center justify-between bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-900">Top Countries</h3>
                </div>
                {analytics && analytics.data.countries.length > 0 ? (
                  <>
                    <div className="p-4 flex-1 overflow-hidden">
                      <ul className="space-y-3">
                        {analytics.data.countries
                          .slice((countryPage - 1) * 7, countryPage * 7)
                          .map((p, i) => (
                            <li
                              key={i}
                              className={`flex justify-between items-center group cursor-pointer transition-colors ${selectedCountry === p.name ? '' : ''}`}
                              onClick={() => {
                                setSelectedCountry(selectedCountry === p.name ? null : p.name);
                                setCityPage(1);
                                setVisitorPage(1); // Reset visitor pagination
                              }}
                            >
                              <span className={`text-sm truncate ${selectedCountry === p.name ? 'text-black font-semibold' : 'text-gray-700 group-hover:text-black'}`}>{getCountryName(p.name)}</span>
                              <span className="text-sm font-mono text-gray-500">{p.value}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="px-4 flex justify-between items-center border-t border-gray-200 h-[42px] flex-shrink-0 bg-gray-50">
                      <div className="w-[60px]">
                        {countryPage > 1 && (
                          <button
                            onClick={() => setCountryPage(p => Math.max(1, p - 1))}
                            className="text-xs text-gray-500 hover:text-black cursor-pointer"
                          >
                            Previous
                          </button>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {countryPage} / {Math.ceil(analytics.data.countries.length / 7)}
                      </span>
                      <div className="w-[60px] flex justify-end">
                        {countryPage < Math.ceil(analytics.data.countries.length / 7) && (
                          <button
                            onClick={() => setCountryPage(p => Math.min(Math.ceil(analytics.data.countries.length / 7), p + 1))}
                            className="text-xs text-gray-500 hover:text-black cursor-pointer"
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 flex-1 flex items-center justify-center">
                    <p className="text-sm text-gray-400">No data yet</p>
                  </div>
                )}
              </div>

              {/* Top Cities */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-[340px] shadow-sm">
                <div className="px-4 border-b border-gray-200 flex-shrink-0 h-[48px] flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {selectedCountry ? `Cities in ${getCountryName(selectedCountry)}` : 'Top Cities'}
                    </h3>
                    {selectedCountry && (
                      <button onClick={() => setSelectedCountry(null)} className="flex-shrink-0 text-xs text-gray-500 hover:text-black cursor-pointer border border-gray-300 rounded px-1.5 py-0.5 bg-white">
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                {analytics && analytics.data.cities && analytics.data.cities.length > 0 ? (
                  <>
                    <div className="p-4 flex-1 overflow-hidden">
                      <ul className="space-y-3">
                        {analytics.data.cities
                          .slice((cityPage - 1) * 7, cityPage * 7)
                          .map((p, i) => (
                            <li key={i} className="flex justify-between items-center group">
                              <span className="text-sm text-gray-700 truncate">{decodeURIComponent(p.name)}</span>
                              <span className="text-sm font-mono text-gray-500">{p.value}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="px-4 flex justify-between items-center border-t border-gray-200 h-[42px] flex-shrink-0 bg-gray-50">
                      <div className="w-[60px]">
                        {cityPage > 1 && (
                          <button
                            onClick={() => setCityPage(p => Math.max(1, p - 1))}
                            className="text-xs text-gray-500 hover:text-black cursor-pointer"
                          >
                            Previous
                          </button>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {cityPage} / {Math.ceil(analytics.data.cities.length / 7)}
                      </span>
                      <div className="w-[60px] flex justify-end">
                        {cityPage < Math.ceil(analytics.data.cities.length / 7) && (
                          <button
                            onClick={() => setCityPage(p => Math.min(Math.ceil(analytics.data.cities.length / 7), p + 1))}
                            className="text-xs text-gray-500 hover:text-black cursor-pointer"
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 flex-1 flex items-center justify-center">
                    <p className="text-sm text-gray-400">No city data available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Visitors Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col shadow-sm">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h3 className="text-sm font-medium text-gray-900">
                  {selectedVisitor
                    ? 'Selected Visitor Identity'
                    : selectedCountry
                      ? `Recent Visitors from ${getCountryName(selectedCountry)}`
                      : 'Recent/Identified Visitors'}
                </h3>
                {!selectedVisitor && (
                  <input
                    type="text"
                    placeholder="Search email, ip, city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white border border-gray-200 text-black text-xs rounded px-2 py-1 focus:ring-black focus:border-black placeholder-gray-400 outline-none w-48"
                  />
                )}
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                  <thead className="text-gray-500 border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 font-medium">IP Address</th>
                      <th className="px-4 py-3 font-medium">Location</th>
                      <th className="px-4 py-3 font-medium">Referrer</th>
                      <th className="px-4 py-3 font-medium">Last Seen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(analytics && analytics.data.recentVisitors && analytics.data.recentVisitors.length > 0) ? (
                      analytics.data.recentVisitors.map((v, i) => (
                        <tr
                          key={i}
                          className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedVisitor === v.id ? 'bg-gray-100' : ''}`}
                          onClick={() => {
                            setSelectedVisitor(selectedVisitor === v.id ? null : v.id);
                            setVisitorPage(1);
                          }}
                        >
                          <td className="px-4 py-3 text-gray-600 font-mono text-xs">{v.ip}</td>
                          <td className="px-4 py-3 text-gray-600">
                            {v.country ? getCountryName(v.country) : 'Unknown'}
                            {v.city && v.city !== 'unknown' && <span className="text-gray-400 text-xs ml-1">({decodeURIComponent(v.city)})</span>}
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs truncate max-w-[150px]" title={v.referrer || ''}>
                            {v.referrer && v.referrer !== 'unknown' ? v.referrer : '-'}
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{new Date(v.lastSeen).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                          No recent visitor data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Visitor Pagination */}
              {analytics?.data?.pagination && <PaginationControls meta={analytics.data.pagination} onPageChange={setVisitorPage} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
