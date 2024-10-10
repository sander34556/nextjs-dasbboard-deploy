import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const user = await User.findOne({ _id: id });
    return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.findByIdAndUpdate(id, { name, email, password: hashedPassword });
    return NextResponse.json({ message: "user updated" }, { status: 200 });
}