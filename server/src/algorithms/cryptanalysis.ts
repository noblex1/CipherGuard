/**
 * Cryptanalysis Algorithms
 * Implements brute force, frequency analysis, and chi-square testing
 */

import { CaesarCipher } from './caesarCipher';

// English letter frequency distribution (percentage)
const ENGLISH_FREQ: { [key: string]: number } = {
  A: 8.2, B: 1.5, C: 2.8, D: 4.3, E: 12.7, F: 2.2, G: 2.0,
  H: 6.1, I: 7.0, J: 0.15, K: 0.77, L: 4.0, M: 2.4, N: 6.7,
  O: 7.5, P: 1.9, Q: 0.095, R: 6.0, S: 6.3, T: 9.1, U: 2.8,
  V: 0.98, W: 2.4, X: 0.15, Y: 2.0, Z: 0.074,
};

export class Cryptanalysis {
  /**
   * Calculate letter frequency in text
   */
  private static calculateFrequency(text: string): { [key: string]: number } {
    const freq: { [key: string]: number } = {};
    const upperText = text.toUpperCase();
    let totalLetters = 0;

    // Initialize all letters to 0
    for (let i = 65; i <= 90; i++) {
      freq[String.fromCharCode(i)] = 0;
    }

    // Count letter occurrences
    for (const char of upperText) {
      if (char >= 'A' && char <= 'Z') {
        freq[char]++;
        totalLetters++;
      }
    }

    // Convert to percentages
    if (totalLetters > 0) {
      for (const letter in freq) {
        freq[letter] = (freq[letter] / totalLetters) * 100;
      }
    }

    return freq;
  }

  /**
   * Calculate chi-square statistic for text
   * Lower value indicates better match to English
   */
  private static calculateChiSquare(text: string): number {
    const observed = this.calculateFrequency(text);
    let chiSquare = 0;

    for (const letter in ENGLISH_FREQ) {
      const expected = ENGLISH_FREQ[letter];
      const obs = observed[letter] || 0;
      chiSquare += Math.pow(obs - expected, 2) / expected;
    }

    return chiSquare;
  }

  /**
   * Score text based on English-like qualities
   * Higher score = more likely to be correct plaintext
   */
  private static scoreText(text: string): number {
    const chiSquare = this.calculateChiSquare(text);
    
    // Lower chi-square is better, convert to score (0-100)
    // Chi-square < 50 is very good, < 100 is decent
    const score = Math.max(0, 100 - chiSquare);
    
    return score;
  }

  /**
   * Brute Force Attack
   * Try all possible single-shift Caesar ciphers
   */
  public static bruteForce(ciphertext: string, maxAttempts = 26): {
    candidates: Array<{
      plaintext: string;
      key: string;
      score: number;
      probability: string;
    }>;
    totalAttempts: number;
  } {
    const candidates: Array<{
      plaintext: string;
      key: string;
      score: number;
      probability: string;
    }> = [];

    // Try all possible shifts (0-25)
    for (let shift = 0; shift < Math.min(26, maxAttempts); shift++) {
      let decrypted = '';
      
      for (const char of ciphertext) {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          // Uppercase
          decrypted += String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          // Lowercase
          decrypted += String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
        } else {
          decrypted += char;
        }
      }

      const score = this.scoreText(decrypted);
      candidates.push({
        plaintext: decrypted,
        key: `SHIFT-${shift}`,
        score: Math.round(score * 100) / 100,
        probability: `${Math.min(99.9, score).toFixed(1)}%`,
      });
    }

    // Sort by score (highest first)
    candidates.sort((a, b) => b.score - a.score);

