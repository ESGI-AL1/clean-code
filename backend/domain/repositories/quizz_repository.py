# Cœur Métier (domain.py)
from abc import ABC, abstractmethod


class QuizzRepository(ABC):
    @abstractmethod
    def answer_question(self, card_id, answer):
        pass

    @abstractmethod
    def get_all_quizz(self, date=None):
        pass
