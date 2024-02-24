from pydantic import BaseModel


class CardUserData(BaseModel):
    question: str
    answer: str
    tag: str


class Card(BaseModel):
    id: int
    category: str
    question: str
    answer: str
    tag: str


class CardAnswer(BaseModel):
    isValid: bool
