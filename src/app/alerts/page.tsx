import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bell } from 'lucide-react';

const alerts = [
  {
    id: 1,
    title: 'Dengue Outbreak Warning',
    date: 'July 20, 2024',
    location: 'Mumbai, Maharashtra',
    content:
      'Increased cases of Dengue fever reported. Please take precautions to avoid mosquito bites. Eliminate stagnant water around your homes.',
  },
  {
    id: 2,
    title: 'Heatwave Advisory',
    date: 'July 18, 2024',
    location: 'Delhi NCR',
    content:
      'A severe heatwave is expected for the next 48 hours. Stay hydrated, avoid direct sun exposure between 11 AM and 4 PM, and watch for signs of heatstroke.',
  },
  {
    id: 3,
    title: 'Cholera Cases Reported',
    date: 'July 15, 2024',
    location: 'Kolkata, West Bengal',
    content:
      'A few cases of Cholera have been identified. Ensure you drink boiled or purified water and maintain food hygiene.',
  },
  {
    id: 4,
    title: 'Free Vaccination Camp',
    date: 'July 12, 2024',
    location: 'All Districts',
    content:
      'A special government campaign for MMR vaccine boosters will be held this weekend at all primary health centers. All children aged 4-6 are eligible.',
  },
];

export default function AlertsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Health Alerts
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Stay informed with the latest public health warnings and advisories.
        </p>
      </div>

      <div className="space-y-6">
        {alerts.map((alert) => (
          <Card key={alert.id}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-grow">
                  <CardTitle className="font-headline text-xl">
                    {alert.title}
                  </CardTitle>
                  <CardDescription>
                    {alert.date} - {alert.location}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base">{alert.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
