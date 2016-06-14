import * as express from "express";
import * as onFinished from "on-finished";
import * as uuid from "node-uuid";

import HttpContext from "./HttpContext";
import Logger from "./Logger";

type NextFn = express.NextFunction;

import {ExpressRequest, ExpressResponse} from "./types";

/**
 * Middleware
 */
export function middleware(): express.Handler {

  let logger = new Logger();

  return (req: ExpressRequest, res: ExpressResponse, next: NextFn) => {
    let startTime = new Date().getTime();
    let ctx = new HttpContext(req, res);

    req.access_uuid = uuid.v4();

    logger.info(`[${req.access_uuid}] <== "${ctx.method()} ${ctx.url()}" ${ctx.remoteAddr()} HTTP/${ctx.httpVersion()} ${ctx.userAgent()}`);

    onFinished(res, (err, res) => {
      let reqTime = ((new Date().getTime()) - startTime) / 1000;

      // _debugger.info(`${ctx.remoteAddr()}- "${ctx.method()} ${ctx.url()} HTTP/${ctx.httpVersion()}" ${ctx.status()} ${ctx.resHeader('content-length')} ${ctx.userAgent()}`);
      logger.info(`[${req.access_uuid}] ==>  ${ctx.status()} length:${ctx.resHeader('content-length')} time:${reqTime}s`);
      

      if (err) {
        logger.warn(`detected error comming from "onFinished" on logger.middleware module: ${err.message}`);
        logger.error(err);
      }
    });

    next();
  }
}