from pydantic import BaseModel

class auth(BaseModel):
    username: str
    password: str
