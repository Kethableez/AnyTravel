import AttractionController from './resources/attraction/attractionController';
import FileController from './resources/file/fileController';
import GroupController from './resources/group/groupController';
import UserController from './resources/user/userController';
import Server from './server';
import config from './config/config';
import AuthController from './resources/auth/authController';
import ConfigController from './resources/config/configController';
import JourneyController from './resources/journey/journeyController';
import GeneratorController from './resources/generator/generatorController';
import StatsController from './resources/stats/statsController';

const server = new Server(
  [
    new AuthController(),
    new UserController(),
    new GeneratorController(),
    new StatsController(),
    new GroupController(),
    new FileController(),
    new AttractionController(),
    new ConfigController(),
    new JourneyController()
  ],
  Number(config.server.port)
);

server.listen();
