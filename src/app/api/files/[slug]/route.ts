import { connectMongoDB } from "@/lib/mongodb";
import File from "@/models/file";
import { NextResponse } from "next/server";

export async function GET(req: Response, { params }: { params: any }) {

    const userId = req.headers.get("authorization");

    connectMongoDB();

    const file = await File.findOne({ _id: params.slug });

    if(file.owner.toString() === userId) {
        return NextResponse.json({ file: file }, { status: 200 });
    }else{
        return NextResponse.json({ message: "file not found" }, { status: 404 });
    }

}
