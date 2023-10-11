import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// -------------------CREATE POST TAG ------------------------------

export const POST = async (req, res) => {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    try {
        const {searchParams} = new URL(req.url);
        const postId = +searchParams.get("postId")
        const tagId = +searchParams.get("tagId")
        
        const result = await prisma.post_tag.createMany({
            data: {
                postId: postId, tagId: tagId,
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


// -------------------READ POST TAG ------------------------------

export const GET = async () => {
    try {
        const result = await prisma.post_tag.findMany();
        
        return NextResponse.json({
            status: "success", data: result,
        });
    } catch (error) {
        return NextResponse.json({
            status: "failed", data: error,
        });
    }
};

// -------------------UPDATE  POST TAG------------------------------

export const PUT = async (req, res) => {
    try {
        
        const {searchParams} = new URL(req.url);
        const postId = +searchParams.get("postId")
        const tagId = +searchParams.get("tagId")
        const id = +searchParams.get("id");
        const result = await prisma.post_tag.update({
            where: {
                id: id,
            }, data: {
                postId: postId, tagId: tagId,
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

// -------------------DELETE POST TAG ------------------------------
export const DELETE = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url);
        const id = +searchParams.get("id");
        const result = await prisma.post_tag.delete({
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

