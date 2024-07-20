import { Client } from 'boardgame.io/react';
import { SocketIO, Local } from 'boardgame.io/multiplayer';
import { TicTacToe } from './Game';
import { TicTacToeBoard } from './Board';

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  // multiplayer: Local(),
  multiplayer: SocketIO({ server: 'localhost:9999' }),
  debug: {
    collapseOnLoad: true
  }
});

const App = () => (
  <div className='flex flex-col justify-around h-full'>
    <TicTacToeClient playerID="0" />
    <TicTacToeClient playerID="1" />
  </div>
)


export default App;
