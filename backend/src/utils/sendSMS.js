import twilio from "twilio";

const sendSMS = async (to, message) => {
  try {
    if (
      !process.env.TWILIO_ACCOUNT_SID ||
      !process.env.TWILIO_AUTH_TOKEN ||
      !process.env.TWILIO_PHONE_NUMBER
    ) {
      console.log("SMS TEST MODE:", message);
      return;
    }

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });

    console.log("SMS sent successfully");
  } catch (error) {
    console.log("SMS sending failed:", error.message);
  }
};

export default sendSMS;