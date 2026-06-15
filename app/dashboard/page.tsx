"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Key,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { useEffect, useState } from 'react';
import { fetchAnalytics } from '@/lib/api';

const comparisonData = [
  {
    metric: "Key Space",
    classical: 26,
    enhanced: 308915776,
  },
  {
    metric: "Break Time (sec)",
    classical: 0.05,
    enhanced: 27900, // 7.75 hours
  },
  {
    metric: "Chi-Square Distance",
    classical: 45.2,
    enhanced: 892.7,
  },
  {
    metric: "Attack Resistance %",
    classical: 0,
    enhanced: 95,
  },
];

const radarData = [
  {
    subject: "Key Complexity",
    classical: 20,
    enhanced: 95,
  },
  {
    subject: "Frequency Resistance",
    classical: 15,
    enhanced: 92,
  },
  {
    subject: "Brute Force Resistance",
    classical: 5,
    enhanced: 98,
  },
  {
    subject: "Chi-Square Resistance",
    classical: 25,
    enhanced: 88,
  },
  {
    subject: "Multi-Layer Security",
    classical: 0,
    enhanced: 100,
  },
];

const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b"];

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics()
      .then((res) => setAnalytics(res))
      .catch((err) => console.error('Failed to load analytics', err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen gradient-bg py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/8 border border-primary/25 rounded-full px-5 py-2.5 mb-4 shadow-sm">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">Security Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Security Comparison Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Comprehensive analysis of classical vs enhanced Caesar cipher security metrics
          </p>
        </motion.div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="glass-strong border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Key className="h-4 w-4 text-primary" />
                  Key Space Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="text-2xl font-bold text-primary">308,915,776</div>
                    <p className="text-xs text-muted-foreground">Enhanced Cipher</p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Classical</span>
                      <span className="font-medium">26</span>
                    </div>
                    <Badge variant="secondary" className="mt-2 w-full justify-center">
                      +11,881,376x larger
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-strong border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Clock className="h-4 w-4 text-secondary" />
                  Average Break Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="text-2xl font-bold text-secondary">
                      7h 45m
                    </div>
                    <p className="text-xs text-muted-foreground">Enhanced Cipher</p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Classical</span>
                      <span className="font-medium">0.05s</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="mt-2 w-full justify-center bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    >
                      558,000x slower to break
                    </Badge>
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
                  Chi-Square Distance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      892.7
                    </div>
                    <p className="text-xs text-muted-foreground">Enhanced Cipher</p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Classical</span>
                      <span className="font-medium">45.2</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="mt-2 w-full justify-center bg-purple-100 dark:bg-purple-900/30"
                    >
                      19.7x more resistant
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="glass-strong border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Attack Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">5%</div>
                    <p className="text-xs text-muted-foreground">Enhanced Cipher</p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Classical</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="mt-2 w-full justify-center bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    >
                      95% attack resistance
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Security Score Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="glass-strong border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Security Score by Encryption Rounds</CardTitle>
                <CardDescription>
                  Security effectiveness increases with multiple encryption rounds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics?.securityScores || []}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="label" />
                    <YAxis domain={[0, 10]} />
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
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      name="Security Score"
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Attack Trends */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Attack Success Trends</CardTitle>
                <CardDescription>
                  Comparative analysis of different attack methods over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics?.attackTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="bruteForce" fill="#3b82f6" name="Brute Force" />
                    <Bar dataKey="frequency" fill="#06b6d4" name="Frequency Analysis" />
                    <Bar dataKey="chiSquare" fill="#8b5cf6" name="Chi-Square" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Radar Chart and Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Security Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Multi-Dimensional Security Analysis</CardTitle>
                <CardDescription>
                  Comprehensive comparison across security dimensions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={radarData}>
                    <PolarGrid opacity={0.2} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Classical Caesar"
                      dataKey="classical"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Enhanced Caesar"
                      dataKey="enhanced"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.5}
                    />
                    <Legend />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Security Metrics Comparison</CardTitle>
                <CardDescription>
                  Side-by-side comparison of key security indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(analytics?.securityComparison || []).map((item: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.metric}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">Classical</div>
                          <div className="font-semibold">{item.classical}</div>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">Enhanced</div>
                          <div className="font-semibold text-primary">{item.enhanced}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Benchmark Results Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle>Detailed Benchmark Results</CardTitle>
              <CardDescription>
                Comprehensive security testing across different cipher configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden">
                    <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 text-sm font-semibold">Cipher Type</th>
                      <th className="text-left p-3 text-sm font-semibold">Key Space</th>
                      <th className="text-left p-3 text-sm font-semibold">Avg Break Time</th>
                      <th className="text-left p-3 text-sm font-semibold">Success Rate</th>
                      <th className="text-left p-3 text-sm font-semibold">Chi-Square Dist.</th>
                      <th className="text-left p-3 text-sm font-semibold">Security Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(analytics?.benchmarkResults || []).map((result: any, index: number) => (
                      <tr
                        key={result.id}
                        className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Badge variant={index === 0 ? "destructive" : "default"}>
                              {result.cipherType}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-sm">
                          {result.keySpace.toLocaleString()}
                        </td>
                        <td className="p-3 font-medium">{result.avgBreakTime}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {parseInt(result.successRate) === 100 ? (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            )}
                            <span>{result.successRate}</span>
                          </div>
                        </td>
                        <td className="p-3 font-medium">{result.chiSquareDistance}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 max-w-[100px]">
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-primary to-cyan-500"
                                  style={{ width: `${result.securityScore * 10}%` }}
                                />
                              </div>
                            </div>
                            <span className="font-semibold">{result.securityScore}/10</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="glass border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <CheckCircle2 className="h-5 w-5" />
                  Enhanced Advantages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>11M+ times larger key space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>95% attack resistance rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Dynamic key generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Multi-round encryption</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Card className="glass border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                  <AlertTriangle className="h-5 w-5" />
                  Classical Vulnerabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Only 26 possible keys</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Broken in &lt;1 second</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Vulnerable to frequency analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>100% attack success rate</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Card className="glass border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Shield className="h-5 w-5" />
                  Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  For maximum security, use Enhanced Caesar Cipher with:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>5 encryption rounds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Long, random keywords</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Regular key rotation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
