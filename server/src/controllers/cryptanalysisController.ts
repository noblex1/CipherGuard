import { Request, Response } from 'express';
import { Cryptanalysis } from '../algorithms/cryptanalysis';
import AttackLog from '../models/AttackLog';

const bruteforce = async (req: Request, res: Response) => {
  try {
    const { ciphertext, maxAttempts } = req.body;
    if (!ciphertext) return res.status(400).json({ message: 'ciphertext required' });

    const start = Date.now();
    const result = Cryptanalysis.bruteForce(ciphertext, maxAttempts || 26);
    const end = Date.now();
    const executionTime = Number(((end - start) / 1000).toFixed(4));

    // Save attack log
    try {
      await AttackLog.create({
        ciphertext,
        attackType: 'bruteforce',
        duration: `${executionTime}s`,
        attempts: result.totalAttempts,
        success: false,
        result: 'Partial results',
        candidates: result.candidates.map((c) => ({ plaintext: c.plaintext, key: c.key, score: c.score, probability: c.probability })),
        executionTime,
      });
    } catch (err) {
      console.warn('Failed to save attack log', err);
    }

    return res.json({
      progress: 100,
      estimatedTime: Cryptanalysis.estimateAttackTime(308915776),
      candidates: result.candidates,
      totalAttempts: result.totalAttempts,
      executionTime,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Brute force failed' });
  }
};

const frequency = async (req: Request, res: Response) => {
  try {
    const { ciphertext } = req.body;
    if (!ciphertext) return res.status(400).json({ message: 'ciphertext required' });

    const start = Date.now();
    const result = Cryptanalysis.frequencyAnalysis(ciphertext);
    const end = Date.now();
    const executionTime = Number(((end - start) / 1000).toFixed(4));

    // Save attack log
    try {
      await AttackLog.create({
        ciphertext,
        attackType: 'frequency',
        duration: `${executionTime}s`,
        attempts: 0,
        success: false,
        result: 'Frequency analysis result',
        executionTime,
      });
    } catch (err) {
      console.warn('Failed to save attack log', err);
    }

    return res.json({ ...result, executionTime });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Frequency analysis failed' });
  }
};

const chisquare = async (req: Request, res: Response) => {
  try {
    const { ciphertext } = req.body;
    if (!ciphertext) return res.status(400).json({ message: 'ciphertext required' });

    const start = Date.now();
    const result = Cryptanalysis.chiSquareAnalysis(ciphertext);
    const end = Date.now();
    const executionTime = Number(((end - start) / 1000).toFixed(4));

    // Save attack log
    try {
      await AttackLog.create({
        ciphertext,
        attackType: 'chisquare',
        duration: `${executionTime}s`,
        attempts: result.candidates.length,
        success: false,
        result: result.bestMatch.plaintext,
        candidates: result.candidates.map((c) => ({ plaintext: c.plaintext, key: c.key, score: c.chiSquare, probability: c.probability })),
        executionTime,
      });
    } catch (err) {
      console.warn('Failed to save attack log', err);
    }

    return res.json({ ...result, executionTime });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Chi-square analysis failed' });
  }
};

export default { bruteforce, frequency, chisquare };
