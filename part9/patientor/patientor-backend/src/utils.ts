import { Gender, NewPatient } from './types';
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
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('invalid or missing date: ' + date);
  }

  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('invalid or missing ssn' + ssn);
  }

  return ssn;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('invalid or missing gender' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('invalid or missing occupation' + occupation);
  }

  return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient = {
      id: uuid(),
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newPatient;
  }
    
  throw new Error('Incorrect data: some fields are missing');
};

export default { toNewPatient };