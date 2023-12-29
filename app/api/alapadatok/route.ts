import connectMongoDB from "@/app/lib/mongodb";
import Alapadatok from "@/app/modals/alapadatok"
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    await connectMongoDB();
    const alapadatok = await Alapadatok.find();
    return NextResponse.json({ data: { Alapadatok: alapadatok } })
}