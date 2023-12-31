from fastapi import Request, HTTPException
from ..database import SessionLocal
from ..model import User
import jwt


async def auth_middleware(request: Request):
    # HTTP taleplerinden access tokenı alıyoruz
    access_token = request.cookies.get("access_token")
    if access_token:
        # Token varsa, kullanıcı kimliğini doğrulayalım
        try:
            payload = jwt.decode(access_token, "secret_key", algorithms=["HS256"])
            user_id = payload.get("payload")
            db = SessionLocal()
            user = db.query(User).filter(User.id == user_id["user_id"]).first()
            if not user:
                raise HTTPException(status_code=401, detail="Invalid token")
            return user
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=403, detail="Invalid token")
