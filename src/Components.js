import { useState } from 'react';

export const CoinBox = ({ coins, drawWinner }) => {
  return (
    <div className='flex flex-row justify-around px-48 w-full text-xl text-center'>
      <div>COINS: {coins}</div>
      {drawWinner ? <div>Player {drawWinner} will win draws</div> : <div></div>}
    </div>
  )
}


export const BidBox = ({ stageName, moves, ctx, coins, G, playerID }) => {
  let ele = (<div>ERROR</div>)
  if (ctx.gameover) ele = GameResult({ result: ctx.gameover })
  else {
    switch (stageName) {
      case undefined:
        ele = OpponentTurn
        break;
      case 'placeBid':
        ele = PlaceBidForm({
          limit: coins,
          drawWinner: G.drawWinner,
          moves: {
            placeBid: moves.placeBid
          }
        })
        break;
      case 'answerBid':
        ele = RespondBidBox({
          currentBid: ctx.lastBid,
          coins,
          moves: {
            forfait: moves.refuseBid,
            accept: moves.acceptBid,
          },
        })
        break;
      case 'playing':
        ele = YourTurn
        break;
      default:
        ele = (<div>ERROR</div>)
        break;
    }

  }
  return ele
}

const PlaceBidForm = ({ limit, moves, drawWinner }) => {
  const [bid, setBid] = useState(0);

  function handleChange(ev) {
    setBid(parseInt(ev.target.value))
  }

  function handleInvalid(e) {
    e.preventDefault()
    alert(e.target.validationMessage)
  }

  function confirmBid(e) {
    e.preventDefault()
    moves.placeBid(bid)
  }

  return (
    <form onSubmit={confirmBid}>
      <div className="flex flex-col justify-around items-center w-60 h-full shadow" >
        {drawWinner ? '' : 'Place bid for draw winner'}
        <label htmlFor="bidAmount">Bid Amount</label>
        <input type="number" min="0" max={limit} step="1" required value={bid} onChange={handleChange} onInvalid={handleInvalid} id="bidAmount"></input>
        <button type="submit">Confirm</button>
      </div>
    </form>
  )
}

const RespondBidBox = ({ currentBid, moves, coins }) => {
  function handleAccept(e) {
    e.preventDefault()
    moves.accept()
  }
  function handleForfait(e) {
    e.preventDefault()
    moves.forfait()
  }
  return (
    <div className="flex flex-col justify-around items-center w-60 h-full shadow">
      <div>Bid: {currentBid}</div>
      <button className="w-28 enabled:shadow disabled:text-slate-200" onClick={handleAccept} disabled={coins < currentBid}>Pay Bid</button>
      <button className="w-28 shadow" onClick={handleForfait}>Forfait Turn</button>
    </div>
  )
}

const OpponentTurn = (
  <div className="flex flex-col justify-around items-center w-60 h-full shadow">
    <div>Opponent's Turn!</div>
  </div>
)

const YourTurn = (
  <div className="flex flex-col justify-around items-center w-60 h-full shadow">
    <div>Your Turn!</div>
  </div>
)

const GameResult = ({ result }) => {
  return (
    <div className="flex flex-col justify-around items-center w-60 h-full shadow" >
      <div className="text-xl">Player {result.winner} wins</div>
    </div>
  )
}
