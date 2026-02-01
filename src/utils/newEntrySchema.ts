import { z } from 'zod';
import { HealthCheckRating } from '../types';

const baseEntrySchema = z.object({
  date: z.iso.date(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()),
});

const HCESchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

const HESchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  date: z.iso.date(),
  criteria: z.string(),
});

const OHCESchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
});

export default z.discriminatedUnion("type", [
  HCESchema, HESchema, OHCESchema
]);