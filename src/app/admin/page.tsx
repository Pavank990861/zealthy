'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ComponentType } from '@/types';

export default function AdminPage() {
  const [page2Components, setPage2Components] = useState<ComponentType[]>([]);
  const [page3Components, setPage3Components] = useState<ComponentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const availableComponents: ComponentType[] = ['about_me', 'address', 'birthdate'];

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/config');
      const data = await response.json();
      
      if (data.error) {
        setMessage({ type: 'error', text: data.error });
      } else {
        setPage2Components(data.page_2_components);
        setPage3Components(data.page_3_components);
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to load configuration' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (page2Components.length === 0 || page3Components.length === 0) {
      setMessage({ type: 'error', text: 'Each page must have at least one component' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_2_components: page2Components,
          page_3_components: page3Components
        })
      });

      const data = await response.json();
      
      if (data.error) {
        setMessage({ type: 'error', text: data.error });
      } else {
        setMessage({ type: 'success', text: 'Configuration saved successfully!' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to save configuration' });
    } finally {
      setSaving(false);
    }
  };

  const moveComponent = (component: ComponentType, fromPage: 2 | 3, toPage: 2 | 3) => {
    if (fromPage === toPage) return;

    if (fromPage === 2) {
      const newPage2 = page2Components.filter(c => c !== component);
      const newPage3 = [...page3Components, component];
      
      if (newPage2.length === 0) {
        setMessage({ type: 'error', text: 'Page 2 must have at least one component' });
        return;
      }
      
      setPage2Components(newPage2);
      setPage3Components(newPage3);
    } else {
      const newPage3 = page3Components.filter(c => c !== component);
      const newPage2 = [...page2Components, component];
      
      if (newPage3.length === 0) {
        setMessage({ type: 'error', text: 'Page 3 must have at least one component' });
        return;
      }
      
      setPage3Components(newPage3);
      setPage2Components(newPage2);
    }
    
    setMessage(null);
  };

  const getComponentLabel = (component: ComponentType) => {
    switch (component) {
      case 'about_me': return 'About Me';
      case 'address': return 'Address';
      case 'birthdate': return 'Birthdate';
      default: return component;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Configuration</h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Onboarding
            </Link>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-md ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Page 2 Configuration */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Page 2 Components</h2>
              <div className="space-y-3">
                {page2Components.map((component) => (
                  <div
                    key={component}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-md"
                  >
                    <span className="font-medium text-blue-900">
                      {getComponentLabel(component)}
                    </span>
                    <button
                      onClick={() => moveComponent(component, 2, 3)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Move to Page 3 →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Page 3 Configuration */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Page 3 Components</h2>
              <div className="space-y-3">
                {page3Components.map((component) => (
                  <div
                    key={component}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-md"
                  >
                    <span className="font-medium text-green-900">
                      {getComponentLabel(component)}
                    </span>
                    <button
                      onClick={() => moveComponent(component, 3, 2)}
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      ← Move to Page 2
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Available Components */}
          <div className="mt-8 border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableComponents.map((component) => {
                const isInPage2 = page2Components.includes(component);
                const isInPage3 = page3Components.includes(component);
                const isUsed = isInPage2 || isInPage3;
                
                return (
                  <div
                    key={component}
                    className={`p-4 rounded-md border ${
                      isUsed 
                        ? 'bg-gray-50 border-gray-200 text-gray-500' 
                        : 'bg-white border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <h3 className="font-medium text-gray-900 mb-2">
                        {getComponentLabel(component)}
                      </h3>
                      {isUsed ? (
                        <span className="text-sm text-gray-500">
                          {isInPage2 ? 'Used in Page 2' : 'Used in Page 3'}
                        </span>
                      ) : (
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              setPage2Components([...page2Components, component]);
                              setMessage(null);
                            }}
                            className="w-full text-sm bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                          >
                            Add to Page 2
                          </button>
                          <button
                            onClick={() => {
                              setPage3Components([...page3Components, component]);
                              setMessage(null);
                            }}
                            className="w-full text-sm bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                          >
                            Add to Page 3
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
