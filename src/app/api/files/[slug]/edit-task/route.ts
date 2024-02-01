import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import File from "@/models/file";

interface Task {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  subtasks: string[];
}

export async function PATCH(req: Request, { params }: {params: any}) {
  try{
    const {task, id} = await req.json()
    
    connectMongoDB()

    const file = await File.findById(params.slug)
  
    if(!file) {
      return NextResponse.json({ message: "File not found." }, { status: 404 });
    }

    const taskIndex = file.tasks.findIndex((task: Task) => task._id.toString() === id);
    
    if (taskIndex === -1) {
      return NextResponse.json({ message: "Task with the provided identifier not found." }, { status: 404 });
    }

    file.tasks[taskIndex] = { ...file.tasks[taskIndex], ...task };

    await file.save()
    
    return NextResponse.json({ message: "Task updated." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}