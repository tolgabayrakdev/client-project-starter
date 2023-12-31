from fastapi import Request, HTTPException
from ..database import SessionLocal
from ..model import User
import jwt

db = SessionLocal()


async def role_middleware(request: Request):
    access_token = request.cookies.get("access_token")
    if access_token:
        try:
            payload = jwt.decode(access_token, "secret_key", algorithms=["HS256"])
            user_id = int(payload.get("payload"))
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                raise HTTPException(status_code=401, detail="Invalid token!")
            elif user.role == "user":
                raise HTTPException(
                    status_code=403, detail="Only admin access this endpoint!"
                )
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired!")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=403, detail="Invalid token!")
