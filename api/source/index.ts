import UserController from './resources/user/userController';
import Server from './server';

const server = new Server([new UserController()], Number(process.env.SERVER_PORT));

server.listen();
