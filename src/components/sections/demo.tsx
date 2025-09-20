import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';

const DemoSection = () => {
  return (
    <section id="demo" className="py-20 lg:py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            See AlgoArena in Action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Watch a quick walkthrough of our platform's key features.
          </p>
        </div>
        <Card className="overflow-hidden shadow-2xl shadow-primary/10">
          <CardContent className="relative aspect-video p-0">
            <Image
              src="https://picsum.photos/seed/algo-demo/1280/720"
              alt="AlgoArena Demo Video"
              layout="fill"
              objectFit="cover"
              className="opacity-70"
              data-ai-hint="abstract geometric"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <button
                aria-label="Play Demo Video"
                className="group rounded-full bg-background/30 p-4 backdrop-blur-sm transition-all hover:scale-110 hover:bg-primary/50"
              >
                <PlayCircle className="h-20 w-20 text-white transition-colors group-hover:text-primary-foreground" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DemoSection;
