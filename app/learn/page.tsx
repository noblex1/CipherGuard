"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Book,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Key,
  Shield,
  Layers,
  Lightbulb,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAnalytics } from '@/lib/api';

export default function LearnPage() {
  const [caesarStep, setCaesarStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [keyGenStep, setKeyGenStep] = useState(0);
  const [caesarShiftDemo, setCaesarShiftDemo] = useState<any[]>([]);
  const [keyGenerationSteps, setKeyGenerationSteps] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics()
      .then((res) => {
        setCaesarShiftDemo(res.education?.caesarShiftDemo || []);
        setKeyGenerationSteps(res.education?.keyGenerationSteps || []);
      })
      .catch((err) => console.error('Failed to load education content', err));
  }, []);

  const handleCaesarAnimate = () => {
    if (isAnimating) {
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);
    setCaesarStep(0);

    const interval = setInterval(() => {
      setCaesarStep((prev) => {
        if (prev >= caesarShiftDemo.length - 1) {
          clearInterval(interval);
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleCaesarReset = () => {
    setCaesarStep(0);
    setIsAnimating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-green-950/50 py-6 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-green-600/10 border border-green-600/20 rounded-full px-4 py-2 mb-4">
            <Book className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Educational Platform
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learn Cryptography Interactively
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understand Caesar cipher encryption through visual demonstrations and step-by-step
            explanations
          </p>
        </motion.div>

        <Tabs defaultValue="basics" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger value="basics" className="text-xs sm:text-sm">Basics</TabsTrigger>
            <TabsTrigger value="caesar-demo" className="text-xs sm:text-sm">Demo</TabsTrigger>
            <TabsTrigger value="key-generation" className="text-xs sm:text-sm">Key Gen</TabsTrigger>
            <TabsTrigger value="multi-round" className="text-xs sm:text-sm">Multi-Round</TabsTrigger>
          </TabsList>

          {/* Basics Tab */}
          <TabsContent value="basics" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    What is Caesar Cipher?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    The Caesar cipher is one of the simplest and oldest known encryption techniques.
                    Named after Julius Caesar, who used it to protect military messages, it works by
                    shifting each letter in the plaintext by a fixed number of positions in the
                    alphabet.
                  </p>
                  <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                    <h4 className="font-semibold text-sm">Example:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          Plaintext
                        </Badge>
                        <p className="font-mono text-lg font-bold">HELLO</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="space-y-1">
                          <Badge>Shift by 3</Badge>
                          <ArrowRight className="h-5 w-5 mx-auto text-primary" />
                        </div>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">
                          Ciphertext
                        </Badge>
                        <p className="font-mono text-lg font-bold text-primary">KHOOR</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="glass h-full">
                  <CardHeader>
                    <Key className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Classical Caesar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Uses a single fixed shift value for all characters. Simple but easily broken.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Only 26 possible keys</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Vulnerable to brute force</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Frequency analysis effective</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="glass h-full border-primary/50">
                  <CardHeader>
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Enhanced Caesar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Uses dynamic keys derived from a keyword. More secure with variable shifts.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Millions of possible keys</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Dynamic shift per character</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Resistant to frequency analysis</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="glass h-full">
                  <CardHeader>
                    <Layers className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Multi-Round</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Applies encryption multiple times with different keys for maximum security.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Exponentially harder to break</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Multiple encryption layers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Maximum security level</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Caesar Demo Tab */}
          <TabsContent value="caesar-demo" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle>Character Shifting Animation</CardTitle>
                  <CardDescription>
                    Watch how each letter shifts by a fixed amount in the alphabet
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-3">
                    <Button
                      onClick={handleCaesarAnimate}
                      className="flex-1"
                      variant={isAnimating ? "secondary" : "default"}
                    >
                      {isAnimating ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Animate
                        </>
                      )}
                    </Button>
                    <Button onClick={handleCaesarReset} variant="outline">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {caesarShiftDemo.map((item, index) => (
                      <AnimatePresence key={item.original} mode="wait">
                        {index <= caesarStep && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Card className="glass border-primary/20">
                              <CardContent className="p-6 text-center space-y-3">
                                <div className="text-3xl font-bold font-mono">{item.original}</div>
                                <div className="flex items-center justify-center gap-2">
                                  <Badge variant="secondary">+{item.shift}</Badge>
                                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="text-3xl font-bold font-mono text-primary">
                                  {item.result}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      <strong>Note:</strong> When shifting reaches the end of the alphabet, it wraps
                      around to the beginning. For example, X shifted by 3 becomes A.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Key Generation Tab */}
          <TabsContent value="key-generation" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle>Dynamic Key Generation Process</CardTitle>
                  <CardDescription>
                    Understanding how keywords transform into encryption keys
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {keyGenerationSteps.map((step, index) => (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="relative"
                      >
                        <Card
                          className={`glass ${
                            index <= keyGenStep ? "border-primary/50" : ""
                          }`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-primary">
                                  {step.step}
                                </span>
                              </div>
                              <div className="flex-1 space-y-2">
                                <h3 className="font-semibold text-lg">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {step.description}
                                </p>
                                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                                  {step.visual}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        {index < keyGenerationSteps.length - 1 && (
                          <div className="flex justify-center my-2">
                            <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button
                      onClick={() =>
                        setKeyGenStep((prev) =>
                          prev < keyGenerationSteps.length - 1 ? prev + 1 : 0
                        )
                      }
                    >
                      {keyGenStep < keyGenerationSteps.length - 1 ? "Next Step" : "Start Over"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Multi-Round Tab */}
          <TabsContent value="multi-round" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle>Multi-Round Encryption Demonstration</CardTitle>
                  <CardDescription>
                    See how multiple encryption rounds enhance security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <div className="inline-block">
                        <Badge variant="outline" className="mb-2">
                          Original Plaintext
                        </Badge>
                        <p className="font-mono text-2xl font-bold">HELLO</p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                    </div>

                    {[
                      { round: 1, key: "S (18)", result: "ZSZZE" },
                      { round: 2, key: "E (4)", result: "DWHHI" },
                      { round: 3, key: "C (2)", result: "FYJJK" },
                    ].map((round, index) => (
                      <div key={round.round}>
                        <Card className="glass border-primary/20">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <Badge className="text-base px-4 py-1">Round {round.round}</Badge>
                              <Badge variant="secondary">Key: {round.key}</Badge>
                            </div>
                            <div className="text-center">
                              <p className="font-mono text-xl font-bold text-primary">
                                {round.result}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        {index < 2 && (
                          <div className="flex justify-center my-2">
                            <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex justify-center">
                      <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                    </div>

                    <div className="text-center space-y-4">
                      <div className="inline-block">
                        <Badge variant="default" className="mb-2">
                          Final Ciphertext
                        </Badge>
                        <p className="font-mono text-2xl font-bold text-primary">FYJJK</p>
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <h4 className="font-semibold text-sm text-green-900 dark:text-green-100 mb-2">
                        Why Multiple Rounds?
                      </h4>
                      <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Each round applies a different shift from the keyword</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Breaks simple frequency analysis patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Exponentially increases the key space size</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Makes brute force attacks impractical</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
