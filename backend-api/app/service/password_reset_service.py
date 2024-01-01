from ..database import SessionLocal
from ..model import UserResetPassword
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime, timedelta
import uuid


db = SessionLocal()


class PasswordResetService:
    @staticmethod
    def generate_token(user_id):
        try:
            user_reset_password = UserResetPassword(user_id=user_id, token=uuid.uuid4())
            db.add(user_reset_password)
            db.commit()
            return {
                "message": "Password change token created. You have a 15 minutes for change password"
            }
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def check_token(token):
        try:
            password_token = db.query(UserResetPassword).filter_by(token=token).first()
            if password_token:
                token_creation_time = password_token.created_time
                # Şu anki zaman
                current_time = datetime.now()
                # 15 dakika öncesinin zamanı
                fifteen_minutes_ago = current_time - timedelta(minutes=15)
                # Token'in oluşturulma zamanı, 15 dakika öncesinden önceyse geçerlidir
                if token_creation_time > fifteen_minutes_ago:  # type: ignore
                    return True
                else:
                    return False
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=str(e))
