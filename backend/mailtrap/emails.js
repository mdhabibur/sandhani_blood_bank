import { MailtrapClient } from "mailtrap";
import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
	WELCOME_NEW_USER_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailTrapClient, sender } from "./mailtrap.config.js";

export const sendEmailVerificationEmail = async (
	recipientsEmail,
	verificationCode
) => {
	const recipients = [
		{
			email: recipientsEmail,
		},
	];

	mailTrapClient
		.send({
			from: sender,
			to: recipients,
			subject: "please verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace(
				"{verificationCode}",
				verificationCode
			),
			category: "new user email verification",
		})
		.then(console.log, console.error);
};

export const sendWelcomeEmail = async (recipientsEmail, recipientsName) => {
	const recipients = [
		{
			email: recipientsEmail,
		},
	];

	mailTrapClient
		.send({
			from: sender,
			to: recipients,
			template_uuid: "1f80ca1b-2560-49fa-aa18-303c588f8494",
			template_variables: {
				company_info_name: "© Sandhani_Blood_Donation",
				name: recipientsName,
				company_info_address: "170-171,Elephant Road,Dhaka",
				company_info_city: "Dhaka",
				company_info_zip_code: "1205",
				company_info_country: "Bangladesh",
			},
		})
		.then(console.log, console.error);
};


export const passwordResetRequestSend = async (recipientsEmail, resetUrl) => {
    const recipients = [
		{
			email: recipientsEmail,
		},
	];

	mailTrapClient
		.send({
			from: sender,
			to: recipients,
			subject: "password reset request",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
				"{resetURL}",
				resetUrl
			),
			category: "user password reset email",
		})
		.then(console.log, console.error);

}


export const sendPasswordResetSuccessEmail  = async (recipientsEmail) => {

    const recipients = [
		{
			email: recipientsEmail,
		},
	];

	mailTrapClient
		.send({
			from: sender,
			to: recipients,
			subject: "password reset successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "user password reset success email",
		})
		.then(console.log, console.error);

}