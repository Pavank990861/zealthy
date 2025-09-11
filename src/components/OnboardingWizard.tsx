'use client';

import { useState, useEffect } from 'react';
import { FormData, ComponentType } from '@/types';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import ProgressIndicator from './ProgressIndicator';

interface OnboardingConfig {
  page_2_components: ComponentType[];
  page_3_components: ComponentType[];
}

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    about_me: '',
    street_address: '',
    city: '',
    state: '',
    zip: '',
    birthdate: ''
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [config, setConfig] = useState<OnboardingConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load configuration
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error('Error loading config:', data.error);
        } else {
          setConfig(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading config:', err);
        setLoading(false);
      });

    // Check if user exists in localStorage (for returning users)
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      fetch(`/api/users/${savedUserId}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            localStorage.removeItem('userId');
          } else {
            setUserId(data.id);
            setCurrentStep(data.current_step);
            setFormData({
              email: data.email,
              password: data.password,
              about_me: data.about_me || '',
              street_address: data.street_address || '',
              city: data.city || '',
              state: data.state || '',
              zip: data.zip || '',
              birthdate: data.birthdate || ''
            });
          }
        })
        .catch(err => {
          console.error('Error loading user:', err);
          localStorage.removeItem('userId');
        });
    }
  }, []);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleStep1Submit = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          current_step: 2
        })
      });

      const data = await response.json();
      
      if (data.error) {
        alert(data.error);
        return;
      }

      setUserId(data.id);
      localStorage.setItem('userId', data.id);
      setCurrentStep(2);
    } catch (error) {
      console.error('Error creating user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleStep2Submit = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          current_step: 3
        })
      });

      const data = await response.json();
      
      if (data.error) {
        alert(data.error);
        return;
      }

      setCurrentStep(3);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleStep3Submit = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          current_step: 4
        })
      });

      const data = await response.json();
      
      if (data.error) {
        alert(data.error);
        return;
      }

      alert('Onboarding completed successfully!');
      localStorage.removeItem('userId');
      // Reset form
      setFormData({
        email: '',
        password: '',
        about_me: '',
        street_address: '',
        city: '',
        state: '',
        zip: '',
        birthdate: ''
      });
      setCurrentStep(1);
      setUserId(null);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-red-400">Error loading configuration</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-8">
          <h1 className="text-3xl font-bold text-center text-white mb-8">
            Welcome to Zealthy
          </h1>
          
          <ProgressIndicator currentStep={currentStep} totalSteps={3} />
          
          <div className="mt-8">
            {currentStep === 1 && (
              <Step1 
                formData={formData} 
                updateFormData={updateFormData} 
                onSubmit={handleStep1Submit}
              />
            )}
            
            {currentStep === 2 && (
              <Step2 
                formData={formData} 
                updateFormData={updateFormData} 
                onSubmit={handleStep2Submit}
                components={config.page_2_components}
              />
            )}
            
            {currentStep === 3 && (
              <Step3 
                formData={formData} 
                updateFormData={updateFormData} 
                onSubmit={handleStep3Submit}
                components={config.page_3_components}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
