import {inspect} from "util";
import {basename} from "path";
import * as chalk from "chalk";

import {LogType, std, StackData} from "./types";

const isError = require("lodash.iserror");

function getStackData(stackOffset: number): StackData {
  stackOffset = stackOffset || 0;

  let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i,
    stackReg2 = /at\s+()(.*):(\d*):(\d*)/i,
    stacklist = (new Error()).stack.split("\n"),

    s = stacklist[stackOffset] || stacklist[0],
    sp = stackReg.exec(s) || stackReg2.exec(s)

  let data: StackData = {
    method: "",
    fullPath: "",
    path: "",
    line: 0,
    pos: 0,
    file: "",
    stack: [],
  }

  if (sp && sp.length === 5) {
    data.method = sp[1];
    data.fullPath = sp[2];
    data.path = sp[2].replace(process.cwd() + "/", "");
    data.line = parseInt(sp[3]);
    data.pos = parseInt(sp[4]);
    data.file = basename(data.path);
    data.stack = stacklist;
  }

  return data;
}


export default class StdMessage {

  public date: Date;
  public type: LogType;
  public messages: Array<any>;
  public errors: Array<any>;
  public std: std;
  public stackData: StackData;

  private lines = [];

  constructor(type: LogType, ...messages: Array<any>) {
    this.type = type;
    this.date = new Date();
    this.messages = messages;
    this.errors = messages.filter(isError);
    this.std = (type === "ERROR" || type === "WARN") ? "err" : "out";
    this.stackData = getStackData(4);

    if (this.type !== "INFO") {
      messages.push(`(\`${this.stackData.file}\` line:${this.stackData.line})`);
    }
  }

  public toString() {

    let strMsg = [];
    let message = "";
    let inspectDepth = 10;

    this.messages.forEach(msg => {

      if (isError(msg)) {
        msg = chalk.red(inspect(msg, { depth: inspectDepth }));
      }
      else {
        // avoid inspecting strings so we dont lose format
        msg = (typeof msg === "string") ? chalk.green(msg) : inspect(msg, { colors: chalk.supportsColor, depth: inspectDepth });
      }

      message = message.concat(msg).concat(" ");
    });

    message = message.concat("\n").replace(/'/g, "");

    if (this.errors.length) {
      this.errors.forEach(err => {
        message = message.concat(chalk.red(err.stack)).concat("\n");
      });
    }

    return `${this.date.toISOString()} ${this.formatedType()} ${message}`;
  }

  private formatedType() {

    let formatedType: string;

    switch (this.type) {
      case "ERROR":
        formatedType = chalk.red(this.type);
        break;

      case "WARN":
        formatedType = chalk.yellow(this.type);
        break;

      case "INFO":
        formatedType = chalk.blue(this.type);
        break;

      case "LOG":
        formatedType = chalk.cyan(this.type);
        break;

      case "DEBUG":
        formatedType = chalk.magenta(this.type);
        break;

      case "SILLY":
        formatedType = chalk.gray(this.type);
        break;

      default:
        formatedType = this.type
        break;
    }

    return formatedType.concat(":");

  }
}
