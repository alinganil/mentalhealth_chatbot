// Sample chatbot.js file implementation for your project

// Define danger signals
const dangerSignals = ["kill myself", "end my life", "no hope", "suicide", "self harm"];

// Function to check for danger signals in a user's message
function checkForDangerSignals(message) {
    return dangerSignals.some(signal => message.toLowerCase().includes(signal));
}

// Function to handle user messages
function handleMessage(userMessage) {
    if (checkForDangerSignals(userMessage)) {
        // Send an alert email
        fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: userMessage, 
                email: "axg21n@acu.edu" 
            })
        })
        .then(response => response.json())
        .then(data => console.log('Email sent:', data))
        .catch(error => console.error('Error:', error));
    } else {
        // Normal chatbot response logic
        generateBotResponse(userMessage);
    }
}

// Function to generate a bot response (expand based on your logic)
function generateBotResponse(userMessage) {
    let botResponse;
    switch(userMessage.toLowerCase()) {
        case 'hello':
            botResponse = 'Hi there! How can I help you today?';
            break;
        case 'help':
            botResponse = 'I’m here to assist. Please tell me more about how you’re feeling.';
            break;
        default:
            botResponse = 'I’m sorry, I didn’t understand that. Could you please elaborate?';
    }
    displayBotMessage(botResponse);
}

// Function to display the bot's message (implement UI interaction)
function displayBotMessage(message) {
    const chatWindow = document.getElementById('chatWindow');
    const botMessage = document.createElement('div');
    botMessage.className = 'bot-message';
    botMessage.innerText = message;
    chatWindow.appendChild(botMessage);
}

// Event listener for user input
document.getElementById('sendButton').addEventListener('click', () => {
    const userMessage = document.getElementById('userInput').value;
    if (userMessage) {
        handleMessage(userMessage);
        document.getElementById('userInput').value = ''; // Clear input field
    }
});
