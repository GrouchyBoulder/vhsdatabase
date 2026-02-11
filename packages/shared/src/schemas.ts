import { z } from 'zod';
import { VHS_PACKAGING } from './constants';

export const contributionSchema = z.object({
  movieId: z.string().min(1),
  distributor: z.string().min(1),
  region: z.string().min(1),
  catalogNumber: z.string().min(1),
  upc: z.string().min(8).max(20),
  packaging: z.enum(VHS_PACKAGING),
  releaseYear: z.coerce.number().int().min(1900).max(2100).optional(),
  notes: z.string().max(2000).optional()
});

export const collectionItemSchema = z.object({
  releaseId: z.string(),
  condition: z.enum(['mint', 'very_good', 'good', 'fair', 'poor']),
  sealed: z.boolean().default(false),
  pricePaid: z.number().nonnegative().optional(),
  acquiredAt: z.string().datetime().optional(),
  notes: z.string().max(500).optional()
});

export type ContributionInput = z.infer<typeof contributionSchema>;
