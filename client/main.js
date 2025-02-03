const LOCAL_STORAGE_ITEM = "conversation";

const setupEventListener = async () => {
  const clear = document.querySelector("[data-ta=clearButton]");
  const form = document.querySelector("form");

  clear.addEventListener("click", (event) => {
    event.preventDefault();
    const textarea = document.querySelector("[data-ta=conversation]");
    textarea.textContent = "";
    saveConversationToLocalStorage(undefined);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    callApi();
  });
};

const callApi = async () => {
  const input = document.querySelector("[data-ta=input]");
  const userInput = input.value;
  input.value = "";
  const textarea = document.querySelector("[data-ta=conversation]");
  const response = await fetch("http://localhost:8000/chat", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: userInput,
      context: getConversationFromLocalStorage(),
    }),
  });

  const data = await response.json();
  const conversation = getConversationFromLocalStorage() ?? [];
  conversation.push(data[0]);
  saveConversationToLocalStorage(conversation);

  textarea.textContent = conversation
    .map((item) => `👤: ${item.question}\n🤖: ${item.answer}\n\n`)
    .join("");
};

const getConversationFromLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_ITEM));
};

const saveConversationToLocalStorage = (conversation) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_ITEM,
    JSON.stringify(conversation ?? [])
  );
};

(() => {
  setupEventListener();
  saveConversationToLocalStorage(undefined);
})();
