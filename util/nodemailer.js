const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lramkumar3134@gmail.com',
    pass: process.env.APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});


const sendMail = async (data) => {
  const adminMailOption = {
    from: 'lramkumar3134@gmail.com',
    to: 'lramkumar3134@gmail.com',
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <h3>New Contact Request</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Brief:</strong> ${data.brief}</p>
      <p><strong>Website:</strong> ${data.websiteUrl || 'N/A'}</p>
      <p><strong>Company Stage:</strong> ${data.companyStage || 'N/A'}</p>
      <p><strong>Deadline:</strong> ${data.deadline || 'N/A'}</p>
      <p><strong>Budget:</strong> ${data.budget || 'N/A'}</p>
      <p><strong>How Heard:</strong> ${Array.isArray(data.howHeard) ? data.howHeard.join(', ') : data.howHeard || 'N/A'}</p>
    `,
  };

  const userMailOption = {
    from: 'lramkumar3134@gmail.com',
    to: data.email,
    subject: 'Thank you for contacting us!',
    html: `
      <p>Hi ${data.name},</p>
      <p>We have received your request. Our team will contact you soon.</p>
      <p>Regards,<br/>Your Company</p>
    `,
  };

  await transporter.sendMail(adminMailOption);
  await transporter.sendMail(userMailOption);
};

module.exports = sendMail;
