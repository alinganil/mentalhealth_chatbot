const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
let userName = ''; // Variable to store the user's name

// Event listener for send button
sendButton.addEventListener('click', sendMessage);

// Event listener for Enter key press
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage(); // Trigger send message function on Enter key press
    }
});

// Function to send message
function sendMessage() {
    const message = userInput.value.trim(); // Get the message from input
    if (message) {
        addMessage('user', message); // Add user's message to the chatbox
        userInput.value = ''; // Clear the input field
        handleChat(message);  // Call function to handle chatbot response
    }
}

// Function to add a message to the chatbox
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = (sender === 'user' ? 'You: ' : 'Friend: ') + message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom for new messages
}

// Handle chat logic and email triggering
function handleChat(userMessage) {
    if (!userName) {
        // If userName is not set, it means this is the first interaction
        userName = userMessage; // Set the user's name
        addMessage('Friend', `Nice to meet you, ${userName}! How are you feeling today?`);
        return;
    }

    // Check for sensitive phrases and send an email notification if needed
    if (userMessage.toLowerCase().includes('kill myself') || userMessage.toLowerCase().includes('suicide')) {
        addMessage('Friend', `I'm really sorry you're feeling like this, ${userName}. Please reach out to someone for help.`);
        sendNotification(userName, userMessage); // Send email notification
        return;
    }

    // Dynamic responses based on user input
    if (userMessage.toLowerCase().includes('sad')) {
        addMessage('Friend', `I'm sorry to hear that you're feeling sad. Want to talk about it?`);
    } else if (userMessage.toLowerCase().includes('happy')) {
        addMessage('Friend', `That's great to hear! What made you happy today?`);
    } else if (userMessage.toLowerCase().includes('stressed')) {
        addMessage('Friend', `I'm sorry you're feeling stressed. Let's work through it together.`);
    } else {
        addMessage('Friend', `Thanks for sharing, ${userName}. I'm here to chat anytime.`);
    }
}

// Function to trigger email notification
async function sendNotification(name, message) {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, message }),
        });
        if (response.ok) {
            console.log('Notification sent successfully');
        } else {
            console.error('Failed to send notification');
        }
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

// Start the chatbot by asking for the user's name initially
document.addEventListener('DOMContentLoaded', () => {
    addMessage('Friend', "Hello! What's your name?");
});
