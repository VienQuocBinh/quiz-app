import axios from "axios";

export const BASE_URL = "https://localhost:5001/";

export const ENDPOINTS = {
  participant: "Participant",
  question: "Question",
  getAnswers: "Question/GetAnswers",
};

export const createAPIEndPoint = (endpoint) => {
  let url = BASE_URL + "api/" + endpoint + "/";
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (requestObj) => axios.post(url, requestObj),
    put: (id, updateRecord) => axios.put(url + id, updateRecord),
    delete: (id) => axios.delete(url + id),
  };
};
