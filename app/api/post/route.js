import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// -------------------CREATE Post ------------------------------

export const POST = async (req, res) => {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    try {
        
        const result = await prisma.user.create({
            data: {
                firstName: "John",
                lastName: "Doe",
                middleName: "Doe",
                email: "ajdfos@gamil.com",
                intro: "I am a developer",
                mobile: "1234567890",
                passwordHash: "1234567890",
                profile: "https://www.google.com",
                post: {
                    create: [
                        {
                            title: "Hello World",
                            content: "This is my first post",
                            metaTitle: "Hello World",
                            published: true,
                            slug: "hello-world",
                            summary: "This is my first post",
                        },
                        {
                            title: "Hello World",
                            content: "This is my first post",
                            metaTitle: "Hello World",
                            published: true,
                            slug: "hello-world",
                            summary: "This is my first post",
                        }
                    ]
                }
            }
        })
        
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
        const result = await prisma.post.findMany();
        
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
        const result = await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                title: "Post updated title",
                metaTitle: "Post updated meta title",
                content: "Post updated content",
                summary: "Post updated summary",
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
        const result = await prisma.post.delete({
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
