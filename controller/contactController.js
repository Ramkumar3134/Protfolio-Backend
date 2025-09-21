const contact = require('../model/contactmodel');
const sendMail = require('../util/nodemailer');

exports.createContect = async (req, res) => {
  try {
    const {name, email, brief, websiteUrl, companyStage, deadline, budget, howHeard}= req.body;
    if (!name || !email) {
      return res.status(400).json({message:"name and email required"})  
    }
    const data = new contact({ name, email, brief, websiteUrl, companyStage, deadline, budget, howHeard });
    const saveData = await data.save();
    await sendMail(saveData);
    return res.status(201).json({message:"contact send successfully",saveData});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server Error'});
  }
};
