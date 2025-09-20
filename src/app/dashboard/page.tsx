'use client';

import {
  Activity,
  ArrowUpRight,
  BarChart,
  Book,
  Bot,
  ChevronLeft,
  ChevronRight,
  Code,
  CreditCard,
  Crown,
  File,
  Home,
  Inbox,
  LayoutGrid,
  LineChart,
  Menu,
  MoreVertical,
  Settings,
  Shield,
  Star,
  Swords,
  Trophy,
  User,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import React, { useState, useEffect } from 'react';

const statsCards = [
  {
    title: 'Experience Points',
    value: '2,450 XP',
    trend: '+120 This Week',
    icon: Star,
    color: 'text-yellow-400',
  },
  {
    title: 'Problems Solved',
    value: '47',
    trend: '+3 This Week',
    icon: Code,
    color: 'text-green-400',
  },
  {
    title: 'Battles Won',
    value: '23',
    trend: '+2 This Week',
    icon: Swords,
    color: 'text-red-400',
  },
  {
    title: 'Global Rank',
    value: '#42',
    trend: '+5 This Week',
    icon: Trophy,
    color: 'text-indigo-400',
  },
];

const quickActions = [
  { title: 'Start Battle', icon: Swords, color: 'text-red-500' },
  { title: 'Practice Problem', icon: Code, color: 'text-green-500' },
  { title: 'Battle a Friend', icon: Users, color: 'text-blue-500' },
  { title: 'AI Help Session', icon: Bot, color: 'text-purple-500' },
];

const activityFeed = [
  {
    icon: Trophy,
    description: 'Won battle against @alex_dev',
    time: '2m ago',
    color: 'text-yellow-400',
  },
  {
    icon: UserCheck,
    description: 'Solved "Two Sum" in Python',
    time: '1h ago',
    color: 'text-green-400',
  },
  {
    icon: Star,
    description: 'Achieved 7-day streak!',
    time: '3h ago',
    color: 'text-orange-400',
  },
  {
    icon: ArrowUpRight,
    description: 'Reached Level 12',
    time: '1d ago',
    color: 'text-indigo-400',
  },
  {
    icon: Shield,
    description: 'Completed Daily Challenge',
    time: '2d ago',
    color: 'text-cyan-400',
  },
];

const ActivityHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState<number[]>([]);

  useEffect(() => {
    // Generate data on the client side to avoid hydration mismatch
    const data = Array.from({ length: 365 }).map(() =>
      Math.floor(Math.random() * 5)
    );
    setHeatmapData(data);
  }, []);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 364);

  const colors = [
    'bg-muted/30',
    'bg-primary/20',
    'bg-primary/40',
    'bg-primary/70',
    'bg-primary',
  ];

  if (heatmapData.length === 0) {
    // Render a skeleton or empty state while data is generating
    return (
       <div className="grid grid-cols-[auto_1fr] gap-2">
        <div className="flex flex-col justify-around text-xs text-muted-foreground">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div className="grid grid-cols-52 grid-rows-7 gap-1">
          {Array.from({ length: 365 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-[2px] bg-muted/30" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[auto_1fr] gap-2">
      <div className="flex flex-col justify-around text-xs text-muted-foreground">
        <span>Mon</span>
        <span>Wed</span>
        <span>Fri</span>
      </div>
      <div className="grid grid-cols-52 grid-rows-7 gap-1">
        {heatmapData.map((intensity, i) => (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`aspect-square rounded-[2px] ${
                    colors[intensity]
                  }`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {intensity} contributions on{' '}
                  {new Date(
                    startDate.getTime() + i * 24 * 60 * 60 * 1000
                  ).toDateString()}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};


export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="grid gap-8">
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((stat) => (
                  <Card
                    key={stat.title}
                    className="transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <stat.icon
                        className={`h-4 w-4 text-muted-foreground ${stat.color}`}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        {stat.trend}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column */}
                <div className="grid gap-8 lg:col-span-2">
                  {/* Progress Visualization */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Progress Visualization</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Level Progress</span>
                          <span className="text-primary">Level 12</span>
                        </div>
                        <Progress value={81.6} />
                        <div className="text-right text-xs text-muted-foreground">
                          2,450 / 3,000 XP
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Weekly Goal</span>
                          <span className="text-primary">5/7 Days</span>
                        </div>
                        <Progress value={71} />
                        <div className="text-right text-xs text-muted-foreground">
                          71% Complete
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Activity Heatmap */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Coding Activity</CardTitle>
                      <CardDescription>
                        Your contribution activity over the last year.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ActivityHeatmap />
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column (Activity Feed) */}
                <div className="grid gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activityFeed.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <div
                              className={`mr-3 mt-1 h-8 w-8 flex-shrink-0 rounded-full flex items-center justify-center bg-muted/50 ${item.color}`}
                            >
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-grow">
                              <p className="text-sm">{item.description}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {quickActions.map((action) => (
                    <Button
                      key={action.title}
                      variant="outline"
                      className="flex h-24 flex-col items-center justify-center gap-2"
                    >
                      <action.icon
                        className={`h-8 w-8 ${action.color}`}
                      />
                      <span className="text-sm font-medium">
                        {action.title}
                      </span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

const DashboardSidebar = () => {
  const { open, setOpen } = useSidebar();
  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/arena', icon: Swords, label: 'Arena' },
    { href: '#', icon: Book, label: 'Learn' },
    { href: '#', icon: BarChart, label: 'Stats' },
    { href: '#', icon: Bot, label: 'AI Mentor' },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/50 bg-card/50"
    >
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span
            className={`font-headline text-xl font-bold text-foreground transition-opacity duration-200 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            AlgoArena
          </span>
        </Link>
        <SidebarTrigger
          onClick={() => setOpen(!open)}
          className="hidden md:flex"
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton tooltip={item.label}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Upgrade to Pro">
              <Crown className="h-5 w-5 text-yellow-400" />
              <span>Upgrade to Pro</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/50 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="md:hidden">
        <Menu />
      </SidebarTrigger>

      <div className="relative flex-1">
        {/* Search can go here */}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Inbox className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Theme</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">User Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
