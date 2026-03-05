'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface FeatureProps {
  features: FeatureItem[];
  className?: string;
}

const Features = ({
  features = [
    {
      id: 1,
      title: 'Real-Time Market Data',
      image:
        'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg',
      description:
        'Track live prices, market caps, volume, and price changes across thousands of cryptocurrencies.',
    },
    {
      id: 2,
      title: 'Interactive Price Charts',
      image:
        'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw15.jpeg',
      description:
        "Analyze token performance with dynamic charts, historical data, and multiple time ranges.",
    },
    {
      id: 3,
      title: 'Market Insights',
      image:
        'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw20.jpeg',
      description:
        "View key metrics like market dominance, liquidity, and trading volume to understand market trends.",
    },
    {
      id: 4,
      title: 'Watchlist',
      image:
        'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw21.jpeg',
      description:
        'Create a personal watchlist to track your favorite cryptocurrencies and monitor their performance in one place.'}
  ],
  className,
}: FeatureProps) => {
 
  const [activeTabId, setActiveTabId] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState(features[0].image);

  return (
    <section className={cn('py-32', className)}>
      <div className="container mx-auto">
        <h2 className="mb-12 text-3xl font-semibold md:text-4xl">Features</h2>
        <div className="flex w-full items-start justify-between gap-12">
          <div className="w-full md:w-1/2">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {features.map((tab) => (
                <AccordionItem
                  key={tab.id}
                  value={`item-${tab.id}`}
                  className="transition-opacity hover:opacity-80"
                >
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(tab.image);
                      setActiveTabId(tab.id);
                    }}
                    className="cursor-pointer py-5 no-underline! transition"
                  >
                    <h4
                      className={`text-xl ${tab.id === activeTabId ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                      {tab.title}
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <p className="text-base text-muted-foreground">
                      {tab.description}
                    </p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={tab.image}
                        alt={tab.title}
                        className="h-full max-h-80 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative hidden w-1/2 overflow-hidden rounded-xl bg-muted md:block">
            <div className="relative aspect-4/3">
              {features.map((feature) => (
                <img
                  key={feature.id}
                  src={feature.image}
                  alt={feature.title}
                  className={cn(
                    'absolute inset-0 h-full w-full rounded-md object-cover transition-opacity duration-500',
                    activeImage === feature.image ? 'opacity-100' : 'opacity-0',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Features };
