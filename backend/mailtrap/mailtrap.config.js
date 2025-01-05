import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv'

dotenv.config()

const TOKEN = process.env.MAILTRAP_API_TOKEN;

export const mailTrapClient = new MailtrapClient({
	token: TOKEN,
});

export const sender = {
	email: "hello@demomailtrap.com",
	name: "Sandhani Blood Bank",
};


