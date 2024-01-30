import { connectMongoDB } from "@/lib/mongodb";
import File from "@/models/file";
import { NextResponse } from "next/server";

export async function GET(req: Response, { params }: { params: any }) {

    connectMongoDB();

    const file = await File.findOne({ _id: params.slug });

    return NextResponse.json({ file: file }, { status: 200 });
}
