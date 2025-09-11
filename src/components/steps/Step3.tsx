'use client';

import { useState } from 'react';
import { FormData, ComponentType } from '@/types';
import AboutMeComponent from '../components/AboutMeComponent';
import AddressComponent from '../components/AddressComponent';
import BirthdateComponent from '../components/BirthdateComponent';

interface Step3Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onSubmit: () => void;
  components: ComponentType[];
}

export default function Step3({ formData, updateFormData, onSubmit, components }: Step3Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    components.forEach(component => {
      if (component === 'about_me' && !formData.about_me.trim()) {
        newErrors.about_me = 'About Me is required';
      }
      if (component === 'address') {
        if (!formData.street_address.trim()) newErrors.street_address = 'Street address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
      }
      if (component === 'birthdate' && !formData.birthdate) {
        newErrors.birthdate = 'Birthdate is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  const renderComponent = (component: ComponentType) => {
    switch (component) {
      case 'about_me':
        return (
          <AboutMeComponent
            value={formData.about_me}
            onChange={(value) => updateFormData({ about_me: value })}
            error={errors.about_me}
          />
        );
      case 'address':
        return (
          <AddressComponent
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 'birthdate':
        return (
          <BirthdateComponent
            value={formData.birthdate}
            onChange={(value) => updateFormData({ birthdate: value })}
            error={errors.birthdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Complete Your Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {components.map((component, index) => (
          <div key={component}>
            {renderComponent(component)}
            {index < components.length - 1 && <hr className="my-6 border-gray-700" />}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 font-medium shadow-lg hover:shadow-emerald-500/25"
        >
          Complete Onboarding
        </button>
      </form>
    </div>
  );
}
