import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

async function mw1(c, next) {
  await next();
}

async function mw2(c, next) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  await next();
}

async function handler(c) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return c.text('Hello world!');
};

app.get('/hello', mw1, mw2, handler);

serve(app, () => {
  console.log('hono 3000');
});