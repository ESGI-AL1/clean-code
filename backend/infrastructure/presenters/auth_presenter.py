from pydantic import BaseModel


class User(BaseModel):
    username: str
    first_name: str
    last_name: str
    password: str

class Login(BaseModel):
    username: str
    password: str