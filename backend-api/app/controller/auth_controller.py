from fastapi import APIRouter
from fastapi import Response, HTTPException, Request
from app.service.auth_service import AuthService
from app.schema.auth_schema import LoginUser, RegisterUser
from app.util.helper import Helper
import jwt

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
async def verify_user(request: Request):
    try:
        auth_header = request.cookies.get("access_token")
        if auth_header is not None:
            decoded_token = helper.decoded_token(auth_header=auth_header)
            result = AuthService.find_user(id=int(decoded_token["user_id"]))
            return {
                "user": {
                    "username": result.username,
                    "email": result.email,
                    "role": result.role.name,
                }
            }
        else:
            raise HTTPException(status_code=401, detail="Unauthorization")
    except jwt.ExpiredSignatureError as e:
        raise HTTPException(status_code=403, detail=str(e))


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
