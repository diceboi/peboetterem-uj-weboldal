import connectMongoDB from "@/app/lib/mongodb";
import Termekek from "@/app/modals/termekek"
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    await connectMongoDB();
    const termekek = await Termekek.find();
    return NextResponse.json({ data: { Termekek: termekek } })
}