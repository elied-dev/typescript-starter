import pinoLogger, { Logger, LoggerOptions } from 'pino';
import { pinoLoggerOptions } from './logger.config';

type CustomPinoLoggerOptions = {
  service: string;
};
export class PinoLogger {
  private primaryLogger = pinoLogger(pinoLoggerOptions);
  public logger: Logger = null;
  private service: string = undefined;

  constructor(options: CustomPinoLoggerOptions = { service: undefined }) {
    this.service = options.service || undefined;
    this.logger = this.primaryLogger.child({
      service: this.service,
    });
    this.child = this.logger.child;
  }

  child = (
    bindings: pinoLogger.Bindings,
    options?: pinoLogger.ChildLoggerOptions,
  ): pinoLogger.Logger<LoggerOptions & pinoLogger.ChildLoggerOptions> => {
    return this.logger.child(bindings, options);
  };

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, { context: this.service }, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, { context: this.service }, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, { context: this.service }, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, { context: this.service }, ...optionalParams);
  }

  info(message: any, ...optionalParams: any[]) {
    this.logger.info(message, { context: this.service }, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.trace(message, { context: this.service }, ...optionalParams);
  }
}

export const AppLogger = new PinoLogger({ service: 'app' });
