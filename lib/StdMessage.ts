import { IStackData, getStackData } from './getStackData';
import * as chalk from 'chalk';
import isError = require('lodash.iserror');
import { inspect } from 'util';

/**
 * Available levels for the logger
 */
export type LogType = 'ERROR' | 'WARN' | 'INFO' | 'LOG' | 'DEBUG' | 'SILLY';

/**
 * Declare the NodeJS standard outputs.
 */
export type std = 'out' | 'err';

/**
 * Gives format to the log messages.
 *
 * @export
 * @class StdMessage
 */
export class StdMessage {

  public date: Date;
  public type: LogType;
  public messages: Array<any>;
  public errors: Array<Error>;
  public std: std;
  public stackData: IStackData;

  /**
   * Creates an instance of StdMessage.
   *
   * @param {LogType} type
   * @param {...Array<any>} messages
   *
   * @memberOf StdMessage
   */
  constructor(type: LogType, ...messages: Array<any>) {
    this.type = type;
    this.date = new Date();
    this.messages = messages;
    this.errors = messages.filter(isError);
    this.std = (type === 'ERROR' || type === 'WARN') ? 'err' : 'out';
    this.stackData = getStackData(4);

    if (this.type !== 'INFO') {
      messages.push(`(\`${this.stackData.file}\` line:${this.stackData.line})`);
    }
  }

  /**
   * Get the output channel name. Can be either `stdout` or `stderr`
   *
   * @returns {string}
   *
   * @memberOf StdMessage
   */
  public getChannel(): string {
    return `std${this.std}`;
  }

  /**
   * Serialize the StdMessage instance to string.
   *
   * @returns {string}
   *
   * @memberOf StdMessage
   */
  public toString(): string {

    let message = '';
    let inspectDepth = 10;

    this.messages.forEach(msg => {

      if (isError(msg)) {
        msg = chalk.red(inspect(msg, { depth: inspectDepth }));
      } else {
        // avoid inspecting strings so we don't lose format
        msg = (typeof msg === 'string')
          ? chalk.green(msg)
          : inspect(msg, { colors: chalk.supportsColor, depth: inspectDepth });
      }

      message = message.concat(msg).concat(' ');
    });

    message = message.concat('\n').replace(/'/g, '');

    if (this.errors.length) {
      this.errors.forEach(err => {
        let stack: string = err.stack || '';
        message = message.concat(chalk.red(stack)).concat('\n');
      });
    }

    return `${this.date.toISOString()} ${this.formatedType()} ${message}`;
  }

  /**
   * Add colors to the `type` part of the message plus a leading `:` char.
   *
   * @private
   * @returns {string}
   *
   * @memberOf StdMessage
   */
  private formatedType(): string {

    let formatedType: string;

    switch (this.type) {
      case 'ERROR':
        formatedType = chalk.red(this.type);
        break;

      case 'WARN':
        formatedType = chalk.yellow(this.type);
        break;

      case 'INFO':
        formatedType = chalk.blue(this.type);
        break;

      case 'LOG':
        formatedType = chalk.cyan(this.type);
        break;

      case 'DEBUG':
        formatedType = chalk.magenta(this.type);
        break;

      case 'SILLY':
        formatedType = chalk.gray(this.type);
        break;

      default:
        formatedType = this.type;
        break;
    }

    return formatedType.concat(':');

  }
}
