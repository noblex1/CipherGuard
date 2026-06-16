"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, FileSpreadsheet, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { fetchAnalytics } from '@/lib/api';
import { useToast } from '@/components/ui/toast';


export default function ReportsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  useEffect(() => {
    fetchAnalytics().then((res) => setAnalytics(res)).catch((err) => console.error(err));
  }, []);
  const handleDownloadPDF = () => {
    if (!analytics) return;
    const html = `
      <html>
        <head><title>Security Report</title></head>
        <body>
          <h1>Security Report</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <h2>Summary</h2>
          <pre>${JSON.stringify(analytics.summary || {}, null, 2)}</pre>
          <h2>Benchmark Results</h2>
          <pre>${JSON.stringify(analytics.benchmarkResults || [], null, 2)}</pre>
        </body>
      </html>
    `;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      w.focus();
      w.print();
      w.close();
      toast.showToast('Opened printable report (use Save as PDF in print dialog)', 'success');
    }
  };

  const handleDownloadCSV = () => {
    if (!analytics) return;
    const rows = analytics.benchmarkResults || [];
    if (rows.length === 0) {
      toast.showToast('No benchmark results to export', 'info');
      return;
    }
    const headers = Object.keys(rows[0]);
    const csv = [headers.join(',')]
      .concat(
        rows.map((r: any) => headers.map((h) => String(r[h] ?? '')).join(','))
      )
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `benchmark-results-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.showToast('CSV exported', 'success');
  };

  const toast = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-950 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-orange-600/10 border border-orange-600/20 rounded-full px-4 py-2 mb-4">
            <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
              Security Reports
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Security Reports & Analysis</h1>
              <p className="text-lg text-muted-foreground">
                Comprehensive security assessments and benchmark findings
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleDownloadPDF} size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button onClick={handleDownloadCSV} variant="outline" size="lg">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">24</div>
                <p className="text-xs text-muted-foreground mt-1">Generated this month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Critical Findings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">3</div>
                <p className="text-xs text-muted-foreground mt-1">Require immediate action</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Security Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">8.2/10</div>
                <p className="text-xs text-muted-foreground mt-1">Enhanced cipher average</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Tests Performed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">1,892</div>
                <p className="text-xs text-muted-foreground mt-1">Total security tests</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Benchmark Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle>Security Benchmark Report</CardTitle>
              <CardDescription>
                Comprehensive testing results across different cipher configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 text-sm font-semibold">ID</th>
                      <th className="text-left p-3 text-sm font-semibold">Cipher Type</th>
                      <th className="text-left p-3 text-sm font-semibold">Key Space</th>
                      <th className="text-left p-3 text-sm font-semibold">Break Time</th>
                      <th className="text-left p-3 text-sm font-semibold">Success Rate</th>
                      <th className="text-left p-3 text-sm font-semibold">Security Score</th>
                      <th className="text-left p-3 text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(analytics?.benchmarkResults || []).map((result: any) => (
                      <tr
                        key={result.id}
                        className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-3 font-mono text-sm">{result.id}</td>
                        <td className="p-3">
                          <Badge>{result.cipherType}</Badge>
                        </td>
                        <td className="p-3 font-mono text-sm">
                          {result.keySpace.toLocaleString()}
                        </td>
                        <td className="p-3 font-medium">{result.avgBreakTime}</td>
                        <td className="p-3">
                          <Badge
                            variant={
                              parseInt(result.successRate) === 100 ? "destructive" : "secondary"
                            }
                          >
                            {result.successRate}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${result.securityScore * 10}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{result.securityScore}/10</span>
                          </div>
                        </td>
                        <td className="p-3">
                          {result.securityScore >= 7 ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-orange-600" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Encryption History */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Recent Encryptions</CardTitle>
                <CardDescription>Latest encryption operations performed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(analytics?.encryptionHistory || []).slice(0, 5).map((item: any, index: number) => (
                    <div key={item.id || `enc-${index}`} className="p-4 border border-border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{item.id}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Type:</span>
                          <p className="font-medium">{item.cipherType}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rounds:</span>
                          <p className="font-medium">{item.rounds}</p>
                        </div>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Key Space:</span>
                        <span className="ml-2 font-mono">{item.keySpace}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Attack History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Recent Attack Simulations</CardTitle>
                <CardDescription>Latest cryptanalysis attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(analytics?.attackHistory || []).map((item: any, index: number) => (
                    <div key={item.id || `attack-${index}`} className="p-4 border border-border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{item.id}</Badge>
                        <Badge variant={item.success ? "destructive" : "secondary"}>
                          {item.success ? "Success" : "Failed"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Type:</span>
                          <p className="font-medium">{item.attackType}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <p className="font-medium">{item.duration}</p>
                        </div>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Attempts:</span>
                        <span className="ml-2 font-mono">{item.attempts.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Security Findings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle>Key Security Findings</CardTitle>
              <CardDescription>
                Important insights from security analysis and testing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                        Excellent: Enhanced Cipher Security
                      </h4>
                      <p className="text-sm text-green-800 dark:text-green-200">
                        Enhanced Caesar cipher with 5 rounds provides 95% attack resistance with an
                        average break time exceeding 7 hours. Recommended for high-security applications.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        Info: Multi-Round Encryption Impact
                      </h4>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Each additional encryption round exponentially increases key space and
                        computational complexity for attackers. 3+ rounds recommended for sensitive data.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                        Critical: Classical Caesar Vulnerability
                      </h4>
                      <p className="text-sm text-red-800 dark:text-red-200">
                        Classical Caesar cipher is highly vulnerable with 100% attack success rate and
                        break time under 1 second. Not recommended for any security-sensitive applications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
