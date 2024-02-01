import { connectMongoDB } from "@/lib/mongodb";
import File from "@/models/file";
import { NextResponse } from "next/server";

export async function POST(req: Response, { params }: { params: any }) {

    console.log(params)

    return NextResponse.json({ message: "huj" }, { status: 200 });
}
