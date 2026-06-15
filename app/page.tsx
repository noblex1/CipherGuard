"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Shield,
  Lock,
  Unlock,
  Activity,
  Zap,
  Key,
  BarChart3,
  Brain,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Lock,
    title: "Advanced Encryption",
    description: "Multi-round Caesar cipher with dynamic key generation for enhanced security",
  },
  {
    icon: Unlock,
    title: "Smart Decryption",
    description: "Efficient decryption with support for classical and enhanced cipher methods",
  },
  {
    icon: Activity,
    title: "Cryptanalysis Tools",
    description: "Brute force, frequency analysis, and chi-square testing capabilities",
  },
  {
    icon: BarChart3,
    title: "Security Analytics",
    description: "Comprehensive dashboards and real-time security metrics visualization",
  },
  {
    icon: Brain,
    title: "Educational Platform",
    description: "Interactive learning modules to understand cryptographic concepts",
  },
  {
    icon: Zap,
    title: "Performance Benchmarking",
    description: "Compare classical vs enhanced cipher security effectiveness",
  },
];

const benefits = [
  "Exponentially larger key space compared to classical Caesar cipher",
  "Resistant to frequency analysis attacks",
  "Dynamic key generation for each encryption session",
  "Multi-round encryption for enhanced security",
  "Comprehensive security analysis and reporting",
  "Real-time attack simulation and testing",
];

const howItWorks = [
  {
    step: "01",
    title: "Enter Your Message",
    description: "Input plaintext and choose your encryption keyword",
    icon: Key,
  },
  {
    step: "02",
    title: "Select Encryption Rounds",
    description: "Configure multiple encryption rounds for enhanced security",
    icon: Shield,
  },
  {
    step: "03",
    title: "Generate Ciphertext",
    description: "Advanced algorithm produces secure encrypted output",
    icon: Lock,
  },
  {
    step: "04",
    title: "Analyze Security",
    description: "Test against various cryptanalysis techniques",
    icon: Activity,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg">
        <div className="absolute inset-0 cyber-grid opacity-40" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/8 border border-primary/25 rounded-full px-5 py-2.5 text-sm shadow-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-primary font-semibold tracking-wide">Final Year CS Project 2026</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
              Enhanced Caesar Cipher{" "}
              <span className="gradient-text">Security Analysis Platform</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore encryption, decryption, cryptanalysis, and security benchmarking through an
              interactive web platform with multi-round encryption and dynamic key generation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/encrypt">
                <Button size="lg" className="text-base px-8 h-12 shadow-md font-semibold">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="text-base px-8 h-12 font-semibold border-2">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Animated Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 relative"
            >
              <div className="glass-strong rounded-xl p-6 shadow-xl">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 mx-auto bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                      <Key className="h-7 w-7 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Plaintext</p>
                  </div>
                  <div className="text-center">
                    <ArrowRight className="h-7 w-7 mx-auto text-primary" />
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 mx-auto bg-secondary/10 rounded-lg flex items-center justify-center border border-secondary/20">
                      <Lock className="h-7 w-7 text-secondary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Ciphertext</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Comprehensive Cryptographic Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to understand, implement, and analyze Caesar cipher security
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="glass h-full hover:shadow-lg transition-all hover:-translate-y-0.5 border-border">
                  <CardContent className="p-6 space-y-3">
                    <div className="w-12 h-12 bg-primary/8 rounded-lg flex items-center justify-center border border-primary/15">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Simple workflow for encryption, decryption, and security analysis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative"
              >
                <Card className="glass-strong h-full border-border">
                  <CardContent className="p-6 space-y-3">
                    <div className="text-4xl font-bold text-primary/15">{item.step}</div>
                    <div className="w-11 h-11 bg-primary/8 rounded-lg flex items-center justify-center border border-primary/15">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 text-primary/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Benefits Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Enhanced Security Benefits
              </h2>
              <p className="text-lg text-muted-foreground">
                Our enhanced Caesar cipher implementation provides significant security
                improvements over the classical approach through dynamic key generation and
                multi-round encryption.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <Link href="/dashboard">
                <Button size="lg" className="mt-4">
                  View Security Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="glass-strong">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Key Space Size</span>
                        <span className="text-sm text-primary font-semibold">+11,881,376x</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "95%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-primary to-cyan-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Attack Resistance</span>
                        <span className="text-sm text-primary font-semibold">95%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "95%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Frequency Analysis Resistance</span>
                        <span className="text-sm text-primary font-semibold">92%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "92%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.6 }}
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card className="glass">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">308M+</div>
                    <div className="text-sm text-muted-foreground">Possible Keys</div>
                  </CardContent>
                </Card>
                <Card className="glass">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                      7h+
                    </div>
                    <div className="text-sm text-muted-foreground">Break Time</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Explore Enhanced Cryptography?
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Start encrypting, analyzing, and understanding the power of enhanced Caesar cipher security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/encrypt">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base px-8 h-12 font-semibold"
                >
                  Start Encrypting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cryptanalysis">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-12 font-semibold bg-white/10 hover:bg-white/20 border-white/40 border-2 text-white hover:text-white"
                >
                  Test Security
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
