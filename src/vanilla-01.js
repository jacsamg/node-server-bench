import { createServer } from 'node:http';

function nextFn() {
  return true;
}

function createMiddleware(middleware) {
  return {
    run: (req, res) => middleware(req, res, nextFn),
  };
}

function createHandler() {
  return {
    run: (req, res) => handler(req, res),
  };
}

function createEndpoint(...handlers) {
  return async (req, res) => {
    let next = true;

    try {
      for (const handler of handlers) {
        next = await handler.run(req, res);
        if (!next) break;
      }
    } catch (error) {
      console.error('TODO:', error);
    }
  };
}

function mw1(req, res, next) {
  return next();
}

async function mw2(req, res, next) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return next();
}

async function handler(req, res) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  res.statusCode = 200;
  res.end('Hello world!');
}

const endpoint = createEndpoint(
  createMiddleware(mw1),
  createMiddleware(mw2),
  createHandler(handler),
);

const app = createServer(async (req, res) => {
  if (req.method === 'GET', req.url === '/hello') {
    await endpoint(req, res);
  }
});

app.listen(3000, () => {
  console.log('vanilla-01 3000');
});