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

export async function POST(req: Request, { params }: {params: any}) {
  try{
    console.log(params)

    const {task, id} = await req.json()
    console.log("task: ", task)
    console.log("id: ", id)
    
    const file = await File.findById(params.slug)
  
    if(!file) {
      return NextResponse.json({ message: "File not found." }, { status: 404 });
    }

    const taskIndex = file.tasks.findIndex((task: Task) => task._id.toString() === id);
    
    if (taskIndex === -1) {
      return NextResponse.json({ message: "Nie znaleziono zadania o podanym identyfikatorze." }, { status: 404 });
    }

    file.tasks[taskIndex] = { ...file.tasks[taskIndex], ...task };

    await file.save()
  
    connectMongoDB()
  
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Wystąpił błąd podczas przetwarzania żądania." }, { status: 500 });
  }
}