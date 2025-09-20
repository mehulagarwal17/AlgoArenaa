
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Split from 'react-split';
import {
  Clock,
  Code,
  Users,
  Play,
  CheckCircle,
  XCircle,
  Loader,
  Settings,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Editor from '@monaco-editor/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const BattleHeader = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleForfeit = () => {
    router.push('/dashboard');
  };


  return (
    <header className="flex h-14 items-center justify-between border-b border-battle-glass-border bg-battle-glass px-4 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-battle-accent">
          <Clock className="h-5 w-5" />
          <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
        </div>
        <Badge variant="outline" className="border-battle-accent/50 text-battle-accent">
          #BT-2024
        </Badge>
      </div>
      <div className="text-center">
        <h1 className="text-lg font-bold text-foreground">Two Sum</h1>
        <p className="text-sm text-muted-foreground">Difficulty: Medium</p>
      </div>
      <div className="flex items-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">Forfeit</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to forfeit?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. You will lose the battle and your rating will be affected.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleForfeit}>Forfeit</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

const ProblemPanel = () => (
  <div className="flex h-full flex-col gap-4 p-4">
    <Card className="flex-grow overflow-y-auto bg-transparent">
      <CardHeader>
        <CardTitle className="text-battle-primary text-2xl">
          Problem: Two Sum
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Given an array of integers `nums` and an integer `target`, return
          indices of the two numbers such that they add up to `target`.
        </p>
        <p className="text-muted-foreground">
          You may assume that each input would have exactly one solution, and
          you may not use the same element twice.
        </p>
        <div className="rounded-md bg-muted/30 p-4">
          <p className="font-code text-sm text-foreground">
            <strong>Example:</strong>
            <br />
            Input: nums = [2,7,11,15], target = 9
            <br />
            Output: [0,1]
            <br />
            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
          </p>
        </div>
      </CardContent>
    </Card>
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="text-battle-primary text-lg">
          Test Cases
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-battle-success">
          <CheckCircle className="h-4 w-4" />
          <span>Test 1: Passed</span>
        </div>
        <div className="flex items-center gap-2 text-battle-accent">
          <Loader className="h-4 w-4 animate-spin" />
          <span>Test 2: Running...</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <XCircle className="h-4 w-4 opacity-50" />
          <span>Test 3: Pending</span>
        </div>
      </CardContent>
    </Card>
  </div>
);

const CodePanel = () => {
  const code = `function twoSum(nums, target) {
  // Your code here
}`;

  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={code}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      <div className="flex items-center justify-end gap-2 border-t border-battle-glass-border bg-battle-glass p-2">
        <Button variant="outline" className="border-battle-accent text-battle-accent hover:bg-battle-accent/10 hover:text-battle-accent">Hint</Button>
        <Button variant="outline">Reset</Button>
        <Button className="bg-battle-secondary hover:bg-battle-secondary/90">Run</Button>
        <Button className="bg-battle-primary hover:bg-battle-primary/90 text-white">Submit</Button>
      </div>
    </div>
  );
};

const OpponentPanel = () => (
  <div className="flex h-full flex-col gap-4 p-4">
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="text-battle-primary text-lg">
          Opponent: @alex_dev
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-blue-400">
          <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
          <span>Opponent is typing...</span>
        </div>
      </CardContent>
    </Card>
    <Card className="flex-grow overflow-hidden bg-transparent">
      <CardHeader>
        <CardTitle className="text-battle-primary text-lg">
          Opponent's Code
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full">
         <Editor
          height="100%"
          defaultLanguage="javascript"
          value={`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 12,
            lineNumbers: 'off',
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0
          }}
        />
      </CardContent>
    </Card>
  </div>
);

export default function ArenaPage() {
  const [showMatchmaking, setShowMatchmaking] = useState(true);
  const [countdown, setCountdown] = useState(3);
  
  // Fake countdown
  React.useEffect(() => {
    if(showMatchmaking) {
      setTimeout(() => {
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(interval);
              setShowMatchmaking(false);
            }
            return prev - 1;
          });
        }, 1000);
      }, 2000);
    }
  }, [showMatchmaking]);


  if (showMatchmaking) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold">Searching for opponent...</h1>
            <p className="text-muted-foreground mt-2">This should only take a moment.</p>
            <div className="mt-8">
                {countdown > 0 ? (
                    <div className="text-9xl font-bold text-battle-primary animate-ping">{countdown}</div>
                ) : (
                    <Loader className="mx-auto h-24 w-24 animate-spin text-battle-primary" />
                )}
            </div>
        </div>
      </div>
    );
  }
  
  return (
    <div
      className="flex h-screen w-full flex-col bg-background text-foreground"
      style={
        {
          '--battle-primary': '#ff6b35',
          '--battle-secondary': '#004e89',
          '--battle-accent': '#ffd23f',
          '--battle-success': '#06d6a0',
          '--battle-danger': '#ef476f',
          '--battle-glass': 'rgba(255, 255, 255, 0.05)',
          '--battle-glass-border': 'rgba(255, 255, 255, 0.1)',
        } as React.CSSProperties
      }
    >
      <BattleHeader />
      <div className="flex-grow">
        <Split
          className="flex h-full"
          sizes={[30, 40, 30]}
          minSize={200}
          gutterSize={8}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          <ProblemPanel />
          <CodePanel />
          <OpponentPanel />
        </Split>
      </div>
    </div>
  );
}

// Custom CSS for the split gutter
const styles = `
  .gutter {
    background-color: transparent;
    position: relative;
  }
  .gutter.gutter-horizontal {
    cursor: col-resize;
  }
  .gutter.gutter-horizontal:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 40px;
    background-color: var(--battle-glass-border);
    border-radius: 2px;
  }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
