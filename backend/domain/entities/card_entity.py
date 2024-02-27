from infrastructure.database.models import Card, session, Category
from domain.repositories.card_repository import CardRepository
import uuid


class SQLAlchemyCardRepository(CardRepository):
    def __init__(self):
        self.db = session

    def get_all_cards(self, userid, category=None, tag=None):
        cards = session.query(Card).filter(Card.author_id == userid)
        if category is not None and category != "DEFAULT":
            cards = cards.filter(Card.category == Category[category])
        if tag is not None and tag != "DEFAULT":
            cards = cards.filter(Card.tag == tag)

        return cards

    def get_card_by_id(self, card_id: str, userid) -> Card:
        return (
            self.db.query(Card)
            .filter(Card.id == card_id, Card.author_id == userid)
            .first()
        )

    def create_card(self, caruserdata, userid) -> Card:
        card = Card(
            question=caruserdata.question,
            answer=caruserdata.answer,
            tag=caruserdata.tag,
            author_id=userid,
            id=str(uuid.uuid4()),
        )

        self.db.add(card)
        self.db.commit()
        self.db.refresh(card)

        return card