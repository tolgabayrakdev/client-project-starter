from ..database import SessionLocal
from ..model import User
from app.util.helper import Helper
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException, Request
from app.schema.auth_schema import RegisterUser
import jwt

db = SessionLocal()
helper = Helper()


class AuthService:
    @staticmethod
    def login(email: str, password: str) -> HTTPException | dict[str, str]:
        user = db.query(User).filter_by(email=email).first()
        if user is None or not Helper.match_hash_text(str(user.password), password):
            raise HTTPException(status_code=400, detail="Email or password wrong!")
        access_token = Helper.generate_access_token({"user_id": user.id})
        refresh_token = Helper.generate_refresh_token({"user_id": user.id})
        return {"access_token": access_token, "refresh_token": refresh_token}

    @staticmethod
    def register(payload: RegisterUser):
        try:
            user = User(
                username=payload.username,
                email=payload.email,
                password=helper.generate_hash_password(password=payload.password),
                role_id=1,
            )
            db.add(user)
            db.commit()
            return {"message": "User created successful."}
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def find_user(id: int):
        user = db.query(User).filter_by(id=id).first()
        if user:
            return user
        else:
            raise HTTPException(status_code=404, detail="User not found!")

    @staticmethod
    def generate_new_access_token(refresh_token: str) -> dict[str, str]:
        decoded_token = helper.decoded_refresh_token(refresh_token=refresh_token)
        if decoded_token:
            new_access_token = helper.generate_access_token(
                payload={"user_id": decoded_token["user_id"]}
            )
            return {"new_access_token": new_access_token}
        else:
            raise HTTPException(
                status_code=403, detail="You dont have a refresh_token!"
            )
