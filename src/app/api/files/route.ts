import { connectMongoDB } from "@/lib/mongodb";
import File from "@/models/file";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userId = "65b78d11b22620d70b1ecd6e";

    await connectMongoDB();

    const files = await File.find({ owner: userId });
    console.log(files);

    return NextResponse.json({ files: files }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching data." },
      { status: 500 }
    );
  }
}
