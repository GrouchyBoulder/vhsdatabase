# VHS Collector Database (Nostalgia Maxxer Studios)

Production-ready MVP scaffolding for a TMDb/Letterboxd-style VHS collector app with a hybrid backend:
- **Wikibase knowledge graph** for canonical movies and VHS release entities
- **Supabase Postgres + Storage** for user collections, moderation, cache, and photos
- **Next.js 14 app** for public browsing + collector workflows

## Monorepo Structure

- `apps/web` – Next.js 14 App Router + Tailwind + shadcn-style component setup
- `apps/api` – Fastify API service (rate-limited contribution endpoint)
- `packages/shared` – shared types, Zod schemas, constants, Wikibase client
- `supabase/migrations` – SQL tables/indexes/RLS policies
- `scripts/wikibase` – init and seed scripts for Wikibase entities/properties

## Quick Start

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env
   ```
3. Start Wikibase:
   ```bash
   docker compose up -d
   ```
4. Start app + API:
   ```bash
   pnpm dev
   ```

Web app: `http://localhost:3000`  
API service: `http://localhost:4000`  
Wikibase: `http://localhost:8181`

## TMDb Integration

- Set `TMDB_API_KEY` from your TMDb account.
- Endpoints used in MVP: trending, popular, search, movie details/credits/images.
- TMDb attribution is displayed in footer + About page with required notice:
  > This product uses the TMDB API but is not endorsed or certified by TMDB.

## Wikipedia Integration

- Uses REST summary endpoint (`/page/summary/{title}`) only.
- Stores **short excerpts only** with source URL + fetched timestamp in cache table (`external_cache`).
- Shows source + attribution notice (CC BY-SA 4.0) on movie detail and global footer.

## Wikibase Data Model

### Items
- **Movie (Q)**: TMDb ID, Wikipedia URL, release year, title
- **VHS Release (Q)**: part-of movie, distributor, region, catalog number, UPC, packaging, release year, notes

### Properties
- `P_TMDb_ID` (string)
- `P_Wikipedia_URL` (url)
- `P_Release_Year` (time)
- `P_Distributor` (string/item)
- `P_Region` (string/item)
- `P_Catalog_Number` (string)
- `P_UPC` (string)
- `P_Packaging` (enum-ish string: slip/clamshell/bigbox/other)
- `P_Part_Of` (item)
- `P_Notes` (monolingual text)

## Supabase / Postgres

Run SQL in `supabase/migrations/001_init.sql` to create:
- `profiles`
- `vhs_releases`
- `collection_items`
- `moderation_queue`
- `external_cache`
- `vhs_photos`

Includes:
- trigram + FTS indexes for search on title/UPC/catalog/distributor
- RLS policies for own-collection write access and moderator review actions

## Storage

Create a Supabase Storage bucket named **`vhs-photos`** for user uploads:
- required types: front/back/spine
- optional: tape label

## Tests

- Unit tests (Vitest): shared schemas + web utilities
- Playwright smoke test: home/search/movie pages

Commands:
```bash
pnpm test
pnpm test:e2e
```

## Deployment Notes

### Vercel (web)
- Deploy `apps/web` as Next.js app.
- Configure environment variables from `.env.example`.

### Supabase (db + storage + auth)
- Apply migration SQL.
- Configure auth providers (email/password, optional Google OAuth).
- Enable RLS and create moderator/trusted editor roles in `profiles`.

### Wikibase Hosting
- For production, host Wikibase Suite on dedicated VM/Kubernetes with persistent storage and backup.
- Point `WIKIBASE_API_URL` to your hosted MediaWiki API.

## Licensing & Attribution

- **TMDb:** logo + required notice included in app footer and About page.
- **Wikipedia:** only short summaries/snippets are fetched and shown; source links and CC BY-SA 4.0 attribution shown on title pages and footer.

