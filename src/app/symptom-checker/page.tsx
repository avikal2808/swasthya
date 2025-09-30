import SymptomCheckerForm from './symptom-checker-form';

export default function SymptomCheckerPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Symptom Checker
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Describe your symptoms in the box below. Our AI assistant will provide
          possible conditions and recommended actions.
        </p>
      </div>
      <SymptomCheckerForm />
    </div>
  );
}
