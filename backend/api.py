import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from rooters import quizz, card, select

app = FastAPI()

app.include_router(card.router)
app.include_router(quizz.router)
app.include_router(select.router)

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
