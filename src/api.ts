import axios from "axios";
import { allFruits } from "./mockData/testData";

const instance = axios.create({
  baseURL: "https://www.fruityvice.com",
  // withCredentials: true,
});

//--------------------------------------------------------------------
//Because of CORS error, local server can not load the original data!!
//--------------------------------------------------------------------
export const getAllFruits = async () => {
  await new Promise((r) => setTimeout(r, 1500));
  return allFruits;
};

// export const getAllFruits = async () =>
//   instance.get("api/fruit/all").then((response) => response.data);
