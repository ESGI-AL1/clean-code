import axios from "axios";

const URL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

const cardsUrl = axios.create({
  baseURL: `${URL}/cards`,
});

export const getCard = (id) => cardsUrl.get(`/${id}/`);

export const getAllCards = () => cardsUrl.get("/");

export const getAllQuizzs = (date) => cardsUrl.get("/quizz", { params: { date: date } });

export const createCard = (card) => cardsUrl.post("", card);

export const deleteCard = (id) => cardsUrl.delete(`/${id}`);

export const updateCard = (id, card) => cardsUrl.patch(`/${id}/answer/`, card);
