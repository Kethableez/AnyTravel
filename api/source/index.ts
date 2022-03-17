import FileController from './resources/file/fileController';
import GroupController from './resources/group/groupController';
import UserController from './resources/user/userController';
import Server from './server';

const server = new Server(
  [new UserController(), new GroupController(), new FileController()],
  Number(process.env.SERVER_PORT)
);

server.listen();
