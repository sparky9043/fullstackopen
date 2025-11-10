import patientsData from '../../data/patients';
import { Patient, PatientWithoutSSN } from '../types';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) =>
    ({ id, name, dateOfBirth, gender, occupation }));
};

export default { getPatients, getPatientsWithoutSSN };