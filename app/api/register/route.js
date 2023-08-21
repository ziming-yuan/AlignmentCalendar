import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const {email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({ email, password: hashedPassword });
        return NextResponse.json({message: "user registered"}, {status: 201});
    } catch {
        return NextResponse.json({message: "error while registering"}, {status: 500})
    }
}