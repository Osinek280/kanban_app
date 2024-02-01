import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import File from "@/models/file";

export async function POST(req: Request, { params }: {params: any}) {
  try{
    const {section} = await req.json()
    
    connectMongoDB()

    const file = await File.findById(params.slug)
  
    if(!file) {
      return NextResponse.json({ message: "File not found." }, { status: 404 });
    }

    file.sections.push(section)
    
    await file.save()
    
    return NextResponse.json({ message: "Task updated." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: {params: any}) {
  try{
    console.log("fd")
    const {section} = await req.json()
    
    connectMongoDB()

    const file = await File.findById(params.slug)
  
    if(!file) {
      return NextResponse.json({ message: "File not found." }, { status: 404 });
    }

    file.sections = file.sections.filter((s: string) => s !== section);
    
    await file.save()
    
    return NextResponse.json({ message: "Task updated." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}