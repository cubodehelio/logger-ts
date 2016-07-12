import Logger from "./lib/Logger";
import * as minimist from "minimist";
import * as path from "path";

let tofile: string;

let file = minimist(process.argv.slice(2))["tslogger-file"];

if (file) {

  tofile = path.resolve(process.cwd(), String(file));

}


export function logger () {

  return new Logger(tofile);

}

export {middleware} from "./lib/Middleware";
