import { IExpressResponse } from './common-types';
import HttpContext from './HttpContext';
import Logger from './Logger';
import * as express from 'express';
import * as uuid from 'node-uuid';
import * as onFinished from 'on-finished';

type NextFn = express.NextFunction;

/**
 * missing declarations in express.Request types
 */
export interface IExpressRequest extends express.Request {
  access_uuid: string;
}

/**
 * Middleware
 */
export function middleware(): express.Handler {

  let logger: Logger = new Logger();

  return (req: IExpressRequest, res: IExpressResponse, next: NextFn) => {
    let startTime = new Date().getTime();
    let ctx = new HttpContext(req, res);

    req.access_uuid = uuid.v4();

    // tslint:disable-next-line
    logger.info(`[${req.access_uuid}] <== '${ctx.method()} ${ctx.url()}' ${ctx.remoteAddr()} HTTP/${ctx.httpVersion()} ${ctx.userAgent()}`);

    onFinished(res, (err) => {
      let reqTime = ((new Date().getTime()) - startTime) / 1000;

      // tslint:disable-next-line
      // _debugger.info(`${ctx.remoteAddr()}- '${ctx.method()} ${ctx.url()} HTTP/${ctx.httpVersion()}' ${ctx.status()} ${ctx.resHeader('content-length')} ${ctx.userAgent()}`);

      // tslint:disable-next-line
      logger.info(`[${req.access_uuid}] ==>  ${ctx.status()} length:${ctx.resHeader('content-length')} time:${reqTime}s`);

      if (err) {
        logger.warn(`detected error coming from 'onFinished' on logger.middleware module: ${err.message}`);
        logger.error(err);
      }
    });

    next();
  };
}
