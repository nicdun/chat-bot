from uuid import UUID
from pydantic import BaseModel
from typing import List


class Input(BaseModel):
    messages: List
    model: str
    id: str


class ChatResponse(BaseModel):
    sender: str
    messages: List
    id: UUID
