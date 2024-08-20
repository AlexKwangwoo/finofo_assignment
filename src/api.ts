import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

export const getAllFruits = async () =>
  instance.get("/api/fruit/all").then((response) => response.data);
