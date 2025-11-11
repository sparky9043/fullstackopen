import { NewPatient } from './types';
import { v1 as uuid } from 'uuid';

// const isString = (input: unknown) => {
//   return typeof input === 'string' || input instanceof String;
// };

const toNewPatient = (object: unknown): NewPatient => {
  console.log(object);
  const newPatient = {
    id: uuid(),
    name: 'Tommy Hilfiger',
    dateOfBirth: '1998-12-17',
    ssn: '311238-AAX',
    gender: 'male',
    occupation: 'king of the world',
  };

  return newPatient;
};

export default { toNewPatient };