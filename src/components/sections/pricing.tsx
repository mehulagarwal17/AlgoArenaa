import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Check } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Hobbyist',
    price: '$0',
    description: 'For individuals starting their coding journey.',
    features: [
      'Access to basic problem sets',
      'Community support',
      'Limited AI mentoring',
    ],
    cta: 'Start for Free',
    isFeatured: false,
  },
  {
    name: 'Pro',
    price: '$12',
    description: 'For serious learners aiming to go pro.',
    features: [
      'Access to all problem sets',
      'Unlimited AI mentoring',
      'Real-time code battles',
      'Personalized learning paths',
    ],
    cta: 'Get Started with Pro',
    isFeatured: true,
  },
  {
    name: 'Teams',
    price: 'Custom',
    description: 'For organizations and educational institutions.',
    features: [
      'All Pro features',
      'Team leaderboards',
      'Admin dashboard',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    isFeatured: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-secondary py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find the Perfect Plan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose the plan that fits your needs and start mastering algorithms
            today.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col ${
                tier.isFeatured
                  ? 'border-primary shadow-2xl shadow-primary/20'
                  : ''
              }`}
            >
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="flex items-baseline gap-2 pt-4">
                  <span className="text-5xl font-bold tracking-tight">
                    {tier.price}
                  </span>
                  {tier.price !== 'Custom' && tier.price !== '$0' && (
                    <span className="text-muted-foreground">/ month</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-8 pt-0">
                <ul className="space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button
                  className="w-full"
                  variant={tier.isFeatured ? 'default' : 'outline'}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
