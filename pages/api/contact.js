import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function Contact(req, res) {
  const { message } = req.body;

  const msg = {
    to: "rorybourdon@gmail.com",
    from: "contact@rorybourdon.com",
    template_id: "d-e62d0066c4a7406e86cc0fc0f5e28ccb",
    dynamic_template_data: {
      body: message,
    },
  };

  try {
    //console.log("Email has been sent");
    await sgMail.send(msg);
    res.json({ message: "Email has been sent" });
  } catch (error) {
    console.log("FAILED TO SEND MESSAGE");
    res.status(500).json({ error: "Error sending email contact", res });
  }
}
