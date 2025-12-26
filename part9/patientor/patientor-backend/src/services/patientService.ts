import patientsData from '../../data/patients';
import { Patient, PatientWithoutSSN, NewPatient, EntryWithoutId, Diagnosis, Entry } from '../types';
import { v1 as uuid } from 'uuid';
import utils from '../utils/utils';
// import diagnosesService from './diagnosesService';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) =>
    ({ id, name, dateOfBirth, gender, occupation }));
};

const getPatientById = (id: string): Patient | undefined => {
  const savedPatient = patientsData.find(p => p.id === id);
  return savedPatient;
};

const addPatient = (patientObj: NewPatient): Patient => {
  const newPatient = {
    ...patientObj,
    id: uuid(),
    entries: [],
  };

  patientsData.push(newPatient);
  return newPatient;
};

const addEntryToPatientById = (entryObject: EntryWithoutId, patientId: string) => {
  const savedPatient = getPatientById(patientId);

  const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };

  const diagnosisCodes = parseDiagnosisCodes(entryObject);

  const parseBaseEntry = (object: unknown): Entry => {
    if (
      !object                     ||
      typeof object !== 'object'  ||
      !('type' in object)
    ) {
      throw new Error('');
    }
    
    return object as Entry;
  };

  const entry = {
    id: uuid(),
    ...entryObject,
    diagnosisCodes,
  };

  const savedEntry = parseBaseEntry(entry);

  switch (entryObject.type) {
    case 'HealthCheck':
      utils.newEntryHealthCheckSchema.parse(savedEntry);
      savedPatient?.entries.push(savedEntry);
      return savedEntry;
    case 'OccupationalHealthcare':
      utils.newEntryOccupationalHealthcareSchema.parse(savedEntry);
      savedPatient?.entries.push(savedEntry);
      return savedEntry;
    default:
      throw new Error(`${entryObject.type} is unknown`);
  }

};

export default { getPatients, getPatientsWithoutSSN, getPatientById, addPatient, addEntryToPatientById };