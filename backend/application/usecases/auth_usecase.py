from fastapi import APIRouter, status, HTTPException, Depends

from infrastructure.presenters.auth_presenter import User, Login
from domain.entities.auth_entity import SQLAlchemyAuthRepository
from datetime import timedelta

from .utils import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token


router = APIRouter()
sqlalchemy_auth_repository = SQLAlchemyAuthRepository()


@router.post("/register/", status_code=201)
async def create_user(userformdata: User):
    user = sqlalchemy_auth_repository.get_user_by_username(userformdata.username)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    user = sqlalchemy_auth_repository.create_user(userformdata)
    return {"id": user.id, "username": user.username}


@router.post("/token/")
def login_for_access_token(form_data: Login):

    user = sqlalchemy_auth_repository.get_user_by_username(form_data.username)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    elif not user.verify_password(form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"userid": user.id}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}