import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bell, Languages, Stethoscope, Syringe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    title: 'Symptom Checker',
    description: 'Describe your symptoms to our AI',
    href: '/symptom-checker',
    icon: <Stethoscope className="h-8 w-8 text-primary" />,
    imageId: 'symptom-checker',
  },
  {
    title: 'Vaccine Information',
    description: 'Get vaccine schedules and details',
    href: '/vaccines',
    icon: <Syringe className="h-8 w-8 text-primary" />,
    imageId: 'vaccine-info',
  },
  {
    title: 'Health Alerts',
    description: 'View real-time health warnings',
    href: '/alerts',
    icon: <Bell className="h-8 w-8 text-primary" />,
    imageId: 'health-alerts',
  },
  {
    title: 'Multilingual Chat',
    description: 'Chat with our AI in your language',
    href: '/chat',
    icon: <Languages className="h-8 w-8 text-primary" />,
    imageId: 'multilingual-chat',
  },
];

export default function Home() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Swasthya Sahayak
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your AI-powered health companion. Accessible, simple, and in your
          language.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map((feature) => {
          const placeholder = PlaceHolderImages.find(
            (p) => p.id === feature.imageId
          );
          return (
            <Link href={feature.href} key={feature.title} className="group">
              <Card className="h-full overflow-hidden transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="font-headline text-xl">
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                    {placeholder && (
                      <Image
                        src={placeholder.imageUrl}
                        alt={placeholder.description}
                        width={600}
                        height={400}
                        data-ai-hint={placeholder.imageHint}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
