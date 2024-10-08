const nodemailer = require('nodemailer');

// Serverless function to send email notifications
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, message } = req.body;

        // Set up email credentials (use environment variables for security)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Using Gmail, but you can choose any service
            auth: {
                user: process.env.EMAIL_USER, // Email address
                pass: process.env.EMAIL_PASS, // Email password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'axg21n@acu.edu', // Replace with recipient email
            subject: `Urgent: ${name} mentioned harmful thoughts`,
            text: `${name} said: "${message}". Please check in with them.`,
        };

        try {
            // Send the email
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true, message: 'Notification sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, error: 'Failed to send notification' });
        }
    } else {
        res.status(405).json({ message: 'Only POST requests are allowed' });
    }
}
