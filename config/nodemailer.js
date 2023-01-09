import nodemailer from "nodemailer";

const { EMAIL, EMAIL_PASSWORD } = process.env;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
    },
});

export const mailOptions = {
    from: EMAIL,
    to: EMAIL,
};
