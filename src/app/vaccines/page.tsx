import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const vaccineData = [
  {
    id: 'bcg',
    name: 'BCG (Bacillus Calmette-Guerin)',
    disease: 'Tuberculosis (TB)',
    schedule: 'At birth or as early as possible till 1 year of age.',
    purpose:
      'Protects against severe forms of tuberculosis, especially in children.',
  },
  {
    id: 'opv',
    name: 'OPV (Oral Polio Vaccine)',
    disease: 'Poliomyelitis',
    schedule: 'Birth dose, then at 6, 10, and 14 weeks. Booster at 16-24 months.',
    purpose: 'Prevents polio, a disabling and life-threatening disease.',
  },
  {
    id: 'pentavalent',
    name: 'Pentavalent Vaccine',
    disease:
      'Diphtheria, Pertussis, Tetanus, Hepatitis B, and Haemophilus influenzae type b (Hib)',
    schedule: 'Three doses at 6, 10, and 14 weeks of age.',
    purpose:
      'A combination vaccine that protects against five major childhood diseases.',
  },
  {
    id: 'mmr',
    name: 'MMR (Measles, Mumps, Rubella)',
    disease: 'Measles, Mumps, and Rubella',
    schedule: 'First dose at 9-12 months, second dose at 16-24 months.',
    purpose: 'Protects against three common and potentially serious viral diseases.',
  },
  {
    id: 'hepa',
    name: 'Hepatitis A Vaccine',
    disease: 'Hepatitis A',
    schedule: 'Two doses, given at least 6 months apart, starting at age 1.',
    purpose: 'Protects against Hepatitis A, a liver infection caused by the Hepatitis A virus.'
  },
  {
    id: 'typhoid',
    name: 'Typhoid Vaccine',
    disease: 'Typhoid Fever',
    schedule: 'One dose, with a booster recommended every 2-3 years for those in high-risk areas.',
    purpose: 'Helps prevent typhoid fever, a bacterial infection often spread through contaminated food and water.'
  },
  {
    id: 'tdap',
    name: 'Tdap (Tetanus, Diphtheria, Pertussis)',
    disease: 'Tetanus, Diphtheria, and Whooping Cough (Pertussis)',
    schedule: 'Recommended for adolescents (age 11-12) and adults, and during each pregnancy.',
    purpose: 'A booster vaccine to maintain protection against tetanus, diphtheria, and pertussis.'
  },
  {
    id: 'covid19',
    name: 'COVID-19 Vaccine',
    disease: 'Coronavirus Disease 2019',
    schedule:
      'Varies by vaccine type and age group. Typically includes a primary series and booster doses.',
    purpose:
      'Reduces the risk of severe illness, hospitalization, and death from COVID-19.',
  },
];

export default function VaccinesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Vaccine Information
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find information about important vaccines, their schedules, and
          purpose.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {vaccineData.map((vaccine) => (
          <AccordionItem value={vaccine.id} key={vaccine.id}>
            <AccordionTrigger className="text-xl font-headline hover:no-underline">
              {vaccine.name}
            </AccordionTrigger>
            <AccordionContent className="space-y-4 px-2 text-base">
              <div>
                <h3 className="font-bold">Prevents:</h3>
                <p>{vaccine.disease}</p>
              </div>
              <div>
                <h3 className="font-bold">Schedule:</h3>
                <p>{vaccine.schedule}</p>
              </div>
              <div>
                <h3 className="font-bold">Purpose:</h3>
                <p>{vaccine.purpose}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
