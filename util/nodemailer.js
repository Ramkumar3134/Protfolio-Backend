const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (data) => {
  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
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
        <p><strong>How Heard:</strong> ${
          Array.isArray(data.howHeard)
            ? data.howHeard.join(', ')
            : data.howHeard || 'N/A'
        }</p>
      `,
    });
    
    await resend.emails.send({
      from: 'Portfolio Team <onboarding@resend.dev>',
      to: data.email,
      subject: 'Thank you for contacting us!',
      html: `
        <p>Hi ${data.name},</p>
        <p>We have received your message and will contact you soon.</p>
        <p>Regards,<br/>Ramkumar’s Portfolio</p>
      `,
    });

    console.log('Emails sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Email sending failed');
  }
};

module.exports = sendMail;
