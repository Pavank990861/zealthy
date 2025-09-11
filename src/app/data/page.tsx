'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from '@/types';

export default function DataPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setUsers(data);
      }
    } catch {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStepStatus = (step: number) => {
    switch (step) {
      case 1: return { text: 'Step 1 - Account Creation', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' };
      case 2: return { text: 'Step 2 - Profile Info', color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' };
      case 3: return { text: 'Step 3 - Additional Info', color: 'bg-orange-500/20 text-orange-400 border border-orange-500/30' };
      case 4: return { text: 'Completed', color: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' };
      default: return { text: 'Unknown', color: 'bg-gray-500/20 text-gray-400 border border-gray-500/30' };
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    setDeletingId(userId);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.error) {
        alert(data.error);
        return;
      }

      // Remove user from local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-red-400 text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">User Data</h1>
            <div className="flex gap-4">
              <button
                onClick={fetchUsers}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
              <Link
                href="/"
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Onboarding
              </Link>
            </div>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No users found. Start the onboarding process to see data here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Profile Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                  {users.map((user) => {
                    const stepStatus = getStepStatus(user.current_step);
                    return (
                      <tr key={user.id} className="hover:bg-gray-800 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">{user.email}</div>
                            <div className="text-sm text-gray-400">ID: {user.id.substring(0, 8)}...</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stepStatus.color}`}>
                            {stepStatus.text}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-300 space-y-1">
                            {user.about_me && (
                              <div>
                                <span className="font-medium text-white">About:</span> {user.about_me.substring(0, 50)}
                                {user.about_me.length > 50 && '...'}
                              </div>
                            )}
                            {(user.street_address || user.city || user.state || user.zip) && (
                              <div>
                                <span className="font-medium text-white">Address:</span> {[
                                  user.street_address,
                                  user.city,
                                  user.state,
                                  user.zip
                                ].filter(Boolean).join(', ')}
                              </div>
                            )}
                            {user.birthdate && (
                              <div>
                                <span className="font-medium text-white">Birthdate:</span> {user.birthdate}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(user.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={deletingId === user.id}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {deletingId === user.id ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                              </>
                            ) : (
                              <>
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>Total users: {users.length}</p>
            <p className="mt-2">
              This page shows all user data from the database. Refresh to see new entries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
