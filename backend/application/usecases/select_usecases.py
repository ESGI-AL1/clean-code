from fastapi import APIRouter

from infrastructure.database.models import Card as CardModel, session, Category


router = APIRouter()


@router.get("/cards/select")
async def get_selects():
    cards_query = session.query(CardModel.tag).group_by(CardModel.tag).all()
    tags = [tag[0] for tag in cards_query]
    categories = [category.name for category in Category]

    return {"tags": tags, "categories": categories}