import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import File from "@/models/file";
import { Task } from "@/types";

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

export async function PATCH(req: Request, { params }: {params: any}) {
  try{
    const {section, index} = await req.json()
    
    connectMongoDB()

    const file = await File.findById(params.slug)
  
    if(!file) {
      return NextResponse.json({ message: "File not found." }, { status: 404 });
    }

    file.tasks.forEach((task: Task) => {
      if (task.category === file.sections[index]) {
        task.category = section;
      }
    });

    file.sections[index] = section
    
    await file.save()
    
    return NextResponse.json({ message: "Task updated." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}