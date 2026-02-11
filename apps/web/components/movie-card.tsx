import Link from 'next/link';

interface MovieCardProps {
  id: number;
  title: string;
  year?: string;
}

export function MovieCard({ id, title, year }: MovieCardProps) {
  return (
    <Link className="card-glow p-4 transition hover:-translate-y-0.5" href={`/movies/${id}`}>
      <h3 className="font-heading text-cyan-100">{title}</h3>
      <p className="text-xs text-zinc-400">{year || 'Unknown year'}</p>
    </Link>
  );
}
