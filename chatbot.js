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

// Function to send message on button click or Enter key
function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage('user', message); // Add user's message to chatbox
        userInput.value = ''; // Clear input field
        handleChat(message); // Handle chatbot response
    }
}

// Event listener for send button
sendButton.addEventListener('click', () => {
    sendMessage(); // Call sendMessage when the send button is clicked
});

// Event listener for Enter key press
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage(); // Call sendMessage when the Enter key is pressed
    }
});

// Handle chat logic and responses
function handleChat(userMessage) {
    if (!userName) {
        userName = userMessage;
        addMessage('Friend', `Nice to meet you, ${userName}! How are you feeling today?`);
        return;
    }

    // Check for dangerous or sensitive phrases
    if (userMessage.toLowerCase().includes('kill myself') || userMessage.toLowerCase().includes('suicide')) {
        addMessage('Friend', `I'm really sorry you're feeling like this, ${userName}. Please reach out to someone for help.`);
        
        // Call function to send an email notification
        sendNotification(userName, userMessage);
        return;
    }

    // Other dynamic responses
    if (userMessage.toLowerCase().includes('sad')) {
        addMessage('Friend', `I'm sorry to hear that, ${userName}. Want to talk about what's making you feel sad?`);
    } else if (userMessage.toLowerCase().includes('happy')) {
        addMessage('Friend', `That's great to hear, ${userName}! What's making you feel so happy today?`);
    } else if (userMessage.toLowerCase().includes('tired')) {
        addMessage('Friend', `You must have had a long day, ${userName}. Remember to take a break!`);
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

// Start the initial conversation
initialConversation();
