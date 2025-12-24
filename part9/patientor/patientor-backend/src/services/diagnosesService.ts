import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesData;
};

const getDiagnosisByCode = (code: string): Diagnosis => {
  const savedDiagnosis = diagnosesData.find(diagnosis => diagnosis.code === code);

  if (!savedDiagnosis) {
    throw new Error('code invalid');
  }

  return savedDiagnosis;
};

export default { getDiagnoses, getDiagnosisByCode };