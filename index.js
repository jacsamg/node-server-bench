import { server as honoServer } from './src/hono.js';
import { server as h3Server } from './src/h3.js';
import { server as vanilla01Server } from './src/vanilla-01.js';
import { server as vanilla02Server } from './src/vanilla-02.js';

honoServer();
h3Server();
vanilla01Server();
vanilla02Server();