import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
  };
};

const getMongoString = (configService: ConfigService) =>
  `mongodb+srv://${configService.get('MONGO_NAME')}:${configService.get(
    'MONGO_PASSWORD',
  )}@cluster0.9asww1r.mongodb.net/`;
