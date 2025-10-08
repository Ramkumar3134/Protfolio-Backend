const contact = require('../model/Contact');
const sendMail = require('../util/nodemailer');

exports.createContact = async (req, res) => {
  try {
    const { name, email, brief, websiteUrl, companyStage, deadline, budget, howHeard } = req.body;
    
    if (!name || !email || !brief) {
      return res.status(400).json({ message: "Name, email, and brief are required fields." });  
    }

    const data = new contact({ name, email, brief, websiteUrl, companyStage, deadline, budget, howHeard });
    
    const saveData = await data.save();
    
    await sendMail(saveData);

    return res.status(201).json({ message: "Contact sent successfully", saveData });
  } catch (error) {
    console.error("Error in createContact:", error.message);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: messages 
      });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
}