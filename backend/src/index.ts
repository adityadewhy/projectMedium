import {Hono} from "hono";
import {decode, sign, verify} from "hono/jwt";

import {PrismaClient} from "@prisma/client/extension";
import {withAccelerate} from "@prisma/extension-accelerate";
import {Prisma} from "@prisma/client";

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

app.post("/api/v1/user/signup", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				name: body.name,
			},
		});
		const jwt = await sign(
			{
				id: user.id,
			},
			c.env.JWT_SECRET
		);
		return c.text(jwt);
	} catch (e) {
		return c.text("inavlid signup inputs");
	}

	return c.text("ehllo world signup");
});

app.post("/api/v1/signin", (c) => {
	return c.text("signin route");
});

app.post("/api/v1/blog", (c) => {
	return c.text("post blog route");
});

app.put("/api/v1/blog", (c) => {
	return c.text("update blog route");
});

app.get("/api/v1/blog/:id", (c) => {
	const id = c.req.param("id");
	console.log(id);
	return c.text("get specific blog route");
});

app.get("/api/v1/blog/bulk", (c) => {
	return c.text("get all blogs");
});

export default app;
