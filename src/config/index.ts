import { IAppConfiguration } from './config.types';

import { join, resolve } from 'path';
import { config as dotenvConfig } from 'dotenv';

export class ConfigFactory {
  public static config: IAppConfiguration = null;
}
//  retrieve env file only for dev purpose
const importEnvironmentVariables = () => {
  const { npm_config_region, npm_config_env } = process.env;

  const region = npm_config_region ? npm_config_region + '.' : '';
  const env = npm_config_env || 'production';

  const envFileName = `${region}${env}.env`;
  const envFileDirectory = __dirname + '/../env';

  dotenvConfig({
    path: join(envFileDirectory, envFileName),
  });
};

const getConfig = (): IAppConfiguration => {
  if (ConfigFactory.config === null) {
    importEnvironmentVariables();
    ConfigFactory.config = {
      nodeEnv: process.env.NODE_ENV || 'production',

      logConfig: {
        logLevel: process.env.LOG_LEVEL || 'info',
        prettify: process.env.LOG_PRETTIFY === 'true',
      },
    };
  }
  return ConfigFactory.config;
};

export const appConfig = getConfig();
