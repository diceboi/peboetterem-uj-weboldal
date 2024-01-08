import { Resend } from "resend";

import RendelesAdmin from "@/emails/RendelesAdmin";
import { NextResponse } from "next/server";
import RendelesUgyfel from "@/emails/RendelesUgyfel";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { formData, cartItems } = await request.json();

  const {
    nev,
    email,
    tel,
    irszam,
    telepules,
    utca,
    emelet,
    megjegyzes,
    adatkezelesi,
  } = formData;

  try {

  const adminMail = await resend.emails.send({
    from: 'PEBo Weboldal <hello@admin.peboetterem.hu>',
    to: 'szasz.szabolcs1995@gmail.com',
    subject: 'Új rendelés a weboldalról',
    react: RendelesAdmin({
      nev,
      email,
      tel,
      irszam,
      telepules,
      utca,
      emelet,
      megjegyzes,
      adatkezelesi,
      cartItems,
    })
  });


  const ugyfelMail = await resend.emails.send({
    from: 'PEBo Étterem <hello@admin.peboetterem.hu>',
    to: email,
    subject: 'Köszönjük a rendelést',
    react: RendelesUgyfel({
      nev,
      email,
      tel,
      irszam,
      telepules,
      utca,
      emelet,
      megjegyzes,
      adatkezelesi,
      cartItems,
    })
  });

  return NextResponse.json({ adminMail, ugyfelMail })
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