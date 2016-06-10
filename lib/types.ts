/**
 * Declare some missing types so typescript transpiler don't cry.
 * 
 * TODO: test whether it works extending `express.Request`
 * from a NodeJS Server IncommingMessage or so..
 */

import * as express from "express";

/**
 * missing declarations in express.Request types
 */
export interface ExpressRequest extends express.Request {
  access_uuid: string,
  httpVersionMajor: string,
  httpVersionMinor: string
}

/**
 * missing declarations in express.Response types
 */
export interface ExpressResponse extends express.Response {
  _header: any
}