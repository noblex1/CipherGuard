import mongoose, { Document, Schema } from 'mongoose';

export interface IEncryptionLog extends Document {
  plaintext: string;
  ciphertext: string;
  keyword: string;
  rounds: number;
  cipherType: string;
  keySpace: string;
  dynamicKeys: string[];
  executionTime: number;
  ipAddress?: string;
  createdAt: Date;
}

const EncryptionLogSchema: Schema = new Schema(
  {
    plaintext: {
      type: String,
      required: true,
    },
    ciphertext: {
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
    keySpace: {
      type: String,
      required: true,
    },
    dynamicKeys: [
      {
        type: String,
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
EncryptionLogSchema.index({ createdAt: -1 });
EncryptionLogSchema.index({ cipherType: 1 });

export default mongoose.model<IEncryptionLog>('EncryptionLog', EncryptionLogSchema);
