
'use client';

import React, { useState } from 'react';
import {
  Bot,
  Code,
  Mic,
  Paperclip,
  Send,
  Settings,
  Trash2,
  User,
  Zap,
  Rocket,
  Search,
  Book,
  BarChart,
  BrainCircuit,
  Puzzle,
  Swords,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const quickActions = [
  { icon: Rocket, label: 'Explain Algorithm' },
  { icon: Search, label: 'Debug My Code' },
  { icon: BarChart, label: 'Optimize Complexity' },
  { icon: Puzzle, label: 'Practice Suggestions' },
  { icon: Swords, label: 'Hint for Problem' },
  { icon: BrainCircuit, label: 'System Design Help' },
];

const recentTopics = [
  'Binary Search Trees',
  'Dynamic Programming',
  'Graph Algorithms',
  'Time Complexity',
  'System Design Patterns',
];

const MentorSidebar = () => (
  <Card className="flex h-full flex-col bg-card/50 border-0 md:border-r">
    <CardHeader>
      <CardTitle>Quick Actions</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow space-y-6">
      <div className="space-y-2">
        {quickActions.map((action) => (
          <Button key={action.label} variant="ghost" className="w-full justify-start">
            <action.icon className="mr-3 h-5 w-5" />
            {action.label}
          </Button>
        ))}
      </div>
      <Separator />
      <div>
        <h3 className="mb-4 text-lg font-semibold">Recent Topics</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {recentTopics.map((topic) => (
            <li key={topic} className="flex items-center">
              <ChevronRight className="mr-2 h-4 w-4" />
              {topic}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div>
        <h3 className="mb-4 text-lg font-semibold">Learning Path</h3>
        <div className="space-y-4">
          <div className="text-sm">
            <div className="flex justify-between">
              <span>Current: Intermediate</span>
              <span>60%</span>
            </div>
            <Progress value={60} className="mt-1 h-2" />
          </div>
          <p className="text-xs text-muted-foreground">Next: Advanced Algorithms</p>
          <Button variant="outline" size="sm" className="w-full">
            Suggested: Practice Trees
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ChatHeader = () => (
  <header className="flex h-14 items-center justify-between border-b px-4">
    <div className="flex items-center gap-2">
      <Bot className="h-6 w-6 text-primary" />
      <h2 className="text-lg font-semibold">AI Mentor</h2>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon">
        <Mic className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon">
        <Settings className="h-5 w-5" />
      </Button>
      <Badge variant="outline">2,450 XP</Badge>
      <Button variant="ghost" size="icon">
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  </header>
);

const ChatMessages = () => (
  <ScrollArea className="flex-grow p-4">
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
        <div className="max-w-[75%] rounded-lg bg-card p-3">
          <p className="text-sm">
            Hi! I'm your coding mentor. Ask me anything about programming! 🚀
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4 justify-end">
        <div className="max-w-[75%] rounded-lg bg-primary text-primary-foreground p-3">
          <p className="text-sm">
            How do I optimize this bubble sort algorithm?
          </p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <User className="h-5 w-5" />
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
        <div className="max-w-[75%] space-y-3">
          <div className="rounded-lg bg-card p-3">
            <p className="text-sm">
              Great question! Here are several ways to optimize bubble sort:
            </p>
          </div>
          <div className="rounded-lg bg-black p-4 font-code text-sm">
            <pre>
              <code>
{`def optimized_bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break`}
              </code>
            </pre>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Bot className="h-5 w-5 animate-pulse" />
        <span>AI Mentor is thinking...</span>
      </div>
    </div>
  </ScrollArea>
);

const ChatInput = () => (
  <div className="border-t p-4">
    <div className="relative">
      <Textarea
        placeholder="Type your tech question here..."
        className="pr-20"
        rows={1}
      />
      <div className="absolute bottom-2 right-2 flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <Mic className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Code className="h-5 w-5" />
        </Button>
        <Button size="icon">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
    <p className="mt-2 text-right text-xs text-muted-foreground">
      Cost: 5 XP per question
    </p>
  </div>
);

export default function MentorPage() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <aside className="hidden w-80 flex-shrink-0 border-r md:flex">
        <MentorSidebar />
      </aside>
      <main className="flex flex-1 flex-col">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </main>
    </div>
  );
}
