const chatboxBody = document.getElementById("chatbox-body");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Pre-built responses
const responses = {
  "hello": "Hi there! How can I assist you today?",
  "stress": "Managing stress is important. Consider deep breathing, mindfulness, or taking short breaks.",
  "exam": "Exams can be tough! Make sure to get plenty of rest and stay organized.",
  "help": "I'm here to assist! Let me know what you need help with.",
  "bye": "Goodbye! Take care of yourself and stay positive."
};

// Function to add a message to the chatbox
function addMessage(text, sender = "user") {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  chatboxBody.appendChild(message);
  chatboxBody.scrollTop = chatboxBody.scrollHeight; // Scroll to the bottom
}

// Function to get a response based on the user's input
function getResponse(input) {
  input = input.toLowerCase(); // Convert input to lowercase for matching
  for (const keyword in responses) {
    if (input.includes(keyword)) {
      return responses[keyword];
    }
  }
  return "I'm sorry, I didn't quite understand that. Could you try asking something else?";
}

// Event listener for the send button
sendBtn.addEventListener("click", () => {
  const userInput = chatInput.value.trim();
  if (!userInput) return;

  // Display user's message
  addMessage(userInput, "user");
  chatInput.value = "";

  // Get and display bot's response
  const botResponse = getResponse(userInput);
  addMessage(botResponse, "support");
});
