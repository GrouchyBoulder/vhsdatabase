import Image from 'next/image';
import { TMDB_NOTICE, WIKIPEDIA_NOTICE } from '@vhs/shared/src/constants';

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl">About / Credits</h1>
      <section className="card-glow p-6">
        <h2 className="font-heading text-lg text-cyan-100">Attribution</h2>
        <div className="mt-3 space-y-2 text-sm text-zinc-300">
          <Image src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-2b6f01fcbf1ac5eb5f7250f0f8de74ca3ecf8f2a4f16b46ed9b85f8f63dd2f8f.svg" alt="TMDB logo" width={140} height={30} unoptimized />
          <p>{TMDB_NOTICE}</p>
          <p>{WIKIPEDIA_NOTICE}</p>
          <p>Wikipedia excerpts are short summaries only and link to source pages.</p>
        </div>
      </section>
      <section className="card-glow p-6 text-sm text-zinc-300">
        <h2 className="font-heading text-lg">Nostalgia Maxxer Studios Theme</h2>
        <p>Retro CRT scanlines, soft neon glow cards, VHS-noise-inspired backdrop, and readable modern layout.</p>
      </section>
    </div>
  );
}
