import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';

export const authenticateAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'No token provided. Authorization denied.',
      });
      return;
    }

    const token = authHeader.substring(7);

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'No token provided. Authorization denied.',
      });
      return;
    }

    // Verify token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not configured');
    }

    const decoded = jwt.verify(token, jwtSecret) as {
      id: string;
      email: string;
      role: string;
    };

    // Check if admin role
    if (decoded.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.',
      });
      return;
    }

    // Attach user to request
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.',
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: 'Invalid token. Authorization denied.',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Server error during authentication.',
    });
  }
};
