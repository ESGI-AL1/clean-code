from fastapi import APIRouter, Response, status
from typing import Optional

from models.db import Card as CardModel, session, Category
from models.model import CardUserData
import uuid

router = APIRouter()


@router.post("/cards/", status_code=201)
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


@router.get("/cards/")
async def get_all_cards(category: Optional[str] = None, tag: Optional[str] = None):
    todos_query = session.query(CardModel)
    if category is not None and category != "DEFAULT":
        todos_query = todos_query.filter(CardModel.category == Category[category])
    if tag is not None and tag != "DEFAULT":
        todos_query = todos_query.filter(CardModel.tag == tag)

    return [
        {
            "id": card.id,
            "category": card.category.name,
            "question": card.question,
            "answer": card.answer,
            "tag": card.tag,
            "last_answered": card.last_answered,
        }
        for card in todos_query.all()
    ]


@router.get("/cards/{cardId}/")
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
