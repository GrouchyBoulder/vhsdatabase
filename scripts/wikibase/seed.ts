import { WikibaseClient } from '../../packages/shared/src/wikibaseClient';

async function main() {
  const client = new WikibaseClient({
    apiUrl: process.env.WIKIBASE_API_URL || 'http://localhost:8181/w/api.php',
    csrfToken: process.env.WIKIBASE_CSRF_TOKEN
  });

  const movie = await client.createItem('The Matrix', 'Canonical movie entity for VHS catalog').catch((error) => {
    console.error('Unable to create movie item', error);
    return null;
  });

  console.log('Created movie entity', movie);
  console.log('Seed additional VHS release entities with claims: distributor, region, catalog, UPC, packaging, release year, notes, part of movie.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
