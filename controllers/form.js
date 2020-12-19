const { sendEmailWithNodemailer } = require('../helpers/email');

exports.contactForm = (req, res) => {
	console.log(req.body);
	const { name, email, message } = req.body;

	const emailData = {
		from: process.env.EMAIL, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
		to: 'contact@ecomores-services.com', // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
		subject: `${process.env.APP_NAME} | Contact Form`,
		text: `Un email vous a été envoyé depuis le site E-Com logistics \n Nom: ${name} \n Email: ${email} \n Message: ${message}`,
		html: `
        <h4>Un email vous a été envoyé depuis le site E-Com logistics</h4>
        <p>Nom: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message:<br/> ${message}</p>
        <hr />
        <p>Cet email contient des informations sensitive. À ne pas partager.</p>
		<p>https://ecomores-services.com</p>
    `
	};

	sendEmailWithNodemailer(req, res, emailData);
};
