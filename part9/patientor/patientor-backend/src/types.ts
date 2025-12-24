import { z } from 'zod';
import utils from './utils/utils';

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

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCode?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthCare";
  employerName: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type PatientWithoutSSN = Omit<Patient, 'ssn' | 'entries' >;