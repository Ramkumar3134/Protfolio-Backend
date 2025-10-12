const Contact = require('../model/contactmodel');
const sendMail = require('../util/nodemailer');

exports.createContact = async (req, res) => {
    try {
        console.log("Received contact request:", req.body);
        
        const { name, email, brief, websiteUrl, companyStage, deadline, budget, howHeard } = req.body;

        const contactData = new Contact({ 
            name, 
            email, 
            brief, 
            websiteUrl, 
            companyStage, 
            deadline, 
            budget, 
            howHeard 
        });

        const savedData = await contactData.save();
        console.log("Data saved to database:", savedData._id);

        // Send emails
        try {
            await sendMail(savedData);
            console.log("Emails sent successfully");
        } catch (emailError) {
            console.error("Email sending failed:", emailError.message);
            // Continue even if email fails
        }

        return res.status(201).json({
            success: true,
            message: "Contact submitted successfully",
            data: savedData
        });

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ 
            success: false,
            message: 'Server Error',
            error: error.message 
        });
    }
};