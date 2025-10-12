const nodemailer = require("nodemailer");

const sendMail = async (data) => {
    try {
        console.log("=== EMAIL DEBUGGING START ===");
        console.log("1. Checking environment variables...");
        console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
        console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
        
        if (process.env.EMAIL_USER) {
            console.log("EMAIL_USER:", process.env.EMAIL_USER);
        }
        if (process.env.EMAIL_PASS) {
            console.log("EMAIL_PASS length:", process.env.EMAIL_PASS.length);
        }

        console.log("2. Creating transporter...");
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            debug: true, // Enable debug output
            logger: true, // Enable logger
        });

        console.log("3. Verifying transporter...");
        await transporter.verify();
        console.log("✅ Transporter verified successfully");

        console.log("4. Preparing admin email...");
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
                    <p><em>This email was sent from your portfolio contact form.</em></p>
                </div>
            `,
        };

        console.log("5. Sending admin email...");
        const adminResult = await transporter.sendMail(adminMail);
        console.log("✅ Admin email sent:", adminResult.messageId);

        console.log("6. Preparing user confirmation email...");
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

        console.log("7. Sending user confirmation email...");
        const userResult = await transporter.sendMail(userMail);
        console.log("✅ User confirmation email sent:", userResult.messageId);

        console.log("=== EMAIL DEBUGGING COMPLETE ===");
        return true;

    } catch (error) {
        console.error("=== EMAIL ERROR ===");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);
        console.error("Error command:", error.command);
        
        if (error.response) {
            console.error("SMTP Response:", error.response);
        }
        
        console.error("Full error:", error);
        console.error("=== EMAIL ERROR END ===");
        
        throw new Error(`Email sending failed: ${error.message}`);
    }
};

module.exports = sendMail;