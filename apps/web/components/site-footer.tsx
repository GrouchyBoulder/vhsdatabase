import Image from 'next/image';
import Link from 'next/link';
import { TMDB_NOTICE, WIKIPEDIA_NOTICE } from '@vhs/shared/src/constants';

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-cyan-300/20 bg-black/40">
      <div className="mx-auto grid max-w-6xl gap-3 px-4 py-8 text-sm text-zinc-300 md:grid-cols-2">
        <div className="space-y-2">
          <p className="font-heading text-cyan-200">Nostalgia Maxxer Studios</p>
          <p>{TMDB_NOTICE}</p>
          <p>{WIKIPEDIA_NOTICE}</p>
        </div>
        <div className="space-y-2 md:justify-self-end">
          <Image src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-2b6f01fcbf1ac5eb5f7250f0f8de74ca3ecf8f2a4f16b46ed9b85f8f63dd2f8f.svg" alt="TMDB Logo" width={120} height={24} unoptimized />
          <p>
            Data snippets from <Link className="text-cyan-300" href="https://www.wikipedia.org/">Wikipedia</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
