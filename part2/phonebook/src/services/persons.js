import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const fetchPersons = async () => {
  const test = {
    id: "djiod24",
    name: "DURRRRR",
    phone: "1231-313123-123",
  };
  return axios.get(baseUrl).then((response) => response.data.concat(test));
};

const createPerson = async (personObject) => {
  return axios.post(baseUrl, personObject).then((response) => response.data);
};

const deletePerson = async (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const updatePerson = async (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

export default {
  fetchPersons,
  createPerson,
  deletePerson,
  updatePerson,
};
