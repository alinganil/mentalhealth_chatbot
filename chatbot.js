const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage('user', message);
        userInput.value = '';
        getChatbotResponse(message);
    }
});

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = (sender === 'user' ? 'You: ' : 'Friend: ') + message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getChatbotResponse(userMessage) {
    let response = "I'm here to listen. Tell me more.";
    if (userMessage.toLowerCase().includes('sad')) {
        response = "I'm sorry to hear you're feeling this way. Want to talk about what's making you sad?";
    }
    if (userMessage.toLowerCase().includes('tired')) {
        response = "I'm sorry to hear that; well, you got this. Just push through! :)";
    }
     if (userMessage.toLowerCase().includes('tired')) {
        response = "I'm sorry to hear that; well, you got this. Just push through! :)";
    }
                                
    addMessage('Friend', response);
}
