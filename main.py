from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate


template = """
Answer the following question in a polite language. 
Do not allow rude questions.
Act like a professional in the field the question is asked (for example like a senior software engineer if the question has a developer context).

Here is the conversation history: {context}

Question: {question}

Answer:
"""
model = OllamaLLM(model="llama3.2")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model


def handle_conversation():
    context = ""

    print("Welcome to the AI ChatBot with Ollama. Type 'exit' to leave!")
    while True:
        user_input = input("You: ")

        if user_input.lower() == "exit":
            break

        result = chain.invoke({"context": context, "question": user_input})
        print("Bot: ", result)

        context += f"\nUser:{user_input}\nAI:{result}"


if __name__ == "__main__":
    handle_conversation()
