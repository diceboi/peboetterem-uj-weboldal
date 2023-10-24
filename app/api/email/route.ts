import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


export async function POST(request:any) {
    const { name, email, tel, message } = await request.json();

    const transporter = nodemailer.createTransport({
        host: "mail.peboetterem.hu",
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
    });

    try {

        const mail = await transporter.sendMail({
            from: `${email}`,
            to: "info@peboetterem.hu",
            replyTo: `${email}`,
            bcc: ["szasz.szabolcs1995@gmail.com", "nzsofi444@gmail.com"],
            subject: `Kapcsolatfelvétel érkezett ${name} részéről`,
            html: `
                <h1>Szia! A kapcsolatfelvételi űrlapon írtak neked az alábbi adatokkal:</h1>
                <p>Név: ${name}</p>
                <p>E-mail cím: ${email}</p>
                <p>Telefonszám: ${tel}</p>
                <p>Üzenet: ${message}</p>
                <h3>Válaszolj neki, amint lehetőséged adódik!</h3>
            `,
        });

        await transporter.sendMail(mail)

        return NextResponse.json({message:"Az email sikeresen elküldve."}, { status: 200 })

        }
            
        catch (error) {
            return NextResponse.json({message:"Az email küldés sikertelen."}, { status: 500 })
        }
    }