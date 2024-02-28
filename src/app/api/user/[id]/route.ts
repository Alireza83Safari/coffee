import User from "@/models/user";
import connectToDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import isValidObjectId from "@/helper/isValidObjectId";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    isValidObjectId(params?.id);
    const findUser = await User.find({ _id: params.id });

    if (!findUser) {
      return NextResponse.json({ error: " کاربر وجود ندارد" }, { status: 404 });
    }

    return NextResponse.json(findUser);
  } catch (error) {}
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const data = await req.json();
    isValidObjectId(params?.id);

    const editUser = await User.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!editUser) {
      return NextResponse.json({ error: " کاربر وجود ندارد" }, { status: 404 });
    }

    return NextResponse.json(editUser);
  } catch (error) {}
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    isValidObjectId(params?.id);
    const editUser = await User.findByIdAndDelete(params.id);

    if (editUser) {
      return NextResponse.json({
        message: "حذف کاربر موفقیت آمیز بود",
        status: 200,
      });
    }
    return NextResponse.json({ error: " کاربر وجود ندارد" }, { status: 404 });
  } catch (error) {}
}
