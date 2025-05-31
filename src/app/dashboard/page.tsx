'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name}!</h2>
              <p className="text-gray-600">
                Your role is: <span className="font-medium">{session?.user?.role}</span>
              </p>
              <div className="mt-4">
                {session?.user?.role === 'admin' && (
                  <div className="bg-blue-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-blue-800">Admin Controls</h3>
                    <p className="text-blue-600 mt-2">
                      You have access to all administrative features.
                    </p>
                  </div>
                )}
                {session?.user?.role === 'doctor' && (
                  <div className="bg-green-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-green-800">Doctor Dashboard</h3>
                    <p className="text-green-600 mt-2">
                      Manage your patients and appointments here.
                    </p>
                  </div>
                )}
                {session?.user?.role === 'patient' && (
                  <div className="bg-purple-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-purple-800">Patient Dashboard</h3>
                    <p className="text-purple-600 mt-2">
                      View your appointments and health records here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 