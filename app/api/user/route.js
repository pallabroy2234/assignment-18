import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

// -------------------CREATE USER ------------------------------

export const POST = async (req, res) => {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  try {
    const result = await prisma.user.createMany({
      data: [
        {
          email: "prisma@gmail.com",
          firstName: "Pallab",
          middleName: "Roy",
          lastName: "Tushar",
          intro: "I am a full stack developer",
          mobile: "01527349213",
          passwordHash: "aojdfoajdsf123",
          profile: "https://www.google.com",
        },
        {
          email: "orm@gmail.com",
          firstName: "Tushar",
          middleName: "Roy",
          lastName: "Pallab",
          intro: "I am a full stack developer",
          mobile: "01527349213",
          passwordHash: "aojdfoajdsf123",
          profile: "https://www.google.com",
        },
      ],
    });

    return NextResponse.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      data: error,
    });
  }
};

// -------------------READ USER ------------------------------

export const GET = async () => {
  try {
    const result = await prisma.user.findMany();

    return NextResponse.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      data: error,
    });
  }
};

// -------------------UPDATE USER ------------------------------

export const PUT = async (req, res) => {
  try {
    const {searchParams} = new URL(req.url);
    const id = +searchParams.get("id");
    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName: "updated",
        email: "updated@gmail.com",
      },
    });

    return NextResponse.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      data: error,
    });
  }
};

// -------------------DELETE USER ------------------------------
export const DELETE = async (req, res) => {
  try {
    const {searchParams} = new URL(req.url);
    const id = +searchParams.get("id");
    const result = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      data: error,
    });
  }
};
