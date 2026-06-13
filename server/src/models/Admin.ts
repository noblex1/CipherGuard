import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    role: {
      type: String,
      default: 'admin',
      enum: ['admin'],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
AdminSchema.pre('save', async function (this: IAdmin, next: (err?: any) => void) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt: string = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

// Method to compare passwords
AdminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IAdmin>('Admin', AdminSchema);
