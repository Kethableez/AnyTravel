import Server from './s';

const server = new Server(Number(process.env.SERVER_PORT));

server.listen();
