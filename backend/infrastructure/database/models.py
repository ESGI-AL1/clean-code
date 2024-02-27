import enum
from passlib.context import CryptContext

from sqlalchemy import Column, Integer, String, TypeDecorator, Date, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from .config import Session, engine


session = Session()

Base = declarative_base()
# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


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


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    password = Column(String, nullable=False)

    def set_password(self, password):
        self.password = pwd_context.hash(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password)


class Card(Base):
    __tablename__ = "cards"

    id = Column(String, primary_key=True)
    question = Column(String)
    answer = Column(String)
    tag = Column(String)
    category = Column(IntEnum(Category), default=Category.FIRST)
    last_answered = Column(Date, nullable=True)
    author = relationship("User")  # Lien avec la classe User
    author_id = Column(Integer, ForeignKey("users.id"))  # Ref a la table user


Base.metadata.create_all(engine)