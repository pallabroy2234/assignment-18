import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// -------------------CREATE  TAG ------------------------------

export const POST = async (req, res) => {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    try {
        const result = await prisma.tag.createMany({
            data: [{
                title: "This is the first tag",
                metaTitle: "This is the first meta tag",
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cum cupiditate earum eius error est eum expedita fuga id ipsum labore.",
                slug: "first-tag",
            }, {
                title: "This is the first second",
                metaTitle: "This is the second meta tag",
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cum cupiditate earum eius error est eum expedita fuga id ipsum labore.",
                slug: "first-tag",
            }]
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


// -------------------READ  TAG ------------------------------

export const GET = async () => {
    try {
        const result = await prisma.tag.findMany();
        
        return NextResponse.json({
            status: "success", data: result,
        });
    } catch (error) {
        return NextResponse.json({
            status: "failed", data: error,
        });
    }
};

// -------------------UPDATE   TAG------------------------------

export const PUT = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url);
        const id = +searchParams.get("id");
        const result = await prisma.tag.update({
            where: {
                id: id,
            }, data: {
                title: "This is the updated tag",
                content: "This is the updated tag content",
                slug: "updated-tag",
                metaTitle: "This is the updated meta title",
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

// -------------------DELETE  TAG ------------------------------
export const DELETE = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url);
        const id = +searchParams.get("id");
        const result = await prisma.tag.delete({
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

