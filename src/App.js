import { Client } from 'boardgame.io/react';
import React from "react";
import { SocketIO } from 'boardgame.io/multiplayer';
import { TicTacToe } from './Game';
import { TicTacToeBoard } from './Board';

const TicTacToeClient = Client({
  game: TicTacToe,
  numPlayers: 2,
  board: TicTacToeBoard,
  // multiplayer: Local(),
  multiplayer: SocketIO({ server: 'https://oodanuki.hopto.org:9999' }),
  debug: {
    collapseOnLoad: true
  }
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div className='w-full'>
          <p>Play as</p>
          <button className='p-2 shadow' onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button className='p-2 shadow' onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      )
    }
    return (
      <div className='flex flex-col justify-around h-full'>
        <TicTacToeClient playerID={this.state.playerID} />
      </div>
    )

  }
}


export default App;
