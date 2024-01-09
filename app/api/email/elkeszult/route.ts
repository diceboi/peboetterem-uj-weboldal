import { Resend } from "resend";

import { NextResponse } from "next/server";
import ElkeszultUgyfel from "@/emails/ElkeszultUgyfel";

const resend = new Resend(process.env.RESEND_API_KEY)

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: Request) {
  const { nev, email } = await request.json();

  try {

  const ugyfelMail = await resend.emails.send({
    from: 'PEBo Étterem <hello@admin.peboetterem.hu>',
    to: email,
    subject: 'Rendelésed elkészült',
    react: ElkeszultUgyfel({
        nev
    })
  });

  return NextResponse.json({ ugyfelMail }, { headers: corsHeaders })
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