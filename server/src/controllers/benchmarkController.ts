import { Request, Response } from 'express';
import BenchmarkResult, { IBenchmarkResult } from '../models/BenchmarkResult';
import { CaesarCipher } from '../algorithms/caesarCipher';
import { Cryptanalysis } from '../algorithms/cryptanalysis';

const runBenchmark = async (req: Request, res: Response) => {
  try {
    const { sizes = [20, 50, 200, 500], keyword = 'SECRET', rounds = 3, cipherType = 'enhanced' } = req.body;

    const results: IBenchmarkResult[] = [];

    for (const size of sizes) {
      // generate random plaintext of given size (A-Z)
      const plaintext = Array.from({ length: size }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');

      let ciphertext = '';
      if (cipherType === 'classical') {
        ciphertext = CaesarCipher.classicalEncrypt(plaintext);
      } else {
        const enc = CaesarCipher.enhancedEncrypt(plaintext, keyword, rounds);
        ciphertext = enc.ciphertext;
      }

      // Chi-square analysis
      const chi = Cryptanalysis.chiSquareAnalysis(ciphertext);

      // Estimate key space number
      const keySpaceNum = Math.pow(26, Math.min((keyword || '').length * (rounds || 1), 6));
      const estimatedBreak = Cryptanalysis.estimateAttackTime(keySpaceNum);

      // Security score heuristic: based on chi-square and keySpace
      const securityScore = Math.min(10, Math.max(0, Math.round((chi.bestMatch?.score ? 10 - chi.bestMatch.score / 100 : 5) * 10) / 10));

      const entry = await BenchmarkResult.create({
        cipherType: cipherType === 'enhanced' ? `Enhanced (${rounds} rounds)` : 'Classical Caesar',
        keySpace: keySpaceNum,
        avgBreakTime: estimatedBreak,
        successRate: 'N/A',
        chiSquareDistance: chi.chiSquareScore,
        securityScore,
        testSize: size,
        rounds,
      });

      results.push(entry);
    }

    return res.json({ results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Benchmark run failed' });
  }
};

const getBenchmark = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await BenchmarkResult.findById(id).lean();
    if (!item) return res.status(404).json({ message: 'Benchmark not found' });
    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to retrieve benchmark' });
  }
};

export default { runBenchmark, getBenchmark };
