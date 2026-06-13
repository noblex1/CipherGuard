import mongoose, { Document, Schema } from 'mongoose';

export interface IDecryptionLog extends Document {
  ciphertext: string;
  plaintext: string;
  keyword: string;
  rounds: number;
  cipherType: string;
  success: boolean;
  executionTime: number;
  ipAddress?: string;
  createdAt: Date;
}

const DecryptionLogSchema: Schema = new Schema(
  {
    ciphertext: {
      type: String,
      required: true,
    },
    plaintext: {
      type: String,
      required: true,
    },
    keyword: {
      type: String,
      required: true,
    },
    rounds: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    cipherType: {
      type: String,
      required: true,
      enum: ['classical', 'enhanced'],
    },
    success: {
      type: Boolean,
      required: true,
      default: true,
    },
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
DecryptionLogSchema.index({ createdAt: -1 });
DecryptionLogSchema.index({ success: 1 });

export default mongoose.model<IDecryptionLog>('DecryptionLog', DecryptionLogSchema);
