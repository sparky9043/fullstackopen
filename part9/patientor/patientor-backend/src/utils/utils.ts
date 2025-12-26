import { z } from 'zod';
import { Gender } from '../types';

const newPatientDataSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

const newEntryDataBaseSchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const newEntryHealthCheckSchema = z.object({
  type: z.string('HealthCheck'),
  healthCheckRating: z.number(),
});

const newEntryOccupationalHealthcareSchema = z.object({
  type: z.string('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
  }).optional(),
});

const newEntryHospitalSchema = z.object({
  type: z.string('Hospital'),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

export default {
  newPatientDataSchema,
  newEntryDataBaseSchema,
  newEntryHealthCheckSchema,
  newEntryOccupationalHealthcareSchema,
  newEntryHospitalSchema,
};