from fastapi import APIRouter

from models.db import Card as CardModel, session, Category


router = APIRouter()


@router.get("/cards/select")
async def get_all_cards():
    cards_query = session.query(CardModel.tag).group_by(CardModel.tag).all()
    tags = [tag[0] for tag in cards_query]
    categories = [category.name for category in Category]

    return {"tags": tags, "categories": categories}
