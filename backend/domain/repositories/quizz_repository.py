from abc import ABC, abstractmethod


class QuizzRepository(ABC):
    @abstractmethod
    def answer_question(self, card_id, answer, userid):
        pass

    @abstractmethod
    def get_all_quizz(self, userid, date=None):
        pass