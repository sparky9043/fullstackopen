import { NewPatient } from './types';
import { v1 as uuid } from 'uuid';

const isString = (input: unknown): input is string => {
  return typeof input === 'string' || input instanceof String;
};

const parseName = (name: unknown) => {
  if (!name || !isString(name)) {
    throw new Error('invalid or missing name: ' + name);
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('invalid or missing date: ' + date);
  }

  return date;
};

const parseSSN = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('invalid or missing ssn' + input);
  }

  return input;
};

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