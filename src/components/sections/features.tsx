import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Swords, BrainCircuit, Puzzle } from 'lucide-react';

const features = [
  {
    icon: <Swords className="h-8 w-8 text-primary" />,
    title: 'Real-time Code Battles',
    description:
      'Compete against developers worldwide in live coding challenges with real-time leaderboards and instant feedback.',
    borderColor: 'border-red-500/50',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Mentoring',
    description:
      'Get personalized hints, code suggestions, and algorithm explanations that adapt to your skill level.',
    borderColor: 'border-blue-500/50',
  },
  {
    icon: <Puzzle className="h-8 w-8 text-primary" />,
    title: 'Challenging Problem Sets',
    description:
      'Solve a variety of algorithmic problems curated by industry experts, from beginner-friendly to advanced.',
    borderColor: 'border-green-500/50',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-secondary py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Everything You Need to Excel
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Powerful features designed for competitive programmers who want to
            level up their skills.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`transform-gpu border-t-4 bg-card transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 ${feature.borderColor}`}
            >
              <CardHeader className="p-8">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-bold">
                  {feature.title}
                </CardTitle>
                <CardDescription className="pt-2 text-base text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
