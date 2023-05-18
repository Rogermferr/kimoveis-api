import { z } from 'zod';
import { addressRequestSchema, addressSchema } from './addresses.schemas';
import { categorySchema } from './categories.schemas';

const realEstateSchema = z.object({
  id: z.number(),
  sold: z.boolean().default(false),
  value: z.union([z.number(), z.string()]).default(0),
  size: z.number().positive(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
  address: addressRequestSchema,
  categoryId: z.number(),
});

realEstateSchema;

const realEstateRequestSchema = realEstateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const realEstateResponseSchema = z.object({
  id: z.number(),
  sold: z.boolean().default(false),
  value: z.union([z.number(), z.string()]).default(0),
  size: z.number().positive(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
  address: addressSchema,
  category: categorySchema,
});

export { realEstateSchema, realEstateRequestSchema, realEstateResponseSchema };
