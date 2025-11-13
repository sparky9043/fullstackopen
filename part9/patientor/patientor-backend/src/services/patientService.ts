import patientsData from '../../data/patients';
import { Patient, PatientWithoutSSN, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) =>
    ({ id, name, dateOfBirth, gender, occupation }));
};

const getPatientById = (id: string): PatientWithoutSSN | undefined => {
  const savedPatient = patientsData.find(p => p.id === id);
  return savedPatient;
};

const addPatient = (patientObj: NewPatient): Patient => {
  const newPatient = {
    ...patientObj,
    id: uuid(),
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatientsWithoutSSN, getPatientById, addPatient };