import patientsData from '../../data/patients';
import { Patient } from '../types';

const getPatients = (): Patient[] => {
  return patientsData;
};

export default { getPatients };