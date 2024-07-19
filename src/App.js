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
  <div>
    <div class="w-full bg-red-500 h-4"></div>
    <TicTacToeClient playerID="0" />
    <TicTacToeClient playerID="1" />
  </div>
)


export default App;