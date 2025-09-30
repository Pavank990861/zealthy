import mongoose, { Document, Schema } from 'mongoose';

export interface IOnboardingConfig extends Document {
  _id: string;
  page_2_components: string[];
  page_3_components: string[];
  createdAt: Date;
  updatedAt: Date;
}

const OnboardingConfigSchema = new Schema<IOnboardingConfig>({
  page_2_components: {
    type: [String],
    required: true,
    default: ['about_me', 'birthdate']
  },
  page_3_components: {
    type: [String],
    required: true,
    default: ['address']
  }
}, {
  timestamps: true,
  collection: 'onboarding_config'
});

export default mongoose.models.OnboardingConfig || mongoose.model<IOnboardingConfig>('OnboardingConfig', OnboardingConfigSchema);
