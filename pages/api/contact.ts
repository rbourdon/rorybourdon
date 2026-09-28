import sgMail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

// Unset key fails at send time, as before.
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function Contact(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { message } = req.body as { message: string };

  const msg = {
    to: "rorybourdon@gmail.com",
    from: "contact@rorybourdon.com",
    // SendGrid camel-cases snake_case keys itself, so this is the same payload.
    templateId: "d-e62d0066c4a7406e86cc0fc0f5e28ccb",
    dynamicTemplateData: {
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
