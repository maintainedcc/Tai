
import { BadgeService } from "./badge/badge.ts";
import { Application, Router } from "./deps.ts";

const app = new Application();
const router = new Router();

router
  .get("/test", async ctx => {
    const badge = {
      "id":1,
      "fields":[
        {"content":"New","color":0,"width":35},
        {"content":"Badge","color":4,"width":50}
      ],
      "style":2
    }

    ctx.response.body = await new BadgeService().generate(badge);
    ctx.response.type = "image/svg+xml";
  });

app.use(router.routes());

console.log("http://localhost:9000");
app.listen({ port: 9000 });