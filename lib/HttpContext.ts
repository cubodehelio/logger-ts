
import * as uuid from "node-uuid";
import {ExpressRequest, ExpressResponse} from "./types";

/**
 * Get request IP address.
 *
 * @private
 * @param {IncomingMessage} req
 * @return {string}
 */
function getIp(req): string {
  return req.ip
    || req._remoteAddress
    || (req.connection && req.connection.remoteAddress)
    || "no-remote-addr";
}

export default class HttpContext {

  constructor(private req: ExpressRequest, private res: ExpressResponse) { }

  url() {
    return this.req.originalUrl || this.req.url;
  }

  method() {
    return this.req.method;
  }

  status(): string {
    return this.res._header ? String(this.res.statusCode) : "no-status";
  }


  referrer() {
    return this.req.get('referer') || this.req.get('referrer');
  }

  /**
   * remote address
   */

  remoteAddr() {
    return getIp(this.req).replace('::ffff:', "");
  }

  httpVersion(): string {
    return this.req.httpVersionMajor + '.' + this.req.httpVersionMinor;
  }

  userAgent() {
    return this.req.get('user-agent');
  }

  reqHeader(field) {
    // get header
    let header = this.req.get[field]

    return Array.isArray(header) ? header.join(', ') : header
  }

  resHeader(field) {
    if (!this.res._header) {
      return undefined;
    }

    let header: string | Array<string>;

    header = this.res.get(field);
    return Array.isArray(header) ? header.join(', ') : header;
  }

} 