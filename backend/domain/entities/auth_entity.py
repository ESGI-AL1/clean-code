from infrastructure.database.models import User, session
from domain.repositories.auth_repository import AuthRepository


class SQLAlchemyAuthRepository(AuthRepository):
    def __init__(self):
        self.db = session

    def get_user_by_username(self, username: str) -> User:
        return self.db.query(User).filter_by(username=username).first()

    def create_user(self, userformdata) -> User:
        user = User(
            username=userformdata.username,
            password=userformdata.password,
            last_name=userformdata.last_name,
            first_name=userformdata.first_name,
        )
        user.set_password(userformdata.password)
        session.add(user)
        session.commit()

        return user