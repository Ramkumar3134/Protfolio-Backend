const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  brief: { 
    type: String, 
    required: true 
  },
  websiteUrl: { 
    type: String 
  },
  companyStage: {
    type: String,
    required: false,
    enum: [
      'startup', 
      'established', 
      'individual', 
      ''
    ],
  },
  deadline: {
    type: String,
    required: false,
    enum: [
      'urgent', 
      'flexible', 
      'no-deadline', 
      ''
    ],
  },
  budget: {
    type: String,
    required: false,
    enum: [
      '5k-10k', 
      '10k-20k', 
      '20k-plus', 
      ''
    ],
  },
  howHeard: {
    type: [String],
    required: false,
    enum: [
      'Webflow partners',
      'Awwwards',
      'Search engine',
      'Social media',
      'Word of mouth',
      'News article or blog',
      'Other',
    ],
  },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;