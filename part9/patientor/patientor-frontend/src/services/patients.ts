import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatientById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (object: EntryWithoutId, patientId: string) => {
  const url = `${apiBaseUrl}/patients/${patientId}/entries`;

  const { description, date, specialist, diagnosisCodes, type } = object;

  switch (type) {
    case 'HealthCheck':
      return await axios.post<Entry>(url, object).then(response => response.data);
    case 'OccupationalHealthcare':
      if (!object.sickLeave?.startDate || !object.sickLeave?.endDate) {
        return await axios.post<Entry>(url, {
          description, date, specialist, diagnosisCodes, type,
          employerName: object.employerName,
        }).then(response => response.data);
      } else {
        return await axios.post<Entry>(url, {
          description, date, specialist, diagnosisCodes, type,
          employerName: object.employerName,
          sickLeave: object.sickLeave,
        }).then(response => response.data);
      }
    default:
      throw new Error(`invalid type: ${object.type}`);
  }
  // const { data } = await axios.post<Entry>(
  //   `${apiBaseUrl}/patients/${patientId}/entries`,
  //   object
  // );

  // return data;
};

export default {
  getAll,
  getPatientById,
  create,
  addEntry,
};

