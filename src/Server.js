const { Server, Origins } = require('boardgame.io/server');
const { TicTacToe } = require('./Game');

const server = Server({
  games: [TicTacToe],
  origins: ['https://mrtnmat.github.io', Origins.LOCALHOST],
});

server.run(9999);
