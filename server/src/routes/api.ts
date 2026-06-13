import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import encryptController from '../controllers/encryptController';
import decryptController from '../controllers/decryptController';
import cryptanalysisController from '../controllers/cryptanalysisController';
import adminController from '../controllers/adminController';
import benchmarkController from '../controllers/benchmarkController';
import analyticsController from '../controllers/analyticsController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// Public endpoints
router.post(
	'/encrypt',
	[
		body('text').isString().notEmpty(),
		body('keyword').isString().notEmpty(),
		body('rounds').optional().isInt({ min: 1, max: 5 }),
		body('cipherType').optional().isIn(['classical', 'enhanced']),
	],
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		return encryptController.encrypt(req, res);
	}
);

router.post(
	'/decrypt',
	[body('text').isString().notEmpty(), body('keyword').isString().notEmpty(), body('rounds').optional().isInt({ min: 1, max: 5 })],
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		return decryptController.decrypt(req, res);
	}
);

router.post(
	'/cryptanalysis/bruteforce',
	[body('ciphertext').isString().notEmpty()],
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		return cryptanalysisController.bruteforce(req, res);
	}
);

router.post(
	'/cryptanalysis/frequency',
	[body('ciphertext').isString().notEmpty()],
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		return cryptanalysisController.frequency(req, res);
	}
);

router.post(
	'/cryptanalysis/chisquare',
	[body('ciphertext').isString().notEmpty()],
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		return cryptanalysisController.chisquare(req, res);
	}
);

// Public analytics
router.get('/analytics', analyticsController.getAnalytics);

// Reports and benchmarks (public listing)
router.get('/reports', adminController.listReports);
router.get('/reports/:id', adminController.getReport);

// Admin authentication
router.post('/admin/login', adminController.login);

// Protected admin routes
router.get('/admin/dashboard', authenticateAdmin, adminController.dashboard);
router.get('/admin/encryption-history', authenticateAdmin, adminController.encryptionHistory);
router.get('/admin/decryption-history', authenticateAdmin, adminController.decryptionHistory);
router.get('/admin/attack-history', authenticateAdmin, adminController.attackHistory);
router.get('/admin/benchmarks', authenticateAdmin, adminController.benchmarks);

// Benchmarking
router.post('/benchmark/run', authenticateAdmin, benchmarkController.runBenchmark);
router.get('/benchmark/:id', authenticateAdmin, benchmarkController.getBenchmark);

export default router;

