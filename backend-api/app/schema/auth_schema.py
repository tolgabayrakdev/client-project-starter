from pydantic import BaseModel, Field


class LoginUser(BaseModel):
    email: str
    password: str


class RegisterUser(BaseModel):
    username: str = Field(
        min_length=3
    )
    email: str
    password: str