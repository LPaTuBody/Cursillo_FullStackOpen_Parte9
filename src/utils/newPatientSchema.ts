import { object, z } from 'zod';
import { Gender } from '../types';

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(object())
});

export default newPatientSchema;