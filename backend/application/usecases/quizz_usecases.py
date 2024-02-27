from fastapi import APIRouter, Response, status, Depends
from typing import Optional

from infrastructure.presenters.card_presenter import CardAnswer
from domain.entities.quizz_entity import SQLAlchemyQuizzRepository

from .utils import (
    oauth2_scheme,
    decode_token,
)

router = APIRouter()
sql_alchemy_quizz_repo = SQLAlchemyQuizzRepository()


@router.get("/cards/quizz")
async def get_all_quizz(
    date: Optional[str] = None, token: str = Depends(oauth2_scheme)
):
    payload = decode_token(token)
    userid = payload.get("userid")
    print(userid)
    cards = sql_alchemy_quizz_repo.get_all_quizz(userid, date)

    return [
        {
            "id": card.id,
            "category": card.category.name,
            "question": card.question,
            "answer": card.answer,
            "tag": card.tag,
            "last_answered": card.last_answered,
        }
        for card in cards
    ]


@router.patch("/cards/{cardId}/answer/", status_code=204)
async def answer_question(
    cardId: str,
    answer: CardAnswer,
    response: Response,
    token: str = Depends(oauth2_scheme),
):
    "Answer a question"
    payload = decode_token(token)
    userid = payload.get("userid")
    updated = sql_alchemy_quizz_repo.answer_question(cardId, answer, userid)
    if not updated:
        response.status_code = status.HTTP_404_NOT_FOUND

    return {"detail": "Answer has been taken into account"}