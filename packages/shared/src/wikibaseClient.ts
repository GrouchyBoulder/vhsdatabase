export type WikibaseClaimValue = string | number | { id: string };

export interface WikibaseClientConfig {
  apiUrl: string;
  username?: string;
  password?: string;
  csrfToken?: string;
}

export class WikibaseClient {
  constructor(private readonly config: WikibaseClientConfig) {}

  async createItem(label: string, description: string, instanceOf?: string) {
    return this.editEntity({
      labels: { en: { language: 'en', value: label } },
      descriptions: { en: { language: 'en', value: description } },
      ...(instanceOf ? { claims: { P31: [{ mainsnak: { snaktype: 'value', property: 'P31', datavalue: { value: { 'entity-type': 'item', 'numeric-id': Number(instanceOf.replace('Q', '')) }, type: 'wikibase-entityid' } }, type: 'statement', rank: 'normal' }] } } : {})
    });
  }

  async addClaim(entityId: string, property: string, value: WikibaseClaimValue) {
    const body = new URLSearchParams({
      action: 'wbcreateclaim',
      entity: entityId,
      property,
      snaktype: 'value',
      value: JSON.stringify(typeof value === 'object' ? value : { text: String(value) }),
      format: 'json'
    });
    return this.request(body);
  }

  async queryByTmdbId(tmdbId: string) {
    return this.wbSearch(`haswbstatement:P_TMDb_ID=${tmdbId}`);
  }

  async queryByUpc(upc: string) {
    return this.wbSearch(`haswbstatement:P_UPC=${upc}`);
  }

  async queryByCatalog(catalogNumber: string) {
    return this.wbSearch(`haswbstatement:P_Catalog_Number=${catalogNumber}`);
  }

  private async wbSearch(search: string) {
    const qs = new URLSearchParams({ action: 'query', list: 'search', srsearch: search, format: 'json' });
    const response = await fetch(`${this.config.apiUrl}?${qs}`);
    if (!response.ok) throw new Error(`Wikibase query failed ${response.status}`);
    return response.json();
  }

  private async editEntity(data: unknown) {
    const body = new URLSearchParams({
      action: 'wbeditentity',
      new: 'item',
      data: JSON.stringify(data),
      token: this.config.csrfToken ?? '+\\',
      format: 'json'
    });
    return this.request(body);
  }

  private async request(body: URLSearchParams) {
    const response = await fetch(this.config.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
    if (!response.ok) throw new Error(`Wikibase request failed ${response.status}`);
    return response.json();
  }
}
