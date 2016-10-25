import * as express from 'express';

/**
 * missing declarations in express.Response types
 */
export interface IExpressResponse extends express.Response {
  _header: any;
}
