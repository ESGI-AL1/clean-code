import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from application.usecases import select_usecases
from application.usecases import card_usecases, quizz_usecases

app = FastAPI()

app.include_router(card_usecases.router)
app.include_router(quizz_usecases.router)
app.include_router(select_usecases.router)

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
