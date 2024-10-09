const nodemailer = require('nodemailer');

// Serverless function to send email notifications
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, message } = req.body;

        // Set up the transporter using your email credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use any email provider like Gmail, Outlook, etc.
            auth: {
                user: process.env.EMAIL_USER, // Email address from environment variables
                pass: process.env.EMAIL_PASS  // Email password from environment variables
            }
        });

        // Define email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'alert@example.com',  // Replace this with the email where you want to receive notifications
            subject: `Urgent: ${name} mentioned harmful thoughts`,
            text: `${name} said: "${message}". Please check in with them.`,
        };

        // Try to send the email
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true, message: 'Notification sent' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Failed to send notification' });
        }
    } else {
        res.status(405).json({ message: 'Only POST requests are allowed' });
    }
}
