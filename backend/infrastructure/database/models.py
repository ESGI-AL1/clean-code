import enum
from sqlalchemy import (
    Column,
    Integer,
    String,
    TypeDecorator,
    Date,
)
from sqlalchemy.orm import declarative_base
from .config import Session, engine


session = Session()

Base = declarative_base()


class Category(enum.IntEnum):
    FIRST = 1
    SECOND = 2
    THIRD = 3
    FOURTH = 4
    FIFTH = 5
    SIXTH = 6
    SEVENTH = 7
    DONE = 8


class IntEnum(TypeDecorator):
    """
    Enables passing in a Python enum and storing the enum's *value* in the db.
    The default would have stored the enum's *name* (ie the string).
    """

    impl = Integer
    cache_ok = True

    def __init__(self, enumtype, *args, **kwargs):
        super(IntEnum, self).__init__(*args, **kwargs)
        self._enumtype = enumtype

    def process_bind_param(self, value, dialect):
        if isinstance(value, int):
            return value

        return value.value

    def process_result_value(self, value, dialect):
        return self._enumtype(value)


class Card(Base):
    __tablename__ = "cards"

    id = Column(String, primary_key=True)
    question = Column(String)
    answer = Column(String)
    tag = Column(String)
    category = Column(IntEnum(Category), default=Category.FIRST)
    last_answered = Column(Date, nullable=True)


Base.metadata.create_all(engine)
