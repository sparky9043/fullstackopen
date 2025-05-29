import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const fetchPersons = async () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createPerson = async (personObject) => {
  return axios.post(baseUrl, personObject).then((response) => response.data);
};

const deletePerson = async (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default {
  fetchPersons,
  createPerson,
  deletePerson,
};
