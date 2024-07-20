import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { TicTacToe } from './Game';
import { TicTacToeBoard } from './Board';

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: Local(),
});

const App = () => (
  <div className='h-full flex flex-col justify-around'>
    <TicTacToeClient playerID="0" />
    <TicTacToeClient playerID="1" />
  </div>
)


export default App;