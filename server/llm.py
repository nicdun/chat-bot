from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from google import genai
from model import ChatResponse, Input

from config import get_env


template = """
Answer the following question. 
Do not allow rude questions.
Answer in the language the question is you recieved.

Here is the conversation history: {context}

Question: {question}

Answer:
"""

model = OllamaLLM(model="llama3.2")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model


def handle_conversation(question: str, context: list = None):
    if context is None:
        context = []

    result = chain.invoke({"context": context, "question": question})
    return {"sender": "ai", "content": result, "id": uuid.uuid4()}


def handle_google_api(messages):
    settings = get_env()
    try:
        # Verify API key is set
        if not settings.GOOGLE_GEMINI_API_KEY:
            raise ValueError("Google Gemini API key is not set")

        client = genai.Client(api_key=settings.GOOGLE_GEMINI_API_KEY)
        stream = client.models.generate_content_stream(
            model="gemini-2.0-flash", contents=messages[-1]["content"]
        )
        return stream
    except Exception as e:
        print(f"Error in Google API call: {e}")
        raise SystemError("Error calling Google Gemini API")


if __name__ == "__main__":
    user_input = input("User: ")
    result = handle_google_api(user_input)
    print(result)
