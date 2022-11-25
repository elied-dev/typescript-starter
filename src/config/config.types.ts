export interface IAppConfiguration {
  nodeEnv: string;

  logConfig: ILoggingConfiguration;
}

export interface ILoggingConfiguration {
  logLevel: string;
  prettify: boolean;
}
