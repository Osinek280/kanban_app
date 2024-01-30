import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs"
import File from '@/models/file';


const file = {
  name: 'School',
  sections: ['To do', 'In progress', 'Done'],
  tasks: [
    {
      title: 'Study for math test',
      description: 'Review chapters 1-5 and solve practice problems.',
      category: 'To do',
      priority: 'medium',
      subtasks: ['Take dog for a walk', 'Wash car exterior'],
    },
    {
      title: 'Write essay for English class',
      description: 'Choose a topic and draft an outline for the essay.',
      category: 'To do',
      priority: 'high',
      subtasks: ['Take dog for a walk', 'Wash car exterior'],
    },
    {
      title: 'Complete science experiment',
      description: 'Gather materials and conduct the experiment following the procedure.',
      category: 'In progress',
      priority: 'medium',
      subtasks: ['Take dog for a walk', 'Wash car exterior'],
    },
    {
      title: 'Prepare presentation for history project',
      description: 'Research the topic and create slides for the presentation.',
      category: 'In progress',
      priority: 'low',
      subtasks: ['Take dog for a walk', 'Wash car exterior'],
    },
    {
      title: 'Submit homework assignments',
      description: 'Complete and submit the assigned homework tasks.',
      category: 'Done',
      priority: 'low',
      subtasks: ['Take dog for a walk', 'Wash car exterior'],
    },
    {
      title: 'Review study notes for upcoming quiz',
      description: 'Go through the notes and summarize key concepts.',
      category: 'Done',
      priority: 'medium',
      subtasks: ['Take dog for a walk', 'Wash car exterior'],
    },
  ],
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    await connectMongoDB();

    // add file 
    // await File.create({
    //   owner: "65b78d11b22620d70b1ecd6e",
    //   name: file.name,
    //   sections: file.sections,
    //   tasks: file.tasks
    // })

    // check if user already exists
    const existingUser = await User.findOne({email}).select("_id");
    if(existingUser) {
      return NextResponse.json(
        { message: "User already exists"},
        { status: 400 }
      )
    }

    // if user doesn't exist, register user
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hashedPassword })

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}