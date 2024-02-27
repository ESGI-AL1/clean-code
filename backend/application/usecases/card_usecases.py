from fastapi import APIRouter, Response, status, Depends
from fastapi.security import OAuth2PasswordBearer

from typing import Optional

from infrastructure.presenters.card_presenter import CardUserData
from domain.entities.card_entity import SQLAlchemyCardRepository

from .utils import (
    oauth2_scheme,
    decode_token,
)

router = APIRouter()
sqlalchemy_card_repository = SQLAlchemyCardRepository()

# OAuth2PasswordBearer for token retrieval
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post("/cards/", status_code=201)
async def create_card(
    caruserdata: CardUserData,
    token: str = Depends(oauth2_scheme),
):
    payload = decode_token(token)
    userid = payload.get("userid")
    card = sqlalchemy_card_repository.create_card(caruserdata, userid)
    return {
        "id": card.id,
        "category": card.category.name,
        "question": card.question,
        "answer": card.answer,
        "tag": card.tag,
    }


@router.get("/cards/")
async def get_all_cards(
    token: str = Depends(oauth2_scheme),
    category: Optional[str] = None,
    tag: Optional[str] = None,
):
    payload = decode_token(token)
    userid = payload.get("userid")
    cards = sqlalchemy_card_repository.get_all_cards(userid, category, tag)
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
async def get_card_by_id(
    cardId: str, response: Response, token: str = Depends(oauth2_scheme)
):
    payload = decode_token(token)
    userid = payload.get("userid")
    card = sqlalchemy_card_repository.get_card_by_id(cardId, userid)
    if not card:
        response.status_code = status.HTTP_404_NOT_FOUND

    return {
        "id": card.id,
        "category": card.category.name,
        "question": card.question,
        "answer": card.answer,
        "tag": card.tag,
    }