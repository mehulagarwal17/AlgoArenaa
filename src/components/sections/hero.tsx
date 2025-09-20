import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Rocket, Play } from 'lucide-react';

const HeroSection = () => {
  const stats = [
    { label: 'Active Developers', value: '50K+', icon: '👨‍💻' },
    { label: 'Problems Solved', value: '2M+', icon: '🧩' },
    { label: 'Code Battles', value: '100K+', icon: '⚔️' },
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-32 text-center">
      <div
        className="absolute inset-0 z-0 h-full w-full"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: '0.1',
          maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)',
        }}
      />
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <Badge
          variant="outline"
          className="mb-8 border-primary/30 bg-primary/10 px-4 py-2 text-primary"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Now with AI-Powered Mentoring
        </Badge>
        <h1 className="font-headline text-5xl font-black leading-tight tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            Master Algorithms
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-brand-secondary to-accent bg-clip-text text-transparent">
            Together
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
          The ultimate competitive programming platform where developers battle
          in real-time, solve challenging problems, and level up with{' '}
          <span className="font-semibold text-accent">AI mentorship</span>.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="group w-full text-lg sm:w-auto"
          >
            <Rocket className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
            Start Coding Now
          </Button>
          <Button size="lg" variant="outline" className="w-full text-lg sm:w-auto">
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl">{stat.icon}</div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
