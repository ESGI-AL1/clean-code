# Cœur Métier (domain.py)
from abc import ABC, abstractmethod


class CardRepository(ABC):
    @abstractmethod
    def get_card_by_id(self, card_id: str):
        pass

    @abstractmethod
    def create_card(self, card):
        pass

    @abstractmethod
    def get_all_cards(self, card):
        pass

