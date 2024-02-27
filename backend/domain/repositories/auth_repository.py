from abc import ABC, abstractmethod


class AuthRepository(ABC):
    @abstractmethod
    def get_user_by_username(self, username: str):
        pass

    @abstractmethod
    def create_user(self, user):
        pass