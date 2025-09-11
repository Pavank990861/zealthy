'use client';

import { FormData } from '@/types';

interface AddressComponentProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export default function AddressComponent({ formData, updateFormData, errors }: AddressComponentProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-white mb-4">Address Information</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="street_address" className="block text-sm font-medium text-gray-300 mb-2">
            Street Address
          </label>
          <input
            type="text"
            id="street_address"
            value={formData.street_address}
            onChange={(e) => updateFormData({ street_address: e.target.value })}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 ${
              errors.street_address ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Enter your street address"
          />
          {errors.street_address && (
            <p className="mt-1 text-sm text-red-400">{errors.street_address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 ${
                errors.city ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Enter your city"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-400">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-2">
              State
            </label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={(e) => updateFormData({ state: e.target.value })}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 ${
                errors.state ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Enter your state"
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-400">{errors.state}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-300 mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            id="zip"
            value={formData.zip}
            onChange={(e) => updateFormData({ zip: e.target.value })}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 ${
              errors.zip ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Enter your ZIP code"
          />
          {errors.zip && (
            <p className="mt-1 text-sm text-red-400">{errors.zip}</p>
          )}
        </div>
      </div>
    </div>
  );
}
