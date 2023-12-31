from fastapi import APIRouter, Depends
from app.service.password_reset_service import PasswordResetService
from app.middleware.auth_middleware import auth_middleware
from typing import Annotated
from ..model import User
from app.schema.reset_token_schema import CheckToken


password_reset_router = APIRouter()


@password_reset_router.post("/generate", status_code=201)
async def generate_token(auth_user: Annotated[User, Depends(auth_middleware)]):
    return PasswordResetService.generate_token(user_id=int(auth_user.id))  # type: ignore


@password_reset_router.post("/check_token")
async def check_token(token: CheckToken):
    return PasswordResetService.check_token(token=token.token)

