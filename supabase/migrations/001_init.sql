create extension if not exists pg_trgm;

create table if not exists profiles (
  id uuid primary key,
  email text unique not null,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

create table if not exists vhs_releases (
  id uuid primary key default gen_random_uuid(),
  wikibase_qid text,
  movie_tmdb_id text not null,
  title text not null,
  distributor text not null,
  region text,
  catalog_number text,
  upc text,
  packaging text,
  release_year int,
  notes text,
  created_by uuid references profiles(id),
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists collection_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id),
  release_id uuid not null references vhs_releases(id),
  list_type text not null check (list_type in ('owned','wantlist')),
  condition text,
  sealed boolean default false,
  price_paid numeric(10,2),
  acquired_at date,
  notes text,
  created_at timestamptz default now(),
  unique(user_id, release_id, list_type)
);

create table if not exists moderation_queue (
  id uuid primary key default gen_random_uuid(),
  release_id uuid references vhs_releases(id),
  submitted_by uuid references profiles(id),
  status text default 'pending',
  reviewer_id uuid references profiles(id),
  reviewer_notes text,
  created_at timestamptz default now(),
  reviewed_at timestamptz
);

create table if not exists external_cache (
  id bigserial primary key,
  source text not null,
  cache_key text not null,
  payload jsonb not null,
  source_url text,
  fetched_at timestamptz not null default now(),
  expires_at timestamptz not null,
  license_notice text,
  unique(source, cache_key)
);

create table if not exists vhs_photos (
  id uuid primary key default gen_random_uuid(),
  release_id uuid not null references vhs_releases(id),
  uploader_id uuid not null references profiles(id),
  photo_type text not null check (photo_type in ('front','back','spine','label')),
  storage_path text not null,
  created_at timestamptz default now()
);

create index if not exists idx_release_search_fts on vhs_releases using gin (to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(distributor,'') || ' ' || coalesce(catalog_number,'') || ' ' || coalesce(upc,'')));
create index if not exists idx_release_title_trgm on vhs_releases using gin (title gin_trgm_ops);
create index if not exists idx_release_upc on vhs_releases (upc);
create index if not exists idx_release_catalog on vhs_releases (catalog_number);

alter table collection_items enable row level security;
alter table vhs_releases enable row level security;
alter table moderation_queue enable row level security;

create policy "users_manage_own_collection" on collection_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users_submit_vhs_release" on vhs_releases for insert with check (auth.uid() = created_by);
create policy "mods_review_queue" on moderation_queue for all using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('moderator','admin','trusted_editor')));
