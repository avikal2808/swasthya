'use client';

import {
  symptomChecker,
  type SymptomCheckerOutput,
} from '@/ai/flows/symptom-checker';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, Lightbulb, Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  symptoms: z
    .string()
    .min(10, { message: 'Please describe your symptoms in at least 10 characters.' })
    .max(1000, { message: 'Please keep your description under 1000 characters.' }),
});

export default function SymptomCheckerForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SymptomCheckerOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    setError(null);
    startTransition(async () => {
      try {
        const res = await symptomChecker(values);
        setResult(res);
      } catch (e) {
        setError('An error occurred. Please try again.');
        console.error(e);
      }
    });
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Your Symptoms</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Headache and fever for 2 days', 'persistent cough and chest pain', 'skin rash and itching on my arms', 'stomach pain and nausea after eating'."
                        className="min-h-[150px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze Symptoms
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && (
        <div className="mt-8 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">
            AI is analyzing your symptoms...
          </p>
        </div>
      )}

      {error && (
        <Card className="mt-8 border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold font-headline">Analysis Result</h2>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                Possible Conditions
              </CardTitle>
              <CardDescription>
                Based on the symptoms you provided, here are some possibilities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result.possibleConditions}</p>
            </CardContent>
          </Card>

          <Card className="border-primary bg-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                Recommended Actions
              </CardTitle>
              <CardDescription>
                Here are some suggested next steps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result.recommendedActions}</p>
            </CardContent>
          </Card>
          
          <Card className="border-amber-500 bg-amber-500/10">
            <CardHeader className="flex flex-row items-center gap-4">
              <Lightbulb className="h-6 w-6 text-amber-700" />
              <CardTitle className="text-lg text-amber-800">
                Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-amber-700">
              This is an AI-generated analysis and not a substitute for professional medical advice. Please consult a doctor for an accurate diagnosis.
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
