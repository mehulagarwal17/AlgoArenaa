
'use client';

import React, { useState, useRef, useEffect } from 'react';
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
import { aiPoweredMentoring } from '@/ai/flows/ai-powered-mentoring';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
}

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

const ChatHeader = ({ onClearChat }: { onClearChat: () => void }) => (
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
      <Button variant="ghost" size="icon" onClick={onClearChat}>
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  </header>
);

const ChatMessages = ({ messages, isLoading }: { messages: Message[], isLoading: boolean }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
      <div className="space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-4 ${
              message.sender === 'user' ? 'justify-end' : ''
            }`}
          >
            {message.sender === 'ai' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-5 w-5" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card'
              }`}
            >
              {message.text.includes('```') ? (
                message.text.split('```').map((part, index) => {
                  if (index % 2 === 1) {
                    const codePart = part.split('\n');
                    const language = codePart.shift();
                    const code = codePart.join('\n');
                    return (
                      <div key={index} className="rounded-lg bg-black p-4 font-code text-sm my-2">
                        <pre><code>{code}</code></pre>
                      </div>
                    );
                  }
                  return <p key={index} className="text-sm">{part}</p>;
                })
              ) : (
                <p className="text-sm">{message.text}</p>
              )}
            </div>
            {message.sender === 'user' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User className="h-5 w-5" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bot className="h-5 w-5 animate-pulse" />
            <span>AI Mentor is thinking...</span>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

const ChatInput = ({ onSendMessage, isLoading }: { onSendMessage: (message: string) => void, isLoading: boolean }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="border-t p-4">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          placeholder="Type your tech question here..."
          className="pr-20"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-1">
          <Button variant="ghost" size="icon" disabled={isLoading}>
            <Mic className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" disabled={isLoading}>
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" disabled={isLoading}>
            <Code className="h-5 w-5" />
          </Button>
          <Button size="icon" onClick={handleSend} disabled={isLoading}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <p className="mt-2 text-right text-xs text-muted-foreground">
        Cost: 5 XP per question
      </p>
    </div>
  );
};

const initialMessages: Message[] = [
    {
      id: 1,
      sender: 'ai',
      text: "Hi! I'm your coding mentor. Ask me anything about programming! 🚀",
    },
];

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    const newUserMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await aiPoweredMentoring({
        problemDescription: 'General query',
        userCode: text,
        userSkillLevel: 'intermediate',
        preferredHintType: 'hint',
      });
      const newAiMessage: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: response.mentoringMessage,
      };
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
  };
  
  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <aside className="hidden w-80 flex-shrink-0 border-r md:flex">
        <MentorSidebar />
      </aside>
      <main className="flex flex-1 flex-col">
        <ChatHeader onClearChat={handleClearChat} />
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}
