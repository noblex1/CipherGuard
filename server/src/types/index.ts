import { Request } from 'express';

// Extended Request with user information
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Encryption Types
export interface EncryptRequest {
  text: string;
  keyword: string;
  rounds: number;
  cipherType: 'classical' | 'enhanced';
}

export interface EncryptResponse {
  ciphertext: string;
  dynamicKeys: string[];
  executionTime: number;
  summary: {
    cipherType: string;
    rounds: number;
    keywordLength: number;
    keySpace: string;
    textLength: number;
  };
}

// Decryption Types
export interface DecryptRequest {
  text: string;
  keyword: string;
  rounds: number;
  cipherType: 'classical' | 'enhanced';
}

export interface DecryptResponse {
  plaintext: string;
  executionTime: number;
  success: boolean;
  summary: {
    cipherType: string;
    rounds: number;
    keyword: string;
    processingTime: string;
  };
}

// Cryptanalysis Types
export interface BruteForceRequest {
  ciphertext: string;
  maxAttempts?: number;
}

export interface BruteForceResponse {
  progress: number;
  estimatedTime: string;
  candidates: Array<{
    plaintext: string;
    key: string;
    score: number;
    probability: string;
  }>;
  totalAttempts: number;
  executionTime: number;
}

export interface FrequencyAnalysisRequest {
  ciphertext: string;
}

export interface FrequencyAnalysisResponse {
  letterFrequencies: Array<{
    letter: string;
    frequency: number;
    expected: number;
  }>;
  correlationScore: number;
  patternMatch: number;
  attackConfidence: number;
  executionTime: number;
}

export interface ChiSquareRequest {
  ciphertext: string;
}

export interface ChiSquareResponse {
  chiSquareScore: number;
  candidates: Array<{
    rank: number;
    plaintext: string;
    chiSquare: number;
    probability: string;
    key: string;
  }>;
  bestMatch: {
    plaintext: string;
    key: string;
    score: number;
  };
  executionTime: number;
}

// Analytics Types
export interface AnalyticsResponse {
  totalEncryptions: number;
  totalDecryptions: number;
  totalAttacks: number;
  totalBenchmarks: number;
  securityScores: Array<{
    rounds: number;
    score: number;
    label: string;
  }>;
  benchmarkResults: Array<{
    id: string;
    cipherType: string;
    keySpace: number;
    avgBreakTime: string;
    successRate: string;
    chiSquareDistance: number;
    securityScore: number;
  }>;
}

// Admin Types
export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
  admin: {
    id: string;
    email: string;
    role: string;
  };
}
