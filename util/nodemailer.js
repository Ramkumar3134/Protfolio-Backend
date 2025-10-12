const nodemailer = require("nodemailer");

const sendMail = async (data) => {
    try {
        console.log("Setting up email transporter...");
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Verify transporter
        await transporter.verify();
        console.log("SMTP configured successfully");

        // Email to admin
        const adminMail = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: "lramkumar3134@gmail.com",
            subject: `New Contact Form Submission from ${data.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Contact Request</h2>
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Brief:</strong> ${data.brief || 'Not provided'}</p>
                        <p><strong>Website:</strong> ${data.websiteUrl || 'Not provided'}</p>
                        <p><strong>Company Stage:</strong> ${data.companyStage || 'Not provided'}</p>
                        <p><strong>Deadline:</strong> ${data.deadline || 'Not provided'}</p>
                        <p><strong>Budget:</strong> ${data.budget || 'Not provided'}</p>
                        <p><strong>How Heard:</strong> ${Array.isArray(data.howHeard) ? data.howHeard.join(', ') : data.howHeard || 'Not provided'}</p>
                    </div>
                </div>
            `,
        };

        // Email to user
        const userMail = {
            from: `"Ramkumar Portfolio" <${process.env.EMAIL_USER}>`,
            to: data.email,
            subject: "Thank you for contacting us!",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Thank You for Reaching Out!</h2>
                    <p>Hi <strong>${data.name}</strong>,</p>
                    <p>We have successfully received your message and will get back to you within 24 hours.</p>
                    <div style="background: #f0f8ff; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
                        <p><strong>Your Message:</strong> ${data.brief || 'No additional details provided'}</p>
                    </div>
                    <p>Best regards,<br/><strong>Ramkumar's Portfolio Team</strong></p>
                </div>
            `,
        };

        // Send both emails
        await transporter.sendMail(adminMail);
        console.log("Admin notification sent");

        await transporter.sendMail(userMail);
        console.log("User confirmation sent");

        return true;

    } catch (error) {
        console.error("Nodemailer Error:", error.message);
        throw new Error(`Email sending failed: ${error.message}`);
    }
};

module.exports = sendMail;