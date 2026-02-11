import { notFound } from 'next/navigation';
import { mockReleases } from '@/lib/data';

export default function ReleasePage({ params }: { params: { id: string } }) {
  const release = mockReleases.find((entry) => entry.id === params.id);
  if (!release) notFound();

  return (
    <div className="space-y-5">
      <section className="card-glow p-6">
        <h1 className="font-heading text-2xl">{release.title}</h1>
        <dl className="mt-4 grid gap-2 text-sm md:grid-cols-2">
          <div><dt className="text-zinc-400">Distributor / Label</dt><dd>{release.distributor}</dd></div>
          <div><dt className="text-zinc-400">Region</dt><dd>{release.region}</dd></div>
          <div><dt className="text-zinc-400">Catalog Number</dt><dd>{release.catalogNumber}</dd></div>
          <div><dt className="text-zinc-400">UPC</dt><dd>{release.upc}</dd></div>
          <div><dt className="text-zinc-400">Packaging</dt><dd>{release.packaging}</dd></div>
          <div><dt className="text-zinc-400">Release Year</dt><dd>{release.releaseYear}</dd></div>
        </dl>
      </section>
      <section className="card-glow p-6">
        <h2 className="font-heading text-xl">Collector / Community Notes</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-200">
          <li>Known bootleg indicators: inconsistent spine print, soft focus box art.</li>
          <li>Reseal notes: verify folded corners and seam style.</li>
          <li>Label/tape color: black shell with silver center label.</li>
          <li>{release.notes}</li>
        </ul>
      </section>
      <section className="card-glow p-6">
        <h2 className="font-heading text-xl">Photo Gallery</h2>
        <p className="text-sm text-zinc-400">Required uploads: front, back, spine. Optional: tape label.</p>
      </section>
    </div>
  );
}
