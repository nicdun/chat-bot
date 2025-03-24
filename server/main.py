from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.logger import logger
import logging
from features.llm.google_gemini import handle_conversation, handle_google_api
from fastapi.middleware.cors import CORSMiddleware
from model import ChatResponse, Input
import uuid
import json

app = FastAPI()

logger.setLevel(logging.DEBUG)

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/chat")
async def chat(input: Input) -> ChatResponse:
    logger.debug(f"Received input: question={input.messages}, model={input.model}")

    stream = None
    if input.model == "gemini-2.0-flash":
        stream = handle_google_api(input.messages)
    elif input.model == "local":
        stream = handle_conversation(input.messages)
    else:
        raise HTTPException(status_code=404, detail="model not found")

    response = StreamingResponse(stream_text(stream))
    response.headers["x-vercel-ai-data-stream"] = "v1"
    return response


def stream_text(stream):
    for chunk in stream:
        yield "0:{text}\n".format(text=json.dumps(chunk.text))
