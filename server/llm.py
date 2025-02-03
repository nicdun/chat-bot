from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate


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


def handle_conversation(question: str, context: list):
    result = chain.invoke({"context": context, "question": question})
    return [{"question": question, "answer": result}]


if __name__ == "__main__":
    user_input = input("User: ")
    result = handle_conversation(user_input, context=[])
    print(result)
