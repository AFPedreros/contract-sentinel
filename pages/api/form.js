import { transporter, mailOptions } from "../../config/nodemailer";

// Function to handle form submission
export default async function form(req, res) {
    const body = JSON.parse(req.body);
    const { name, email, message } = body;

    // Text and HTML versions of the message
    const textData = `${name} ${email} ${email}`;
    const htmlData = `
        <h3>${name}</h3>
        <h3>${email}</h3>
        <p>${message}</p>
        `;

    // Send email using nodemailer
    try {
        await transporter.sendMail({
            ...mailOptions,
            subject: "Contract Sentinel form",
            text: textData,
            html: htmlData,
        });
    } catch (error) {
        console.log(error);
    }

    res.json({ success: true });
}
