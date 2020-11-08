"use strict";

import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import inert from "@hapi/inert";
import config from './config';
import Logger from './services/logger';
import routes from './routes/api';

(async () => {
    const server = new Server({
      port: config.port,
      host: config.host,
      routes: {
        cors: {
          origin: ["*"],
          headers: ["Accept", "Content-Type"],
          additionalHeaders: ["X-Requested-With"]
        }
      },
      debug: { request: ['*'] }
    });

    await server.register([inert, routes], {
      routes: {
        prefix: '/api'
      }
    });

    server.route({
      method: '*',
      path: '/{any*}',
      handler: (request: Request, h: ResponseToolkit) => {
        return h.response({statusCode: 404, server: config.name, host: `${config.host}:${config.port}`}).code(404);
      }
    })

    server.events.on('response', function (response: any) {
      Logger.info(`${config.host}:${config.port}: - - ${response.method.toUpperCase()} ${response.path} --> ${response.response.statusCode}`);
    });

    server.events.on('log', (event: any, tags: any) => {
      if (tags.error) {
        Logger.error(`${config.env}] Server error: ${event.error ? event.error.message : 'unknown'}`);
      }
    });

    await server.start();

    Logger.info(`[${config.env}] Server running on ${config.host}:${config.port}`);

})().catch((error: Error) => Logger.error(`${config.env}] Server error: ${error ? error.message : 'unknown'}`));
