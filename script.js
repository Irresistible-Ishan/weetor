const form = document.getElementById("form");
const messages = document.getElementById("messages");

// Retrieve the messages from the JSON file and display them
fetch("messages.json")
  .then((response) => response.json())
  .then((data) => {
    for (const message of data.messages) {
      const messageElement = document.createElement("div");
      messageElement.innerHTML = message;
      messages.appendChild(messageElement);
    }
  });

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  if (name && message) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${name}:</strong> ${message}`;
    messages.appendChild(messageElement);
  }

  // Send the message to the server to be stored in the JSON file
  fetch("/send-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      message: message,
    }),
  });

  document.getElementById("message").value = "";
});

fetch("messages.json")
  .then((response) => response.json())
  .then((data) => {
    for (const message of data.messages) {
      const messageElement = document.createElement("div");
      messageElement.innerHTML = message;
      messages.appendChild(messageElement);
    }
  });
