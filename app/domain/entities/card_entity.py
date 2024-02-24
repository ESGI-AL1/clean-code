from infrastructure.database.models import Card, session, Category
from domain.repositories.card_repository import CardRepository
import uuid


class SQLAlchemyCardRepository(CardRepository):
    def __init__(self):
        self.db = session

    def get_all_cards(self, category=None, tag=None):
        cards = session.query(Card)
        if category is not None and category != "DEFAULT":
            cards = cards.filter(Card.category == Category[category])
        if tag is not None and tag != "DEFAULT":
            cards = cards.filter(Card.tag == tag)

        return cards

    def get_card_by_id(self, card_id: str) -> Card:
        return self.db.query(Card).filter(Card.id == card_id).first()

    def create_card(self, caruserdata) -> Card:
        card = Card(
            question=caruserdata.question,
            answer=caruserdata.answer,
            tag=caruserdata.tag,
            id=str(uuid.uuid4()),
        )

        self.db.add(card)
        self.db.commit()
        self.db.refresh(card)

        return card
