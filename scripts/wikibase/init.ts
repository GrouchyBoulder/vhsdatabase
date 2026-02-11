import { WikibaseClient } from '../../packages/shared/src/wikibaseClient';

const properties = [
  { id: 'P_TMDb_ID', label: 'TMDb ID', datatype: 'string' },
  { id: 'P_Wikipedia_URL', label: 'Wikipedia URL', datatype: 'url' },
  { id: 'P_Release_Year', label: 'Release year', datatype: 'time' },
  { id: 'P_Distributor', label: 'Distributor', datatype: 'string' },
  { id: 'P_Region', label: 'Region', datatype: 'string' },
  { id: 'P_Catalog_Number', label: 'Catalog number', datatype: 'string' },
  { id: 'P_UPC', label: 'UPC', datatype: 'string' },
  { id: 'P_Packaging', label: 'Packaging type', datatype: 'string' },
  { id: 'P_Part_Of', label: 'Part of movie', datatype: 'wikibase-item' },
  { id: 'P_Notes', label: 'Notes', datatype: 'monolingualtext' }
];

async function main() {
  const client = new WikibaseClient({ apiUrl: process.env.WIKIBASE_API_URL || 'http://localhost:8181/w/api.php' });
  console.log('Define the following Wikibase properties manually or via bot account:', properties);
  await client.queryByTmdbId('603').catch(() => undefined);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
