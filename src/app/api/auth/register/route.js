import { connectToDatabase } from "@/lib/db";
import User from "@/model/User.model";
import { NextResponse } from "next/server";



export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    await connectToDatabase();



    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const user = await User.create({
      email: email.trim().toLowerCase(),
      password, 
    });

    return NextResponse.json({ message: "User registered successfully", userId: user._id }, { status: 201 });
  } 
  
  catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
