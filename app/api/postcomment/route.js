import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// -------------------CREATE POST COMMENT ------------------------------

export const POST = async (req, res) => {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    try {
        
        const result = await prisma.user.create({
            data: {
                firstName: "post",
                lastName: "comment",
                middleName: "one",
                email: "postcommentone@gamil.com",
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
                            // CREATE POST COMMENT
                            post_comment: {
                                create: [
                                    {
                                        title: "This is my first post first comment",
                                        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cum cupiditate earum eius error est eum expedita fuga id ipsum labore magni minus nesciunt numquam repellendus, saepe soluta suscipit voluptatem!",
                                        published: true,
                                    },
                                    {
                                        title: "This is my first post second comment",
                                        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cum cupiditate earum eius error est eum expedita fuga id ipsum labore magni minus nesciunt numquam repellendus, saepe soluta suscipit voluptatem!",
                                        published: true,
                                    }
                                ]
                            }
                        },
                        
                        {
                            title: "Hello World",
                            content: "This is my first post",
                            metaTitle: "Hello World",
                            published: true,
                            slug: "hello-world",
                            summary: "This is my first post",
                            post_comment: {
                                create: [
                                    {
                                        title: "This is my second post first comment",
                                        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cum cupiditate earum eius error est eum expedita fuga id ipsum labore magni minus nesciunt numquam repellendus, saepe soluta suscipit voluptatem!",
                                        published: true,
                                    },
                                    {
                                        title: "This is my second post second comment",
                                        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cum cupiditate earum eius error est eum expedita fuga id ipsum labore magni minus nesciunt numquam repellendus, saepe soluta suscipit voluptatem!",
                                        published: true,
                                    }
                                ]
                            }
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


// -------------------READ POST COMMENT ------------------------------

export const GET = async () => {
    try {
        const result = await prisma.post_comment.findMany();
        
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

// -------------------UPDATE  POST COMMENT------------------------------

export const PUT = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url);
        const id = +searchParams.get("id");
        const result = await prisma.post_comment.update({
            where: {
                id: id,
            },
            data: {
                title: "This is the updated post comment  title",
                content: "This is the updated post comment content",
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

// -------------------DELETE post COMMENT ------------------------------
export const DELETE = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url);
        const id = +searchParams.get("id");
        const result = await prisma.post_comment.delete({
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

