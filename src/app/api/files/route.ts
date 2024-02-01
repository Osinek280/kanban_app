import { connectMongoDB } from "@/lib/mongodb";
import File from "@/models/file";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("authorization");

    await connectMongoDB();

    const files = await File.find({ owner: userId });

    return NextResponse.json({ files: files }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching data." },
      { status: 500 }
    );
  }
}
