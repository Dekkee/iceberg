import { config as developConfig } from './config/dev';
import { config as productionConfig } from './config/prod';

export = (env: string) => env === 'production' ? productionConfig : developConfig;
