import { basename } from 'path';

/**
 * Returns a hash with information about the context from where the output was
 * generated like filename, line number and more..
 *
 * @export
 * @param {number} stackOffset
 * @returns {IStackData}
 */
export function getStackData(stackOffset: number): IStackData {
  stackOffset = stackOffset || 0;

  let stackReg: RegExp;
  let stackReg2: RegExp;
  let error: Error;
  let errorStack: string;
  let stackList: string[];

  stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
  stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
  error = new Error();
  errorStack = error.stack || '';

  stackList = errorStack.split('\n');

  const s = stackList[stackOffset] || stackList[0];
  const sp = stackReg.exec(s) || stackReg2.exec(s);

  const data: IStackData = {
    file: '',
    fullPath: '',
    line: 0,
    method: '',
    path: '',
    pos: 0,
    stack: [],
  };

  if (sp && sp.length === 5) {
    data.method = sp[1];
    data.fullPath = sp[2];
    data.path = sp[2].replace(process.cwd() + '/', '');
    data.line = parseInt(sp[3], 10);
    data.pos = parseInt(sp[4], 10);
    data.file = basename(data.path);
    data.stack = stackList;
  }

  return data;
}

/**
 * shape of the stack data object returned by getStackData fn
 *
 * @export
 * @interface IStackData
 */
export interface IStackData {
  method: string;
  fullPath: string;
  path: string;
  line: number;
  pos: number;
  file: string;
  stack: string[];
}
