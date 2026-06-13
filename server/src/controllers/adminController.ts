import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import EncryptionLog from '../models/EncryptionLog';
import DecryptionLog from '../models/DecryptionLog';
import AttackLog from '../models/AttackLog';
import BenchmarkResult, { IBenchmarkResult } from '../models/BenchmarkResult';
import { CaesarCipher } from '../algorithms/caesarCipher';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const jwtSecret = process.env.JWT_SECRET || 'dev_secret';
    const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, jwtSecret, { expiresIn: '4h' });

    return res.json({ token, admin: { id: admin._id, email: admin.email, role: admin.role } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Login failed' });
  }
};

const dashboard = async (req: Request, res: Response) => {
  try {
    const totalEncryptions = await EncryptionLog.countDocuments();
    const totalDecryptions = await DecryptionLog.countDocuments();
    const totalAttacks = await AttackLog.countDocuments();
    const totalBenchmarks = await BenchmarkResult.countDocuments();

    type UsageTrend = { date: string; encryptions: number; decryptions: number; attacks: number };
    const usageTrends: UsageTrend[] = [];

    // Basic aggregation placeholders for frontend compatibility
    const dashboardStats = {
      totalEncryptions,
      totalDecryptions,
      totalAttacks,
      totalBenchmarks,
      avgEncryptionTime: '0.23s',
      avgDecryptionTime: '0.31s',
      avgAttackTime: '45.7s',
      successRate: '94.2%'
    };

    const encryptionHistory = await EncryptionLog.find().sort({ createdAt: -1 }).limit(10).lean();
    const decryptionHistory = await DecryptionLog.find().sort({ createdAt: -1 }).limit(10).lean();
    const attackHistory = await AttackLog.find().sort({ createdAt: -1 }).limit(10).lean();
    const benchmarkResultsRaw = await BenchmarkResult.find().sort({ createdAt: -1 }).limit(10).lean();
    const benchmarkResults = benchmarkResultsRaw as unknown as IBenchmarkResult[];
    const cipherUsageStats = benchmarkResults.map((b) => ({ name: b.cipherType || 'Unknown', value: 1 }));

    return res.json({ dashboardStats, usageTrends, cipherUsageStats, encryptionHistory, decryptionHistory, attackHistory, benchmarkResults });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to load dashboard' });
  }
};

// Simple report endpoints (stubbed)
const listReports = async (req: Request, res: Response) => {
  // Return summaries built from benchmarks
  const reports = (await BenchmarkResult.find().sort({ createdAt: -1 }).limit(20).lean()).map((b) => ({ id: b._id, timestamp: b.createdAt, cipherType: b.cipherType, summary: `${b.securityScore}/10` }));
  return res.json(reports);
};

const getReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const report = await BenchmarkResult.findById(id).lean();
  if (!report) return res.status(404).json({ message: 'Report not found' });
  return res.json(report);
};

const encryptionHistory = async (req: Request, res: Response) => {
  const items = await EncryptionLog.find().sort({ createdAt: -1 }).limit(50).lean();
  return res.json(items);
};

const decryptionHistory = async (req: Request, res: Response) => {
  const items = await DecryptionLog.find().sort({ createdAt: -1 }).limit(50).lean();
  return res.json(items);
};

const attackHistory = async (req: Request, res: Response) => {
  const items = await AttackLog.find().sort({ createdAt: -1 }).limit(50).lean();
  return res.json(items);
};

const benchmarks = async (req: Request, res: Response) => {
  const items = await BenchmarkResult.find().sort({ createdAt: -1 }).limit(50).lean();
  return res.json(items);
};

export default { login, dashboard, listReports, getReport, encryptionHistory, decryptionHistory, attackHistory, benchmarks };
