from pydantic import BaseModel


class CheckToken(BaseModel):
    token: str