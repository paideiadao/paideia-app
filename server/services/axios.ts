import axios from "axios";

export const paideiaApi = axios.create({
  baseURL: `${process.env.API_URL}`,
  headers: {
    "Content-type": "application/json",
  },
});
