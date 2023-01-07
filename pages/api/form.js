import { transporter, mailOptions } from "../../components/config/nodemailer";

export default async function form(req, res) {
    console.log(req.body);
    const body = JSON.parse(req.body);
    const { name, email, message } = body;

    const textData = `${name} ${email} ${email}`;
    const htmlData = `
        <h3>${name}</h3>
        <h3>${email}</h3>
        <p>${message}</p>
        `;

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
