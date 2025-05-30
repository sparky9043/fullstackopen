import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = async () => {
  return axios.get(`${baseUrl}/all`).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export default {
  getAll,
};
