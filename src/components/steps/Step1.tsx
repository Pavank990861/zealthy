'use client';

import { useState } from 'react';
import { FormData } from '@/types';

interface Step1Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onSubmit: () => void;
}

export default function Step1({ formData, updateFormData, onSubmit }: Step1Props) {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Create Your Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 ${
              errors.password ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 font-medium shadow-lg hover:shadow-blue-500/25"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
