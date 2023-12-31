from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import model
from .database import engine
from app.controller import auth_controller, password_reset_controller

app = FastAPI()
model.Base.metadata.create_all(bind=engine)

origins = ["http://localhost:5173", "https://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def index():
    return {"hello": "backend"}


app.include_router(router=auth_controller.auth_router, prefix="/api/v1/auth")
app.include_router(
    router=password_reset_controller.password_reset_router,
    prefix="/api/v1/reset_password",
)
