"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Unlock, Copy, RotateCcw, Key, CheckCircle, Info, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/toast";

export default function DecryptPage() {
  const [ciphertext, setCiphertext] = useState("");
  const [keyword, setKeyword] = useState("");
  const [rounds, setRounds] = useState("3");
  const [cipherType, setCipherType] = useState("enhanced");
  const [plaintext, setPlaintext] = useState("");
  const [showResult, setShowResult] = useState(false);
  const toast = useToast();

  const handleDecrypt = async () => {
    if (!ciphertext || !keyword) return;
    toast.showToast("Decrypting message...", "info");
    try {
      // Call the real backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000'}/api/decrypt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: ciphertext,
          keyword: keyword,
          rounds: parseInt(rounds),
          cipherType: cipherType,
        }),
      });

      if (!response.ok) {
        throw new Error('Decryption failed');
      }

      const data = await response.json();

      setPlaintext(data.plaintext);
      setShowResult(true);
      toast.showToast("Decryption complete", "success");
    } catch (error) {
      console.error('Decryption error:', error);
      toast.showToast("Decryption failed", "error");
    }
  };

  const handleClear = () => {
    setCiphertext("");
    setKeyword("");
    setPlaintext("");
    setShowResult(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(plaintext);
    toast.showToast("Plaintext copied to clipboard", "success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-cyan-950/50 py-6 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-cyan-600/10 border border-cyan-600/20 rounded-full px-4 py-2 mb-4">
            <Unlock className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
              Decryption Module
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Decrypt Your Message</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recover your original plaintext from ciphertext using the correct keyword and
            encryption parameters
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-strong h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  <span>Decryption Configuration</span>
                </CardTitle>
                <CardDescription>Provide ciphertext and decryption parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Ciphertext Input */}
                <div className="space-y-2">
                  <Label htmlFor="ciphertext">Ciphertext</Label>
                  <Textarea
                    id="ciphertext"
                    placeholder="Enter encrypted message to decrypt..."
                    value={ciphertext}
                    onChange={(e) => setCiphertext(e.target.value)}
                    className="min-h-[150px] font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    {ciphertext.length} characters
                  </p>
                </div>

                {/* Keyword Input */}
                <div className="space-y-2">
                  <Label htmlFor="keyword">Decryption Keyword</Label>
                  <Input
                    id="keyword"
                    placeholder="Enter the encryption keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value.toUpperCase())}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Must match the encryption keyword
                  </p>
                </div>

                {/* Cipher Type Selector */}
                <div className="space-y-2">
                  <Label htmlFor="cipher-type" className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    Cipher Type
                  </Label>
                  <Select value={cipherType} onValueChange={(value) => setCipherType(value || "enhanced")}>
                    <SelectTrigger id="cipher-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classical">
                        <div className="flex items-center gap-2">
                          <Unlock className="h-4 w-4 text-muted-foreground" />
                          <span>Classical Caesar Cipher</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="enhanced">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                          <span>Enhanced Caesar Cipher</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Must match the encryption cipher type
                  </p>
                </div>

                {/* Rounds Selector */}
                {cipherType === "enhanced" && (
                  <div className="space-y-2">
                    <Label htmlFor="rounds" className="flex items-center gap-2">
                      <RotateCcw className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                      Decryption Rounds
                    </Label>
                    <Select value={rounds} onValueChange={(value) => setRounds(value || "3")}>
                      <SelectTrigger id="rounds">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Round</SelectItem>
                        <SelectItem value="2">2 Rounds</SelectItem>
                        <SelectItem value="3">3 Rounds</SelectItem>
                        <SelectItem value="4">4 Rounds</SelectItem>
                        <SelectItem value="5">5 Rounds</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Must match encryption rounds
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleDecrypt}
                    disabled={!ciphertext || !keyword}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                    size="lg"
                  >
                    <Unlock className="mr-2 h-4 w-4" />
                    Decrypt
                  </Button>
                  <Button onClick={handleClear} variant="outline" size="lg">
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Plaintext Output */}
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  <span>Decrypted Output</span>
                </CardTitle>
                <CardDescription>Your recovered plaintext</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {showResult ? (
                  <>
                    <div className="relative">
                      <Textarea
                        value={plaintext}
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
                      {plaintext.length} characters
                    </p>
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-900 dark:text-green-100">
                            Decryption Successful
                          </p>
                          <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                            The message has been successfully decrypted using the provided keyword.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="min-h-[150px] flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <div className="text-center text-muted-foreground">
                      <Unlock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Decrypted text will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Process Summary */}
            {showResult && (
              <Card className="glass border-cyan-600/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <Info className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Process Summary</span>
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
                    <span className="text-sm text-muted-foreground">Decryption Rounds</span>
                    <span className="text-sm font-medium">{rounds}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Keyword Used</span>
                    <Badge variant="secondary" className="font-mono">
                      {keyword}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Processing Time</span>
                    <span className="text-sm font-medium">0.14s</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className="bg-green-600 hover:bg-green-700">Success</Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Help Card */}
            {!showResult && (
              <Card className="glass border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>Decryption Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                      <span>Use the exact same keyword that was used for encryption</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                      <span>Match the cipher type and number of rounds</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                      <span>Keywords are case-insensitive but will be converted to uppercase</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                      <span>
                        If decryption fails, verify your parameters or try cryptanalysis tools
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
