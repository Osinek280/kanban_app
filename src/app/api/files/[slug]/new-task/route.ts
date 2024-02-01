import { connectMongoDB } from "@/lib/mongodb"
import File from "@/models/file"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: {params: any}) {
  try {
    const { task } = await req.json()

    connectMongoDB()

    const file = await File.findById(params.slug)

    if(!file) {
      return NextResponse.json({ message: "File not found." }, { status: 404 });
    }

    file.tasks.push(task)

    await file.save()
  
    return NextResponse.json({ message: "New Task added." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  } 
}