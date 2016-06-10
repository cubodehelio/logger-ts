import StdMessage from "./StdMessage";
import Middleware from "./Middleware";

/**
 * Declare the NodeJS standar outputs.
 */
type std = "out" | "err";

/**
 * Declare and exposes the Logger constructor.
 * 
 * @export
 * @class Logger
 */
export default class Logger {

  constructor() {
    
  }

  public error(...messages) {
    let message = new StdMessage("ERROR", ...messages);
    this.print(message);
  }

  public warn(...messages) {
    let message = new StdMessage("WARN", ...messages);
    this.print(message);
  }

  public info(...messages) {
    let message = new StdMessage("INFO", ...messages);
    this.print(message);
  }

  public log(...messages) {
    let message = new StdMessage("LOG", ...messages);
    this.print(message);
  }

  public debug(...messages) {
    let message = new StdMessage("DEBUG", ...messages);
    this.print(message);
  }

  public silly(...messages) {
    let message = new StdMessage("SILLY", ...messages);
    this.print(message);
  }

  /**
   * Set the console method that will be used to send the message out
   * and pass it to the print method
   * 
   * @private
   * @param {LoggerLevel} loggerLevel (description)
   * @param parameters rest parameters you want to log
   */
  private print(stdMessage: StdMessage) {
    let processStream = "std" + stdMessage.std;
    process[processStream].write(stdMessage.toString());
  }

  public err(...messages){
    return this.error(...messages);
  }

  public middleware(){
    
  }
}