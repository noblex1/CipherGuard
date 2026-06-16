"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Lock, Copy, RotateCcw, Key, Shield, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/toast";

export default function EncryptPage() {
  const [plaintext, setPlaintext] = useState("");
  const [keyword, setKeyword] = useState("");
  const [rounds, setRounds] = useState("3");
  const [cipherType, setCipherType] = useState("enhanced");
  const [ciphertext, setCiphertext] = useState("");
  const [dynamicKeys, setDynamicKeys] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const toast = useToast();

  const handleEncrypt = async () => {
    if (!plaintext || !keyword) return;
    toast.showToast("Encrypting message...", "info");
    try {
      // Call the real backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000'}/api/encrypt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: plaintext,
          keyword: keyword,
          rounds: parseInt(rounds),
          cipherType: cipherType,
        }),
      });

      if (!response.ok) {
        throw new Error('Encryption failed');
      }

      const data = await response.json();

      setCiphertext(data.ciphertext);
      setDynamicKeys(data.dynamicKeys || []);
      setShowResult(true);
      toast.showToast("Encryption complete", "success");
    } catch (error) {
      console.error('Encryption error:', error);
      toast.showToast("Encryption failed", "error");
    }
  };

  const handleClear = () => {
    setPlaintext("");
    setKeyword("");
    setCiphertext("");
    setDynamicKeys([]);
    setShowResult(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ciphertext);
    toast.showToast("Ciphertext copied to clipboard", "success");
  };

  return (
    <div className="min-h-screen gradient-bg py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/8 border border-primary/25 rounded-full px-5 py-2.5 mb-4 shadow-sm">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">Encryption Module</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Encrypt Your Message</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Secure your plaintext using enhanced Caesar cipher with dynamic key generation and
            multi-round encryption
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-strong h-full border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Key className="h-5 w-5 text-primary" />
                  <span>Encryption Configuration</span>
                </CardTitle>
                <CardDescription>Configure your encryption parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plaintext Input */}
                <div className="space-y-2">
                  <Label htmlFor="plaintext">Plaintext</Label>
                  <Textarea
                    id="plaintext"
                    placeholder="Enter your message to encrypt..."
                    value={plaintext}
                    onChange={(e) => setPlaintext(e.target.value)}
                    className="min-h-[150px] font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    {plaintext.length} characters
                  </p>
                </div>

                {/* Keyword Input */}
                <div className="space-y-2">
                  <Label htmlFor="keyword">Encryption Keyword</Label>
                  <Input
                    id="keyword"
                    placeholder="Enter keyword (e.g., SECRET)"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value.toUpperCase())}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for dynamic key generation
                  </p>
                </div>

                {/* Cipher Type Selector */}
                <div className="space-y-2">
                  <Label htmlFor="cipher-type" className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Cipher Type
                  </Label>
                  <Select value={cipherType} onValueChange={(value) => setCipherType(value || "enhanced")}>
                    <SelectTrigger id="cipher-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classical">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                          <span>Classical Caesar Cipher</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="enhanced">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          <span>Enhanced Caesar Cipher</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Enhanced offers multi-round encryption for better security
                  </p>
                </div>

                {/* Rounds Selector */}
                {cipherType === "enhanced" && (
                  <div className="space-y-2">
                    <Label htmlFor="rounds" className="flex items-center gap-2">
                      <RotateCcw className="h-4 w-4 text-primary" />
                      Encryption Rounds
                    </Label>
                    <Select value={rounds} onValueChange={(value) => setRounds(value || "3")}>
                      <SelectTrigger id="rounds">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Round</SelectItem>
                        <SelectItem value="2">2 Rounds</SelectItem>
                        <SelectItem value="3">
                          <div className="flex items-center gap-2">
                            <span>3 Rounds</span>
                            <Badge variant="secondary" className="text-xs">Recommended</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="4">4 Rounds</SelectItem>
                        <SelectItem value="5">
                          <div className="flex items-center gap-2">
                            <span>5 Rounds</span>
                            <Badge variant="secondary" className="text-xs">Max Security</Badge>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      More rounds = Higher security
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleEncrypt}
                    disabled={!plaintext || !keyword}
                    className="flex-1 font-semibold"
                    size="lg"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Encrypt
                  </Button>
                  <Button onClick={handleClear} variant="outline" size="lg" className="border-2">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Ciphertext Output */}
            <Card className="glass-strong border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Encrypted Output</span>
                </CardTitle>
                <CardDescription>Your encrypted ciphertext</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {showResult ? (
                  <>
                    <div className="relative">
                      <Textarea
                        value={ciphertext}
                        readOnly
                        className="min-h-[150px] font-mono bg-muted/50"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopy}
                        className="absolute top-2 right-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {ciphertext.length} characters
                    </p>
                  </>
                ) : (
                  <div className="min-h-[150px] flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <div className="text-center text-muted-foreground">
                      <Lock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Encrypted text will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dynamic Keys Display */}
            {showResult && dynamicKeys.length > 0 && (
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base text-foreground">
                    <Key className="h-4 w-4 text-primary" />
                    <span>Generated Dynamic Keys</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {dynamicKeys.map((key, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1.5 font-mono">
                        Round {index + 1}: {key}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Encryption Summary */}
            {showResult && (
              <Card className="glass border-primary/30 border-2 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base text-foreground">
                    <Info className="h-4 w-4 text-primary" />
                    <span>Encryption Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Cipher Type</span>
                    <span className="text-sm font-medium">
                      {cipherType === "enhanced" ? "Enhanced Caesar" : "Classical Caesar"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Encryption Rounds</span>
                    <span className="text-sm font-medium">{rounds}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Keyword Length</span>
                    <span className="text-sm font-medium">{keyword.length} characters</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Key Space</span>
                    <span className="text-sm font-medium text-primary">
                      26^{keyword.length} ≈{" "}
                      {Math.pow(26, Math.min(keyword.length, 6)).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
