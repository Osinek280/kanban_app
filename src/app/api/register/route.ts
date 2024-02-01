import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs"

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