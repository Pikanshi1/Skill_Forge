import nodemailer from "nodemailer";
import env from "../config/env.js";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: env.EMAIL_USER,
		pass: env.EMAIL_PASSWORD,
	},
});

interface EmailOptions {
	to: string;
	subject: string;
	html: string;
}

const sendEmail = async ({ to, subject, html }: EmailOptions) => {
	await transporter.sendMail({
		from: `"Skill Forge" <${env.EMAIL_USER}>`,
		to,
		subject,
		html,
	});
};

export default sendEmail;
