const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
let userName = ''; // Variable to store the user's name

// Event listener for send button
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage('user', message);
        userInput.value = '';
        handleChat(message);
    }
});

// Add message to the chatbox
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = (sender === 'user' ? 'You: ' : 'Friend: ') + message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom for new messages
}

// Handle chat logic and email triggering
function handleChat(userMessage) {
    if (!userName) {
        userName = userMessage;
        addMessage('Friend', `Nice to meet you, ${userName}! How are you feeling today?`);
        return;
    }

    // Check for sensitive phrases
    if (userMessage.toLowerCase().includes('kill myself') || userMessage.toLowerCase().includes('suicide')) {
        addMessage('Friend', `I'm really sorry you're feeling like this, ${userName}. Please reach out to someone for help.`);
        sendNotification(userName, userMessage);
        return;
    }

    // Dynamic responses
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
