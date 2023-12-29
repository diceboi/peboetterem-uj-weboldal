import connectMongoDB from "@/app/lib/mongodb";
import Napimenuadatok from "@/app/modals/napimenuadatok"
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    await connectMongoDB();
    const napimenuadatok = await Napimenuadatok.find();
    return NextResponse.json({ data: { Napimenuadatok: napimenuadatok } })
}