import { useState } from 'react';

export const CoinBox = ({ coins }) => {
  return (<div>COINS {coins}</div>)
}

export const BidBox = ({ stageName, moves, ctx }) => {
  let ele = (<div>ERROR</div>)
  switch (stageName) {
    case undefined:
      ele = OpponentTurn
      break;
    case 'placeBid':
      ele = PlaceBidForm(moves.placeBid)
      break;
    case 'answerBid':
      ele = RespondBidBox({
        currentBid: ctx.lastBid,
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

const PlaceBidForm = (fPlaceBid) => {
  const [bid, setBid] = useState(0);

  function handleChange(ev) {
    setBid(ev.target.value)
  }

  function handleInvalid(e) {
    e.preventDefault()
    alert(e.target.validationMessage)
  }

  function confirmBid(e) {
    e.preventDefault()
    fPlaceBid(bid)
  }

  return (
    <form onSubmit={confirmBid}>
      <div className="flex flex-col justify-around items-center w-60 h-full shadow" >
        <label htmlFor="bidAmount">Bid Amount</label>
        <input type="number" min="0" max="10" step="1" required value={bid} onChange={handleChange} onInvalid={handleInvalid} id="bidAmount"></input>
        <button type="submit">Confirm</button>
      </div>
    </form>
  )
}

const RespondBidBox = ({ currentBid, moves }) => {
  function handleAccept() {
    moves.accept()
  }
  function handleForfait() {
    moves.forfait()
  }
  return (
    <div className="flex flex-col justify-around items-center w-60 h-full shadow">
      <div>Bid: {currentBid}</div>
      <button className="bg-gray-50 shadow" onClick={handleAccept}>Pay Bid</button>
      <button className="bg-gray-50 shadow" onClick={handleForfait}>Forfait Turn</button>
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
