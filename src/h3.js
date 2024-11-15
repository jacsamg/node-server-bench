import { createServer } from "node:http";
import { createApp, createRouter, defineEventHandler, toNodeListener } from "h3";

const app = createApp();
const router = createRouter();

router.get(
  "/hello",
  defineEventHandler(async (event) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "Hello world!";
  })
);

app.use(router);

createServer(toNodeListener(app)).listen(3000, () => {
  console.log('h3 3000');
});