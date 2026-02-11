import { describe, expect, it } from 'vitest';
import { contributionSchema } from '../src/schemas';

describe('contributionSchema', () => {
  it('accepts valid release input', () => {
    const result = contributionSchema.safeParse({
      movieId: '603',
      distributor: 'Warner',
      region: 'US',
      catalogNumber: 'X123',
      upc: '12345678',
      packaging: 'slip'
    });
    expect(result.success).toBe(true);
  });
});
