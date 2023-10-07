import type { PageServerLoad } from './$types';
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { PUBLIC_HOSTINGER_EMAIL_PASSWORD } from '$env/static/public'
import type { Actions } from '@sveltejs/kit';


let host = "smtp.titan.email";
let sender = "contact@elliotmorrisonbusiness.com" 
let receiver = "elliotmorrison58@gmail.com"

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = { sendContactMail: async ({ request }) => {
    
    const formData = await request.formData();
    let contactSender = formData.get('contactSender');
    let contactEmail = formData.get('contactEmail');
    let contactMessage = formData.get('contactMessage');

    const transporter = nodemailer.createTransport({
        host,
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
        user: sender,
        pass: PUBLIC_HOSTINGER_EMAIL_PASSWORD,
        },
        logger: true
    });
    transporter.sendMail({
        from: sender,
        to: receiver,
        subject: "Message from " + contactSender + " (" + contactEmail + ")",
        text: contactMessage as string,
        }, (error) => {
        if (error) {
            console.log(error);
        }else{
            console.log("Message sent successfully!");
        }  
    })
    return { success: true, message : "Message Sent Successfully!" };
}} satisfies Actions;