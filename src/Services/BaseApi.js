import axios from "axios";

export const BaseApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export const getContact = () => BaseApi.get("/posts");
