import connectMongoDB from "@/app/lib/mongodb";
import Rendelesek from "@/app/modals/rendelesek"
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req:any) {

try {
    await connectMongoDB();
    const { data } = await req.json();
    const { formData, cartItems, elkeszult, kiszallitva } = data;

    const newRendeles = {
        elkeszult,
        kiszallitva,
        formData: {
          nev: formData.nev,
          email: formData.email,
          tel: formData.tel,
          irszam: formData.irszam,
          telepules: formData.telepules,
          utca: formData.utca,
          emelet: formData.emelet,
          megjegyzes: formData.megjegyzes,
          adatkezelesi: formData.adatkezelesi,
        },
        cartItems,
      };

    const rendelesek = await Rendelesek.create( newRendeles );
    return NextResponse.json(rendelesek)
} catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}