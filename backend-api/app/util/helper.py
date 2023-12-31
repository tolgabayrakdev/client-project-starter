import hashlib
import time
import jwt
from fastapi import HTTPException


class Helper:
    @classmethod
    def generate_hash_password(cls, password: str) -> str:
        salt = "secret_salt_key"
        return (
            hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ":" + salt
        )

    @classmethod
    def match_hash_text(cls, hashedText: str, providedText: str) -> bool:
        _hashedText, salt = hashedText.split(":")
        return (
            _hashedText
            == hashlib.sha256(salt.encode() + providedText.encode()).hexdigest()
        )

    @classmethod
    def generate_access_token(cls, payload: dict) -> str:
        return jwt.encode(
            {"payload": payload, "exp": int(time.time()) + 10},
            "secret_key",
            algorithm="HS256",
        )

    @classmethod
    def generate_refresh_token(cls, payload: dict) -> str:
        return jwt.encode(
            {"payload": payload, "exp": int(time.time()) + 10000},
            "secret_key",
            algorithm="HS256",
        )

    @classmethod
    def decoded_token(cls, auth_header) -> dict[str, str]:
        decoded_token = jwt.decode(auth_header, "secret_key", algorithms=["HS256"])
        if decoded_token:
            payload = decoded_token["payload"]
            return payload
        else:
            return {"message": "hata"}

    @classmethod
    def decoded_refresh_token(cls, refresh_token: str):
        try:
            decoded_token = jwt.decode(
                refresh_token, "secret_key", algorithms=["HS256"]
            )
            if decoded_token:
                payload = decoded_token["payload"]
                return payload
        except jwt.ExpiredSignatureError as e:
            raise HTTPException(status_code=403, detail=str(e))
