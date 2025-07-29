import { createBlogInput, updateBlogInput } from "@noisytech/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
    // bearer token => ["bearer","token"]
    try {
        const response = await verify(token, c.env.JWT_SECRET);
        if (
            response &&
            typeof response === "object" &&
            "id" in response &&
            typeof (response as any).id === "string"
        ) {
            c.set("userId", (response as any).id);
            await next();
        } else {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
    }
    catch (e) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            error:"Invalid inputs zod error"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("userId");
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId,
        }
    })
    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            error:"Invalid inputs zod error"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        id: blog.id
    })
})

//pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();
    return c.json({
        blogs
    })
})


blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: id
            }
        })
        return c.json({
            blog
        })
    } catch (e) {
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})


