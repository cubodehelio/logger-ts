import * as express from 'express';

/**
 * Available levels for the logger
 */
export type LogType = 'ERROR' | 'WARN' | 'INFO' | 'LOG' | 'DEBUG' | 'SILLY';

/**
 * Declare the NodeJS standard outputs.
 */
export type std = 'out' | 'err';

/**
 * shape of the stack data object
 */
export interface StackData {
  method: string;
  fullPath: string;
  path: string;
  line: number;
  pos: number;
  file: string;
  stack: Array<string>;
}

/**
 * missing declarations in express.Request types
 */
export interface ExpressRequest extends express.Request {
  access_uuid: string;
  httpVersionMajor: string;
  httpVersionMinor: string;
}

/**
 * missing declarations in express.Response types
 */
export interface ExpressResponse extends express.Response {
  _header: any;
}
