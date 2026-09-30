import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Fresh Start" },
      { name: "description", content: "A simple page for a fresh start." },
      { property: "og:title", content: "A Fresh Start" },
      { property: "og:description", content: "A simple page for a fresh start." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 sm:px-10 lg:px-16">
      <header className="flex items-center justify-between border-b border-border py-7 sm:py-9">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="grid size-8 place-items-center border border-primary text-lg font-semibold leading-none text-primary">✳</span>
          <span className="text-sm font-semibold">a fresh start</span>
        </div>
        <span className="text-xs text-muted-foreground">JUST BEGIN.</span>
      </header>

      <section className="flex flex-1 flex-col justify-center py-20 sm:py-28" aria-labelledby="page-title">
        <div className="mb-10 flex items-center gap-4 text-xs font-medium text-primary">
          <span className="h-px w-10 bg-primary" />
          A LITTLE SPACE TO BEGIN
        </div>
        <h1 id="page-title" className="max-w-5xl text-6xl font-semibold leading-[1.03] sm:text-7xl lg:text-8xl">
          Good things start <span className="text-primary">simply.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
          A clean slate, a clear mind, and room for whatever comes next.
        </p>
      </section>

      <footer className="flex items-center justify-between gap-4 border-t border-border py-7 text-xs text-muted-foreground sm:py-9">
        <span>ONE STEP AT A TIME</span>
        <span aria-hidden="true" className="text-xl text-primary">↗</span>
      </footer>
    </main>
  );
}
