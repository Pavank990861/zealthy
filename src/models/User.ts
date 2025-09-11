import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  about_me?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip?: string;
  birthdate?: string;
  current_step: number;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  about_me: {
    type: String,
    default: ''
  },
  street_address: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  zip: {
    type: String,
    default: ''
  },
  birthdate: {
    type: String,
    default: ''
  },
  current_step: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'users'
});

// Create indexes for better performance
UserSchema.index({ email: 1 });
UserSchema.index({ created_at: -1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
