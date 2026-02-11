import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-300/20 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-heading text-lg uppercase tracking-wider text-cyan-200">Nostalgia Maxxer Studios</Link>
        <nav className="flex gap-4 text-sm text-zinc-300">
          <Link href="/search">Search</Link>
          <Link href="/collection">My Collection</Link>
          <Link href="/wantlist">Wantlist</Link>
          <Link href="/moderation">Moderation</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
