from sqlalchemy import or_, and_

from infrastructure.database.models import Card, session, Category
from domain.repositories.quizz_repository import QuizzRepository
import datetime


class SQLAlchemyQuizzRepository(QuizzRepository):
    def __init__(self):
        self.db = session

    def get_all_quizz(self, date=None):
        cards = session.query(Card).filter(Card.category != Category.DONE)

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

        first_cat = cards.filter(
            or_(
                and_(
                    Card.last_answered == past_date_1,
                    Card.category == Category.FIRST,
                ),
                Card.last_answered == None,
            )
        ).all()

        query = first_cat

        for i, category in enumerate(categories):

            pass_days = 2 ** (i + 1)  # 2, 4, 8, 16, 32, 64
            past_date_ = date - datetime.timedelta(days=pass_days)
            print(past_date_, category)
            q = (
                session.query(Card)
                .filter(
                    Card.last_answered == past_date_,
                    Card.category == category,
                )
                .all()
            )

            query.extend(q)

        return query

    def answer_question(self, card_id, answer) -> Card:
        cards_query = session.query(Card).filter(Card.id == card_id)
        card = cards_query.first()

        if not card:
            return None
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
            return card
