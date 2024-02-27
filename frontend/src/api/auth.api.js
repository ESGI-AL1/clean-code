import axios from "axios";

const URL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";


const usersUrl = axios.create({
  baseURL: `${URL}`,
});


// Authentication

export const createUser = (user) => usersUrl.post("/register/", user);
export const loginUser = (user) => usersUrl.post("/token/", user);