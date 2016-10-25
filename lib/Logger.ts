import { StdMessage} from './StdMessage';

/**
 * Declare and exposes the Logger constructor.
 *
 * @export
 * @class Logger
 */
export default class Logger {

  /**
   * Creates an instance of Logger.
   *
   *
   * @memberOf Logger
   */
  constructor() { }

  /**
   * sends a message to the standard error.
   *
   * @param {any} messages
   *
   * @memberOf Logger
   */
  public error(...messages): void {
    let message: StdMessage = new StdMessage('ERROR', ...messages);
    this.print(message);
  }

  /**
   * sends a message to the standard error.
   *
   * @param {any} messages
   *
   * @memberOf Logger
   */
  public warn(...messages): void {
    let message: StdMessage = new StdMessage('WARN', ...messages);
    this.print(message);
  }

  /**
   * sends a message to the standard output.
   *
   * @param {any} messages
   *
   * @memberOf Logger
   */
  public info(...messages): void {
    let message: StdMessage = new StdMessage('INFO', ...messages);
    this.print(message);
  }

  /**
   * sends a message to the standard output.
   *
   * @param {any} messages
   *
   * @memberOf Logger
   */
  public log(...messages): void {
    let message: StdMessage = new StdMessage('LOG', ...messages);
    this.print(message);
  }

  /**
   * sends a message to the standard output.
   *
   * @param {any} messages
   *
   * @memberOf Logger
   */
  public debug(...messages): void {
    let message: StdMessage = new StdMessage('DEBUG', ...messages);
    this.print(message);
  }

  /**
   * sends a message to the standard output.
   *
   * @param {any} messages
   *
   * @memberOf Logger
   */
  public silly(...messages): void {
    let message: StdMessage = new StdMessage('SILLY', ...messages);
    this.print(message);
  }

  /**
   * sends a message to the standard error.
   *
   * @param {any} messages
   * @returns {void}
   *
   * @memberOf Logger
   */
  public err(...messages): void {
    return this.error(...messages);
  }

  /**
   * sends a message to the standard error.
   *
   * @param {any} messages
   * @returns {void}
   *
   * @memberOf Logger
   */
  public warning(...messages): void {
    return this.warn(...messages);
  }

  /**
   * Write the final string to the process stdOut or stdErr.
   *
   * @private
   * @param {StdMessage} stdMessage
   *
   * @memberOf Logger
   */
  private print(stdMessage: StdMessage): void {
    process[stdMessage.getChannel()].write(stdMessage.toString());

  }

}
