from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from models import Card as CardModel, session, Category
import uvicorn, uuid

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CardUserData(BaseModel):
    question: str
    answer: str
    tag: str

    # class Config:
    #     orm_mode = True


class Card(BaseModel):
    id: int
    category: str
    question: str
    answer: str
    tag: str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class CardAnswer(BaseModel):
    isValid: bool


@app.post("/cards", status_code=201)
async def create_card(caruserdata: CardUserData):
    card = CardModel(
        question=caruserdata.question,
        answer=caruserdata.answer,
        tag=caruserdata.tag,
        id=str(uuid.uuid4()),
    )
    session.add(card)
    session.commit()
    return {
        "id": card.id,
        "category": card.category.name,
        "question": card.question,
        "answer": card.answer,
        "tag": card.tag,
    }


@app.get(
    "/cards",
)
async def get_all_cards():
    todos_query = session.query(CardModel)
    return [
        {
            "id": card.id,
            "category": card.category.name,
            "question": card.question,
            "answer": card.answer,
            "tag": card.tag,
        }
        for card in todos_query.all()
    ]


@app.get(
    "/cards/{cardId}/",
)
async def get_all_cards(cardId: str, response: Response):
    cards_query = session.query(CardModel).filter(CardModel.id == cardId)
    card = cards_query.first()
    if not card:
        response.status_code = status.HTTP_404_NOT_FOUND

    return {
        "id": card.id,
        "category": card.category.name,
        "question": card.question,
        "answer": card.answer,
        "tag": card.tag,
    }


@app.get("/cards/quizz")
async def get_all_cards():
    todos_query = session.query(CardModel)
    return todos_query.all()


@app.patch("/cards/{cardId}/answer/", status_code=204)
async def answer_question(cardId: str, answer: CardAnswer, response: Response):
    "Answer a question"
    cards_query = session.query(CardModel).filter(CardModel.id == cardId)
    card = cards_query.first()
    print("hello")
    if not card:
        response.status_code = status.HTTP_404_NOT_FOUND
    else:
        if answer.isValid:
            # go to the next category
            category = Category(card.category + 1).value
        else:
            # back to first category
            category = Category.FIRST

        card.category = category
        session.add(card)
        session.commit()
        
    return {"detail": "Answer has been taken into account"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
