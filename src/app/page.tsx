import { StudentWizard } from "@/components/wizard/StudentWizard";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-1 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-ikea-blue">Distinguished Student Application</h1>
          <p className="mt-2 text-ink-muted">Complete the form below to apply for the program.</p>
        </div>
        <StudentWizard />
      </div>
    </main>
  );
}
