import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// -------------------CREATE POST CATEGORY ------------------------------

export const POST = async (req, res) => {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    try {
        const {searchParams} = new URL(req.url);
        const postId = +searchParams.get("postId")
        const categoryId = +searchParams.get("categoryId")
        
        const result = await prisma.post_category.create({
            data: {
                postId: postId, categoryId: categoryId,
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


// -------------------READ POST CATEGORY ------------------------------

export const GET = async () => {
    try {
        const result = await prisma.post_category.findMany();
        
        return NextResponse.json({
            status: "success", data: result,
        });
    } catch (error) {
        return NextResponse.json({
            status: "failed", data: error,
        });
    }
};

// -------------------UPDATE  POST CATEGORY------------------------------

export const PUT = async (req, res) => {
    try {
        
        const {searchParams} = new URL(req.url);
        const postId = +searchParams.get("postId")
        const categoryId = +searchParams.get("categoryId")
        const id = +searchParams.get("id");
        const result = await prisma.post_category.update({
            where: {
                id: id,
            }, data: {
                postId: postId, categoryId: categoryId,
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

// -------------------DELETE POST CATEGORY ------------------------------
export const DELETE = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url);
        const id = +searchParams.get("id");
        const result = await prisma.post_category.delete({
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

