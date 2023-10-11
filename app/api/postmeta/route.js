import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// -------------------CREATE POST META ------------------------------

export const POST = async (req, res) => {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    try {
        const result = await prisma.user.create({
            data: {
                firstName: "post",
                lastName: "key",
                middleName: "one",
                email: "postkeyone@gamil.com",
                intro: "I am a developer",
                mobile: "1234567890",
                passwordHash: "1234567890",
                profile: "https://www.google.com",
                post: {
                    create: [{
                        title: "Hello World",
                        content: "This is my first post",
                        metaTitle: "Hello World",
                        published: true,
                        slug: "hello-world",
                        summary: "This is my first post",
                        // create meta
                        post_meta: {
                            create: [{
                                key: "This is first post and key is 1",
                                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cum cupiditate earum eius error est eum expedita fuga id ipsum labore magni minus nesciunt numquam repellendus, saepe soluta suscipit voluptatem!",
                            }, {
                                key: "This is first post and key is 2",
                                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cum cupiditate earum eius error est eum expedita fuga id ipsum labore magni minus nesciunt numquam repellendus, saepe soluta suscipit voluptatem!",
                            }]
                        }
                    }, {
                        title: "Hello World",
                        content: "This is my first post",
                        metaTitle: "Hello World",
                        published: true,
                        slug: "hello-world",
                        summary: "This is my first post",
                    }]
                }
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


// -------------------READ POST META ------------------------------

export const GET = async () => {
    try {
        const result = await prisma.post_meta.findMany();
        
        return NextResponse.json({
            status: "success", data: result,
        });
    } catch (error) {
        return NextResponse.json({
            status: "failed", data: error,
        });
    }
};

// -------------------UPDATE  POST META------------------------------

export const PUT = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url);
        const id = +searchParams.get("id");
        const result = await prisma.post_meta.update({
            where: {
                id: id,
            }, data: {
                key: "This is update key",
                content: "This is update content",
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

// -------------------DELETE POST META ------------------------------
export const DELETE = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url);
        const id = +searchParams.get("id");
        const result = await prisma.post_meta.delete({
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
