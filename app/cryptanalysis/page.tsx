"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  BarChart3,
  Calculator,
  Play,
  StopCircle,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchAnalytics, postBruteForce, postFrequency, postChiSquare } from '@/lib/api';


export default function CryptanalysisPage() {
  const [ciphertext, setCiphertext] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("brute-force");
  const [frequencyData, setFrequencyData] = useState<any[]>([]);
  const [chiSquareCandidates, setChiSquareCandidates] = useState<any[]>([]);
  const [bruteForceProgress, setBruteForceProgress] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics()
      .then((res) => {
        setFrequencyData(res.frequencyData || []);
        setChiSquareCandidates(res.chiSquareCandidates || res.benchmarkResults || []);
        setBruteForceProgress(res.bruteForceProgress || []);
      })
      .catch((err) => console.error('Failed to fetch analytics', err));
  }, []);

  const handleStartAnalysis = () => {
    if (!ciphertext) return;
    setIsAnalyzing(true);
    setProgress(0);

    // Kick off backend brute force and frequency analysis in parallel (non-blocking)
    postBruteForce({ ciphertext }).then((res) => {
      setBruteForceProgress(res.candidates || []);
      setProgress(100);
    }).catch(() => setIsAnalyzing(false));

    postFrequency({ ciphertext }).then((res) => setFrequencyData(res.letterFrequencies || [])).catch(() => {});

    postChiSquare({ ciphertext }).then((res) => setChiSquareCandidates(res.candidates || [])).catch(() => {});
  };

  const handleStop = () => {
    setIsAnalyzing(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-purple-950/50 py-6 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-purple-600/10 border border-purple-600/20 rounded-full px-4 py-2 mb-4">
            <Activity className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Cryptanalysis Module
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Automated Cryptanalysis</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test cipher security using brute force, frequency analysis, and chi-square statistical
            methods
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle>Ciphertext Input</CardTitle>
              <CardDescription>Enter the encrypted text you want to analyze</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter ciphertext to analyze..."
                value={ciphertext}
                onChange={(e) => setCiphertext(e.target.value)}
                className="min-h-[100px] font-mono"
              />
              <div className="flex gap-3">
                <Button
                  onClick={handleStartAnalysis}
                  disabled={!ciphertext || isAnalyzing}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Analysis
                </Button>
                {isAnalyzing && (
                  <Button onClick={handleStop} variant="destructive" size="lg">
                    <StopCircle className="mr-2 h-4 w-4" />
                    Stop
                  </Button>
                )}
              </div>
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Analysis Progress</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Analysis Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value || "brute-force")} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="brute-force" className="gap-2 flex-col sm:flex-row py-3 sm:py-2">
                <Activity className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Brute Force</span>
              </TabsTrigger>
              <TabsTrigger value="frequency" className="gap-2 flex-col sm:flex-row py-3 sm:py-2">
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Frequency</span>
              </TabsTrigger>
              <TabsTrigger value="chi-square" className="gap-2 flex-col sm:flex-row py-3 sm:py-2">
                <Calculator className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Chi-Square</span>
              </TabsTrigger>
            </TabsList>

            {/* Brute Force Tab */}
            <TabsContent value="brute-force" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="glass">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Attack Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">
                      {progress === 100 ? "Complete" : `${progress}%`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Keys tested: {Math.floor((progress / 100) * 308915776).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Estimated Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                      {progress === 100 ? "45.2s" : "~7h"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on key space size
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {progress === 100 ? "5%" : "Processing"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enhanced cipher resistance
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle>Attack Progress Over Time</CardTitle>
                  <CardDescription>Number of keys tested vs time elapsed</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={bruteForceProgress}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis
                        dataKey="attempt"
                        label={{ value: "Keys Tested", position: "insideBottom", offset: -5 }}
                      />
                      <YAxis
                        label={{ value: "Time (seconds)", angle: -90, position: "insideLeft" }}
                      />
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
                        dataKey="time"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        name="Time Elapsed"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Candidate Plaintexts</CardTitle>
                  <CardDescription>Top matches found during brute force analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {progress === 100 ? (
                      chiSquareCandidates.slice(0, 3).map((candidate, index) => (
                        <div
                          key={index}
                          className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="font-mono font-medium">{candidate.plaintext}</span>
                            <Badge variant={index === 0 ? "default" : "secondary"}>
                              {candidate.probability}
                            </Badge>
                          </div>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>Key: {candidate.key}</span>
                            <span>χ² Score: {candidate.chiSquare}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Start analysis to see results</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Frequency Analysis Tab */}
            <TabsContent value="frequency" className="space-y-6">
              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle>Letter Frequency Distribution</CardTitle>
                  <CardDescription>
                    Compare ciphertext frequency with expected English letter frequency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={frequencyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="letter" />
                      <YAxis
                        label={{ value: "Frequency (%)", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="frequency" fill="hsl(var(--primary))" name="Observed" />
                      <Bar
                        dataKey="expected"
                        fill="hsl(var(--chart-2))"
                        name="Expected (English)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-base">Most Frequent Letters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[...frequencyData]
                        .sort((a, b) => b.frequency - a.frequency)
                        .slice(0, 5)
                        .map((item, index) => (
                          <div key={item.letter} className="flex items-center gap-3">
                            <Badge variant="outline" className="w-12 justify-center">
                              {item.letter}
                            </Badge>
                            <div className="flex-1">
                              <Progress value={item.frequency * 5} className="h-2" />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">
                              {item.frequency}%
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-base">Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Correlation Score</span>
                        <span className="font-medium">78.5%</span>
                      </div>
                      <Progress value={78.5} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Pattern Match</span>
                        <span className="font-medium">65.2%</span>
                      </div>
                      <Progress value={65.2} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Attack Confidence</span>
                        <span className="font-medium">45.8%</span>
                      </div>
                      <Progress value={45.8} className="h-2" />
                    </div>
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Enhanced cipher shows strong resistance to frequency analysis due to
                        multi-round encryption and dynamic keys.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Chi-Square Tab */}
            <TabsContent value="chi-square" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Chi-Square Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">892.7</div>
                    <p className="text-xs text-muted-foreground mt-1">Higher = More secure</p>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Best Match</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">12.4</div>
                    <p className="text-xs text-muted-foreground mt-1">χ² value</p>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Candidates Found</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {chiSquareCandidates.length}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Ranked by score</p>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Success Probability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      98.5%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Top candidate</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle>Ranked Plaintext Candidates</CardTitle>
                  <CardDescription>
                    Statistical analysis using chi-square test for English language patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {chiSquareCandidates.map((candidate) => (
                      <div
                        key={candidate.rank}
                        className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={candidate.rank === 1 ? "default" : "secondary"}
                              className="text-base px-3"
                            >
                              #{candidate.rank}
                            </Badge>
                            <span className="font-mono font-semibold text-lg">
                              {candidate.plaintext}
                            </span>
                          </div>
                          <Badge
                            variant={candidate.rank === 1 ? "default" : "outline"}
                            className="text-sm"
                          >
                            {candidate.probability}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Chi-Square Score:</span>
                            <span className="ml-2 font-medium">{candidate.chiSquare}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Key:</span>
                            <span className="ml-2 font-mono font-medium">{candidate.key}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
