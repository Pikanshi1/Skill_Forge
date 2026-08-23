import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

transporter.verify((error, _success) => {
	if (error) {
		console.log(error);
	} else {
		console.log("SMTP server ready");
	}
});

interface EmailOptions {
	to: string;
	subject: string;
	html: string;
}

const sendEmail = async ({ to, subject, html }: EmailOptions) => {
	await transporter.sendMail({
		from: process.env.EMAIL_USER,
		to,
		subject,
		html,
	});
};

export default sendEmail;
