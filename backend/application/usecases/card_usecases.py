from fastapi import APIRouter, Response, status
from typing import Optional

from infrastructure.presenters.card_presenter import CardUserData
from domain.entities.card_entity import SQLAlchemyCardRepository


router = APIRouter()
sqlalchemy_card_repository = SQLAlchemyCardRepository()


@router.post("/cards/", status_code=201)
async def create_card(caruserdata: CardUserData):
    card = sqlalchemy_card_repository.create_card(caruserdata)
    return {
        "id": card.id,
        "category": card.category.name,
        "question": card.question,
        "answer": card.answer,
        "tag": card.tag,
    }


@router.get("/cards/")
async def get_all_cards(category: Optional[str] = None, tag: Optional[str] = None):
    cards = sqlalchemy_card_repository.get_all_cards(category, tag)

    return [
        {
            "id": card.id,
            "category": card.category.name,
            "question": card.question,
            "answer": card.answer,
            "tag": card.tag,
            "last_answered": card.last_answered,
        }
        for card in cards.all()
    ]


@router.get("/cards/{cardId}/")
async def get_card_by_id(cardId: str, response: Response):
    card = sqlalchemy_card_repository.get_card_by_id(cardId)
    if not card:
        response.status_code = status.HTTP_404_NOT_FOUND

    return {
        "id": card.id,
        "category": card.category.name,
        "question": card.question,
        "answer": card.answer,
        "tag": card.tag,
    }
