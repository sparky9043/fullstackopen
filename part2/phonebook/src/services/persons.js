import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const fetchPersons = async () => {
  return axios.get(baseUrl).then((response) => response.data);
};

export default {
  fetchPersons,
};
