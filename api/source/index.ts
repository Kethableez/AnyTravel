import AttractionController from './resources/attraction/attractionController';
import FileController from './resources/file/fileController';
import GroupController from './resources/group/groupController';
import UserController from './resources/user/userController';
import Server from './server';
import config from './config/config';

const server = new Server(
  [new UserController(), new GroupController(), new FileController(), new AttractionController()],
  Number(config.server.port)
);

server.listen();
