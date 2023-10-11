import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// -------------------CREATE  CATEGORY ------------------------------

export const POST = async (req, res) => {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    try {
        const result = await prisma.category.create({
            data: {
                title: "This is the category title",
                content: "This is the category content",
                slug: "category slug",
                metaTitle: "This is the category meta title",
            }
        })
        
        return NextResponse.json({
            status: "success", data: result,
        });
    } catch (error) {
        return NextResponse.json({
            status: "failed", data: error,
        });
    }
};


// -------------------READ  CATEGORY ------------------------------

export const GET = async () => {
    try {
        const result = await prisma.category.findMany();
        
        return NextResponse.json({
            status: "success", data: result,
        });
    } catch (error) {
        return NextResponse.json({
            status: "failed", data: error,
        });
    }
};

// -------------------UPDATE   CATEGORY ------------------------------

export const PUT = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url);
        const id = +searchParams.get("id");
        const result = await prisma.category.update({
            where: {
                id: id,
            }, data: {
                title: "This is the updated category title",
                slug: "updated category slug",
                content: "This is the updated category content",
                metaTitle: "This is the updated category meta title",
            },
        });
        
        return NextResponse.json({
            status: "success", data: result,
        });
    } catch (error) {
        return NextResponse.json({
            status: "failed", data: error,
        });
    }
};

// -------------------DELETE  CATEGORY ------------------------------
export const DELETE = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url);
        const id = +searchParams.get("id");
        const result = await prisma.category.delete({
            where: {
                id: id,
            },
        });
        
        return NextResponse.json({
            status: "success", data: result,
        });
    } catch (error) {
        return NextResponse.json({
            status: "failed", data: error,
        });
    }
};
