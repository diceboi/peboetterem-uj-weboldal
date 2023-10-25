import { Resend } from "resend";

import ContactUsAdmin from "@/emails/ContactUsAdmin";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();

  try {

  const adminMail = await resend.emails.send({
    from: 'hello@peboetterem.hu',
    to: 'info@peboetterem.hu',
    reply_to: `${email}`,
    subject: 'Új kapcsolatfelvétel a weboldalról',
    react: ContactUsAdmin({
      name,
      email,
      phone,
      message,
    })
  });

  return NextResponse.json({
    status: 'Ok'
  }, {
    status: 200
  })
  } catch(e: unknown) {
    if (e instanceof Error) {
      console.log(`Failed to send email: ${e.message}`);
    }
    return NextResponse.json({
      error: 'Internal server error.'
    }, {
      status: 500
    })
  }
}