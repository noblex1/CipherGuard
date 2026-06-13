import mongoose, { Document, Schema } from 'mongoose';

export interface IBenchmarkResult extends Document {
  cipherType: string;
  keySpace: number;
  avgBreakTime: string;
  successRate: string;
  chiSquareDistance: number;
  securityScore: number;
  testSize: number;
  rounds?: number;
  createdAt: Date;
}

const BenchmarkResultSchema: Schema = new Schema(
  {
    cipherType: {
      type: String,
      required: true,
    },
    keySpace: {
      type: Number,
      required: true,
    },
    avgBreakTime: {
      type: String,
      required: true,
    },
    successRate: {
      type: String,
      required: true,
    },
    chiSquareDistance: {
      type: Number,
      required: true,
    },
    securityScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    testSize: {
      type: Number,
      required: true,
    },
    rounds: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
BenchmarkResultSchema.index({ createdAt: -1 });
BenchmarkResultSchema.index({ securityScore: -1 });

export default mongoose.model<IBenchmarkResult>('BenchmarkResult', BenchmarkResultSchema);
