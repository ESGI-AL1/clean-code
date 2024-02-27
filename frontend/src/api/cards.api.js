import axios from "axios";

const URL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

const cardsUrl = axios.create({
  baseURL: `${URL}/cards`,
});


cardsUrl.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCard = (id) => cardsUrl.get(`/${id}/`);

export const getAllCards = (category, tag) => cardsUrl.get("/", { params: { category: category, tag: tag } });

export const getAllQuizzs = (date) => cardsUrl.get("/quizz", { params: { date: date } });

export const createCard = (card) => cardsUrl.post("", card);

export const selectFilter = () => cardsUrl.get("/select");

export const updateCard = (id, card) => cardsUrl.patch(`/${id}/answer/`, card);