    return {
      candidates: candidates.slice(0, 10), // Return top 10
      totalAttempts: Math.min(26, maxAttempts),
    };
  }

  /**
   * Frequency Analysis Attack
   * Analyze letter distribution and compare to English
   */
  public static frequencyAnalysis(ciphertext: string): {
    letterFrequencies: Array<{
      letter: string;
      frequency: number;
      expected: number;
    }>;
    correlationScore: number;
    patternMatch: number;
    attackConfidence: number;
  } {
    const observed = this.calculateFrequency(ciphertext);
    const frequencies: Array<{
      letter: string;
      frequency: number;
      expected: number;
    }> = [];

    let totalDifference = 0;
    let maxDifference = 0;

    // Build frequency comparison
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const freq = observed[letter] || 0;
      const expected = ENGLISH_FREQ[letter] || 0;
      const diff = Math.abs(freq - expected);

      frequencies.push({
        letter,
        frequency: Math.round(freq * 100) / 100,
        expected: Math.round(expected * 100) / 100,
      });

      totalDifference += diff;
      maxDifference = Math.max(maxDifference, diff);
    }

    // Calculate correlation score (0-100, higher is better match to English)
    const correlationScore = Math.max(
      0,
      100 - (totalDifference / Object.keys(ENGLISH_FREQ).length)
    );

    // Pattern match based on chi-square
    const chiSquare = this.calculateChiSquare(ciphertext);
    const patternMatch = Math.max(0, 100 - chiSquare);

    // Attack confidence (for enhanced cipher, should be low)
    const attackConfidence = (correlationScore + patternMatch) / 2;

    return {
      letterFrequencies: frequencies,
      correlationScore: Math.round(correlationScore * 10) / 10,
      patternMatch: Math.round(patternMatch * 10) / 10,
      attackConfidence: Math.round(attackConfidence * 10) / 10,
    };
  }

  /**
   * Chi-Square Analysis Attack
   * Statistical analysis to find most probable plaintext
   */
  public static chiSquareAnalysis(ciphertext: string): {
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
  } {
    const results: Array<{
      plaintext: string;
      chiSquare: number;
      key: string;
    }> = [];

    // Try all possible shifts
    for (let shift = 0; shift < 26; shift++) {
      let decrypted = '';
      
      for (const char of ciphertext) {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          decrypted += String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          decrypted += String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
        } else {
          decrypted += char;
        }
      }

      const chiSquare = this.calculateChiSquare(decrypted);
      results.push({
        plaintext: decrypted,
        chiSquare: Math.round(chiSquare * 10) / 10,
        key: `SHIFT-${shift}`,
      });
    }

    // Sort by chi-square (lowest = best match)
    results.sort((a, b) => a.chiSquare - b.chiSquare);

    // Calculate probabilities based on chi-square values
    const totalChiSquare = results.reduce((sum, r) => sum + (1 / (r.chiSquare + 1)), 0);

    const candidates = results.slice(0, 5).map((result, index) => {
      const probability = ((1 / (result.chiSquare + 1)) / totalChiSquare) * 100;
      return {
        rank: index + 1,
        plaintext: result.plaintext,
        chiSquare: result.chiSquare,
        probability: `${Math.min(99.9, probability).toFixed(1)}%`,
        key: result.key,
      };
    });

    const overallChiSquare = this.calculateChiSquare(ciphertext);

    return {
      chiSquareScore: Math.round(overallChiSquare * 10) / 10,
      candidates,
      bestMatch: {
        plaintext: results[0].plaintext,
        key: results[0].key,
        score: results[0].chiSquare,
      },
    };
  }

  /**
   * Estimate attack time based on cipher parameters
   */
  public static estimateAttackTime(keySpace: number): string {
    // Assume 1 million attempts per second
    const attemptsPerSecond = 1000000;
    const seconds = keySpace / attemptsPerSecond;

    if (seconds < 1) {
      return '< 1s';
    } else if (seconds < 60) {
      return `${Math.ceil(seconds)}s`;
    } else if (seconds < 3600) {
      return `${Math.ceil(seconds / 60)}m`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.ceil((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days}d`;
    }
  }
}
