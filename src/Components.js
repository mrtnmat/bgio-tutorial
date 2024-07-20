import { useState } from 'react';

export const CoinBox = ({ coins }) => {
  return (<div>COINS {coins}</div>)
}

export const BidBox = ({ stageName, moves, ctx, coins }) => {
  let ele = (<div>ERROR</div>)
  switch (stageName) {
    case undefined:
      ele = OpponentTurn
      break;
    case 'placeBid':
      ele = PlaceBidForm({
        limit: coins,
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
  return ele
}

const PlaceBidForm = ({ limit, moves }) => {
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
      <button className="enabled:shadow disabled:text-slate-200" onClick={handleAccept} disabled={coins < currentBid}>Pay Bid</button>
      <button className="shadow" onClick={handleForfait}>Forfait Turn</button>
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
