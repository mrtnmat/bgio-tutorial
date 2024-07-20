import { useState } from 'react';

export const PlaceBidForm = (fPlaceBid) => {
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
    <form className="flex flex-col justify-around items-center w-60 h-full shadow" onSubmit={confirmBid}>
      <label htmlFor="bidAmount">Bid Amount</label>
      <input type="number" min="0" max="10" step="1" required value={bid} onChange={handleChange} onInvalid={handleInvalid} id="bidAmount"></input>
      <button type="submit">Confirm</button>
    </form>
  )
}

export const RespondBidBox = ({ currentBid, moves }) => {
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

export const OpponentTurn = (
  <div className="flex flex-col justify-around items-center w-60 h-full shadow">
    <div>Opponent's Turn!</div>
  </div>
)

export const YourTurn = (
  <div className="flex flex-col justify-around items-center w-60 h-full shadow">
    <div>Your Turn!</div>
  </div>
)
