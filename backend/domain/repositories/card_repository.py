from abc import ABC, abstractmethod


class CardRepository(ABC):
    @abstractmethod
    def get_card_by_id(self, card_id: str, userid):
        pass

    @abstractmethod
    def create_card(self, card, userid):
        pass

    @abstractmethod
    def get_all_cards(self, card, userid):
        pass