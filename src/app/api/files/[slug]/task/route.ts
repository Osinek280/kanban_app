import { connectMongoDB } from "@/lib/mongodb"
import File from "@/models/file"
import { NextResponse } from "next/server"
import { Task } from "@/types";

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

export async function DELETE(req: Request, { params }: {params: any}) {
  try{
    const {taskId} = await req.json()
    
    connectMongoDB()

    const file = await File.findById(params.slug)
  
    if(!file) {
      return NextResponse.json({ message: "File not found." }, { status: 404 });
    }

    file.tasks.pull({ _id: taskId })
    
    await file.save()
    
    return NextResponse.json({ message: "Task updated." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}