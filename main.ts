
import { generate } from "./badge/badge.ts";
import { Application, Router } from "./deps.ts";

const app = new Application();
const router = new Router();

router
  .get("/test", async ctx => {
    const badge = await fetch("http://localhost:8002/SDBagel/Analytics/1/json")
      .then(res => res.json());

    ctx.response.body = await generate(badge);
    ctx.response.type = "image/svg+xml";
  });

app.use(router.routes());

const port = Deno.env.get("PORT") || "9000";
console.log(`http://localhost:${port}`);
app.listen({ port: parseInt(port) });