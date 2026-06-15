"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Lock,
  Unlock,
  Activity,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from 'react';
import { fetchAnalytics, clearToken, isTokenExpired } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b"];

export default function AdminPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  

  useEffect(() => {
    try { setToken(localStorage.getItem('token')); } catch { setToken(null); }
  }, []);

  useEffect(() => {
    fetchAnalytics()
      .then((res) => setAnalytics(res))
      .catch((err) => console.error('Failed to load analytics', err));
  }, []);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="p-6 bg-white/60 dark:bg-black/60 rounded shadow text-center">
            <h2 className="text-2xl font-bold mb-2">Admin access required</h2>
            <p className="mb-4">Please sign in to access the admin dashboard.</p>
            <Link href="/admin/login" className="inline-block px-4 py-2 bg-primary text-white rounded">Sign in</Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    try { clearToken(); } catch {}
    router.push('/admin/login');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-600/10 border border-gray-600/20 rounded-full px-4 py-2 mb-4">
            <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Admin Dashboard
            </span>
            <button onClick={handleLogout} className="ml-4 inline-flex items-center gap-2 text-sm text-red-600 hover:underline">
              Logout
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">System Overview</h1>
          <p className="text-lg text-muted-foreground">
            Monitor and manage CipherGuard platform activities
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass-strong">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Total Encryptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {(analytics?.dashboardStats?.totalEncryptions || 0).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span>+12.5% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-strong">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Unlock className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  Total Decryptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                    {(analytics?.dashboardStats?.totalDecryptions || 0).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span>+8.3% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-strong">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  Total Attacks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {(analytics?.dashboardStats?.totalAttacks || 0).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span>+15.7% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass-strong">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  Total Benchmarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {analytics?.dashboardStats?.totalBenchmarks || 0}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span>+5.2% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Usage Trends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>Daily operations over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics?.usageTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="encryptions"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Encryptions"
                    />
                    <Line
                      type="monotone"
                      dataKey="decryptions"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      name="Decryptions"
                    />
                    <Line
                      type="monotone"
                      dataKey="attacks"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      name="Attacks"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cipher Usage Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Cipher Usage Statistics</CardTitle>
                <CardDescription>Distribution of cipher types used</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics?.cipherUsageStats || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {(analytics?.cipherUsageStats || []).map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity Tables */}
        <div className="space-y-8">
          {/* Encryption History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Recent Encryption History</CardTitle>
                <CardDescription>Latest encryption operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-sm font-semibold">ID</th>
                        <th className="text-left p-3 text-sm font-semibold">Timestamp</th>
                        <th className="text-left p-3 text-sm font-semibold">Cipher Type</th>
                        <th className="text-left p-3 text-sm font-semibold">Rounds</th>
                        <th className="text-left p-3 text-sm font-semibold">Keyword</th>
                        <th className="text-left p-3 text-sm font-semibold">Key Space</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(analytics?.encryptionHistory || []).map((item: any, idx: number) => (
                        <tr
                          key={item._id ?? item.id ?? idx}
                          className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-3 font-mono text-sm">{item.id ?? item._id}</td>
                          <td className="p-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {new Date(item.timestamp || item.createdAt).toLocaleString()}
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge>{item.cipherType}</Badge>
                          </td>
                          <td className="p-3 text-center">{item.rounds}</td>
                          <td className="p-3 font-mono text-sm">{item.keyword}</td>
                          <td className="p-3 font-mono text-sm">{item.keySpace}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Attack History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Attack History</CardTitle>
                <CardDescription>Recent cryptanalysis attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-sm font-semibold">ID</th>
                        <th className="text-left p-3 text-sm font-semibold">Timestamp</th>
                        <th className="text-left p-3 text-sm font-semibold">Attack Type</th>
                        <th className="text-left p-3 text-sm font-semibold">Duration</th>
                        <th className="text-left p-3 text-sm font-semibold">Attempts</th>
                        <th className="text-left p-3 text-sm font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(analytics?.attackHistory || []).map((item: any, idx: number) => (
                        <tr
                          key={item._id ?? item.id ?? idx}
                          className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-3 font-mono text-sm">{item.id ?? item._id}</td>
                          <td className="p-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {new Date(item.timestamp || item.createdAt).toLocaleString()}
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant="secondary">{item.attackType}</Badge>
                          </td>
                          <td className="p-3 font-medium">{item.duration}</td>
                          <td className="p-3 font-mono text-sm">
                            {item.attempts.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <Badge variant={item.success ? "destructive" : "default"}>
                              {item.success ? "Success" : "Failed"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benchmark Records */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Benchmark Records</CardTitle>
                <CardDescription>Security testing results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-sm font-semibold">ID</th>
                        <th className="text-left p-3 text-sm font-semibold">Timestamp</th>
                        <th className="text-left p-3 text-sm font-semibold">Cipher Type</th>
                        <th className="text-left p-3 text-sm font-semibold">Key Space</th>
                        <th className="text-left p-3 text-sm font-semibold">Break Time</th>
                        <th className="text-left p-3 text-sm font-semibold">Success Rate</th>
                        <th className="text-left p-3 text-sm font-semibold">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(analytics?.benchmarkResults || []).map((item: any, idx: number) => (
                        <tr
                          key={item._id ?? item.id ?? idx}
                          className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-3 font-mono text-sm">{item.id ?? item._id}</td>
                          <td className="p-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {new Date(item.timestamp || item.createdAt).toLocaleString()}
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge>{item.cipherType}</Badge>
                          </td>
                          <td className="p-3 font-mono text-sm">
                            {item.keySpace.toLocaleString()}
                          </td>
                          <td className="p-3 font-medium">{item.avgBreakTime}</td>
                          <td className="p-3">
                            <Badge
                              variant={
                                parseInt(item.successRate) === 100 ? "destructive" : "secondary"
                              }
                            >
                              {item.successRate}
                            </Badge>
                          </td>
                          <td className="p-3 font-semibold text-primary">
                            {item.securityScore}/10
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8"
        >
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Average operation times and success rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Avg Encryption Time</p>
                  <p className="text-2xl font-bold text-primary">
                    {analytics?.dashboardStats?.avgEncryptionTime ?? '-'}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Avg Decryption Time</p>
                  <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                    {analytics?.dashboardStats?.avgDecryptionTime ?? '-'}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Avg Attack Time</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {analytics?.dashboardStats?.avgAttackTime ?? '-'}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Overall Success Rate</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {analytics?.dashboardStats?.successRate ?? '-'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
