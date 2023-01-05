const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, FROM_EMAIL, TO_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const form = async (req, res) => {
    const body = JSON.parse(req.body);
    const { name, email, message } = body;

    const msg = {
        to: TO_EMAIL,
        from: FROM_EMAIL,
        subject: "Contract Sentinel form",
        html: `<p><strong$>Name: </strong${name}></p>
                <p><strong$>Email: </strong${email}></p>
                <p><strong$>Message: </strong${message}></p>
            `,
    };

    await sgMail.send(msg);
    console.log(msg);

    res.json({ success: true });
};

export default form;
