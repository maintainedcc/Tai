
import { generate } from "./badge/badge.ts";
import { Application, Router } from "./deps.ts";

const app = new Application();
const router = new Router();

router
	.get("/", async ctx => {
		const defaultQuery = '{"fields":[{"content":"Tai","color":0,"width":20},{"content":"Invalid Badge","color":6,"width":80}],"style":0}';
		const query = ctx.request.url.searchParams.get("json") || defaultQuery;
			
		// Set response headers
		ctx.response.headers.set("Access-Control-Allow-Origin", "*");
		ctx.response.headers.set("Cache-Control", "no-store");
		ctx.response.type = "image/svg+xml";

		// Generate badge or invalid badge and return
		try {
			const json = JSON.parse(query);
			ctx.response.body = await generate(json);
		}
		catch (e) {
			const json = JSON.parse(defaultQuery);
			ctx.response.body = await generate(json);
		}
	})
	.get("/:userId/:project/:badgeId", async ctx => {
		const { userId, project, badgeId } = ctx.params;
		const apiBase = Deno.env.get("API_BASE") || "http://localhost:8002";
		const data = await fetch(`${apiBase}/${userId}/${project}/${badgeId}/json`)
			.then(res => res.json());

		if (data) {
			const badge = await generate(data);
			ctx.response.body = badge;
			ctx.response.headers.set("Access-Control-Allow-Origin", "*");
			ctx.response.headers.set("Cache-Control", "no-store");
			ctx.response.type = "image/svg+xml";
		}
		else ctx.throw(404);
	});

app.use(router.routes());
app.use(router.allowedMethods());

const port = Deno.env.get("PORT") || "9002";
console.log(`http://localhost:${port}`);
app.listen({ port: parseInt(port) });