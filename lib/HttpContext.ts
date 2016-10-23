
import {ExpressRequest, ExpressResponse} from './types';

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
    || 'no-remote-addr';
}

export default class HttpContext {

  constructor(private req: ExpressRequest, private res: ExpressResponse) { }

  public url() {
    return this.req.originalUrl || this.req.url;
  }

  public method() {
    return this.req.method;
  }

  public status(): string {
    return this.res._header ? String(this.res.statusCode) : 'no-status';
  }


  public referrer() {
    return this.req.get('referer') || this.req.get('referrer');
  }

  /**
   * remote address
   */

  public remoteAddr() {
    return getIp(this.req).replace('::ffff:', '');
  }

  public httpVersion(): string {
    return this.req.httpVersionMajor + '.' + this.req.httpVersionMinor;
  }

  public userAgent() {
    return this.req.get('user-agent');
  }

  public reqHeader(field) {
    // get header
    let header = this.req.get[field]

    return Array.isArray(header) ? header.join(', ') : header
  }

  public resHeader(field) {
    if (!this.res._header) {
      return undefined;
    }

    let header: string | Array<string>;

    header = this.res.get(field);
    return Array.isArray(header) ? header.join(', ') : header;
  }

}
