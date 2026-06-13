import mongoose, { Document, Schema } from 'mongoose';

export interface IAttackLog extends Document {
  ciphertext: string;
  attackType: string;
  duration: string;
  attempts: number;
  success: boolean;
  result: string;
  candidates?: Array<{
    plaintext: string;
    key: string;
    score: number;
    probability: string;
  }>;
  executionTime: number;
  ipAddress?: string;
  createdAt: Date;
}

const AttackLogSchema: Schema = new Schema(
  {
    ciphertext: {
      type: String,
      required: true,
    },
    attackType: {
      type: String,
      required: true,
      enum: ['bruteforce', 'frequency', 'chisquare'],
    },
    duration: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      required: true,
    },
    success: {
      type: Boolean,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    candidates: [
      {
        plaintext: String,
        key: String,
        score: Number,
        probability: String,
      },
    ],
    executionTime: {
      type: Number,
      required: true,
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
AttackLogSchema.index({ createdAt: -1 });
AttackLogSchema.index({ attackType: 1 });
AttackLogSchema.index({ success: 1 });

export default mongoose.model<IAttackLog>('AttackLog', AttackLogSchema);
