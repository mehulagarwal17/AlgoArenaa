'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { user, loading, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error: any) {
      console.error('Failed to log out', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-bold">Welcome to your Dashboard</h1>
      <p className="mt-4 text-lg">You are logged in as {user.email}</p>
      <Button onClick={handleLogout} className="mt-8">
        Log Out
      </Button>
    </div>
  );
}
