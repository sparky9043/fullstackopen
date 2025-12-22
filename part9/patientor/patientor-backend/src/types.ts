import { z } from 'zod';
import utils from './utils/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {

}

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
  entries: Entry[],
};

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;