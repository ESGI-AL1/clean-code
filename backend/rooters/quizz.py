import datetime
from fastapi import APIRouter, Response, status
from sqlalchemy import or_, and_
from typing import Optional

from models.db import Card as CardModel, session, Category
from models.model import CardAnswer


router = APIRouter()


@router.get("/cards/quizz")
async def get_all_cards(date: Optional[str] = None):

    todos_query = session.query(CardModel)
    if date is None:
        date = datetime.datetime.utcnow().date()
    else:
        date_format = "%Y-%m-%d"
        date = datetime.datetime.strptime(date, date_format).date()
    # cat_1
    past_date_1 = date - datetime.timedelta(days=1)
    categories = [
        Category.SECOND,
        Category.THIRD,
        Category.FOURTH,
        Category.FIFTH,
        Category.SIXTH,
        Category.SEVENTH,
    ]

    first_cat = todos_query.filter(
        or_(
            and_(
                CardModel.last_answered == past_date_1,
                CardModel.category == Category.FIRST,
            ),
            CardModel.last_answered == None,
        )
    ).all()

    query = first_cat

    for i, category in enumerate(categories):

        pass_days = 2 ** (i + 1)  # 2, 4, 8, 16, 32, 64
        past_date_ = date - datetime.timedelta(days=pass_days)
        print(past_date_, category)
        q = (
            session.query(CardModel)
            .filter(
                CardModel.last_answered == past_date_,
                CardModel.category == category,
            )
            .all()
        )

        query.extend(q)

    print(query)
    return [
        {
            "id": card.id,
            "category": card.category.name,
            "question": card.question,
            "answer": card.answer,
            "tag": card.tag,
            "last_answered": card.last_answered,
        }
        for card in first_cat  # todos_query.all()
    ]


@router.patch("/cards/{cardId}/answer/", status_code=204)
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
        card.last_answered = datetime.datetime.utcnow()
        session.add(card)
        session.commit()

    return {"detail": "Answer has been taken into account"}
