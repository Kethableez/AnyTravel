import GroupController from './resources/group/groupController';
import UserController from './resources/user/userController';
import Server from './server';

const server = new Server([new UserController(), new GroupController()], Number(process.env.SERVER_PORT));

server.listen();
