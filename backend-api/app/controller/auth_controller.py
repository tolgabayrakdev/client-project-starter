from fastapi import APIRouter
from fastapi import Response, HTTPException, Request, Depends
from app.service.auth_service import AuthService
from app.schema.auth_schema import LoginUser, RegisterUser
from app.util.helper import Helper
from typing import Annotated
from app.middleware.auth_middleware import auth_middleware
from ..model import User

auth_router = APIRouter()
helper = Helper()


@auth_router.post("/login")
async def login(user: LoginUser, response: Response) -> dict[str, str]:
    result = AuthService.login(user.email, user.password)
    if result:
        response.set_cookie(
            key="access_token", value=result["access_token"], httponly=True  # type: ignore
        )
        response.set_cookie(
            key="refresh_token", value=result["refresh_token"], httponly=True  # type: ignore
        )
        return {"message": "Login is successful."}
    else:
        raise HTTPException(status_code=500, detail="Server error!")


@auth_router.post("/register", status_code=201)
async def register(user: RegisterUser) -> dict[str, str]:
    return AuthService.register(payload=user)


@auth_router.post("/logout")
async def logout(response: Response) -> dict[str, str]:
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Your logout has been completed successfully."}


@auth_router.post("/verify")
async def verify_user(auth_user: Annotated[User, Depends(auth_middleware)]):
    return {
        "user": {
            "username": auth_user.username,
            "email": auth_user.email,
            "role": auth_user.role.name,
        }
    }


@auth_router.post("/refresh_token")
async def generate_access_token(request: Request, response: Response):
    result = AuthService.generate_new_access_token(
        refresh_token=str(request.cookies.get("refresh_token"))
    )
    if result:
        response.delete_cookie("access_token")
        response.set_cookie(
            key="access_token", value=result["new_access_token"], httponly=True
        )
        return {"message": "Your session period has been extended."}
    else:
        raise HTTPException(status_code=500, detail="Server error!")
