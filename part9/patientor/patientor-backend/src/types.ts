import { z } from 'zod';
import utils from './utils/utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
};

export type NewPatient = z.infer<typeof utils.newPatientDataSchema>;

export interface Patient extends NewPatient {
  id: string,
};

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;