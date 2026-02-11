import Link from 'next/link';

type ReleaseCardProps = {
  id: string;
  title: string;
  distributor: string;
  upc: string;
};

export function ReleaseCard({ id, title, distributor, upc }: ReleaseCardProps) {
  return (
    <Link href={`/releases/${id}`} className="card-glow block p-4">
      <h3 className="font-heading text-cyan-100">{title}</h3>
      <p className="text-xs text-zinc-400">{distributor}</p>
      <p className="mt-1 text-xs text-zinc-500">UPC: {upc}</p>
    </Link>
  );
}
