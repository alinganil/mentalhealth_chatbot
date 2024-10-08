const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
let userName = ''; // Variable to store the user's name

// Initial conversation flow to ask for user's name
function initialConversation() {
    setTimeout(() => {
        addMessage('Friend', "Hello! What's your name?");
    }, 500);
}

// Add message to the chatbox
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = (sender === 'user' ? 'You: ' : 'Friend: ') + message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Event listener for send button
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage('user', message);
        userInput.value = '';
        handleChat(message);
    }
});

// Handle chat logic and responses
function handleChat(userMessage) {
    // Check if we already know the user's name
    if (!userName) {
        userName = userMessage; // Store user's name
        addMessage('Friend', `Nice to meet you, ${userName}! How are you feeling today?`);
        return;
    }

    // Dynamic responses based on user input
    if (userMessage.toLowerCase().includes('sad')) {
        addMessage('Friend', `I'm sorry to hear that, ${userName}. Want to talk about what's making you feel sad?`);
    } else if (userMessage.toLowerCase().includes('happy')) {
        addMessage('Friend', `That's great to hear, ${userName}! What's making you feel so happy today?`);
    } else if (userMessage.toLowerCase().includes('tired')) {
        addMessage('Friend', `You must have had a long day, ${userName}. Remember to take a break!`);
    } else if (userMessage.toLowerCase().includes('stressed')) {
        addMessage('Friend', `I'm sorry you're feeling stressed, ${userName}. Do you want to talk about what's been stressing you out?`);
    } else {
        addMessage('Friend', `Thanks for sharing, ${userName}. I'm here to chat anytime.`);
    }
}

// Start the initial conversation
initialConversation();
