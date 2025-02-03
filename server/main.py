from fastapi import FastAPI, logger
from typing import List
import logging
from llm import handle_conversation
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

logger.logger.setLevel(logging.DEBUG)

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_methods=["*"],
    allow_headers=["*"],
)


class Input(BaseModel):
    question: str
    context: List


@app.post("/chat")
async def chat(input: Input):
    return handle_conversation(input.question, input.context)
