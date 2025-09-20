'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-bold">Welcome to your Dashboard</h1>
      <p className="mt-4 text-lg">You are now logged in.</p>
      <Button onClick={handleLogout} className="mt-8">
        Log Out
      </Button>
    </div>
  );
}
