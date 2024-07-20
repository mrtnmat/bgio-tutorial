import React from 'react';
import { BidBox, CoinBox } from './Components';

export function TicTacToeBoard({ ctx, G, moves, playerID }) {
    const onClick = (id) => moves.clickCell(id);

    let tbody = [];
    for (let i = 0; i < 3; i++) {
        let cells = [];
        for (let j = 0; j < 3; j++) {
            const id = 3 * i + j;
            cells.push(
                <td key={id} className='text-3xl'>
                    {G.cells[id] ? (
                        <div className='flex flex-col justify-center h-20 text-center border border-black aspect-square'>{G.cells[id]}</div>
                    ) : (
                        <button className='flex flex-col justify-center h-20 text-center border border-black aspect-square' onClick={() => onClick(id)} />
                    )}
                </td>
            );
        }
        tbody.push(<tr key={i}>{cells}</tr>);
    }

    const BiddingMenu = () => {
        if (ctx.activePlayers) {
            let ele = BidBox({
                stageName: ctx.activePlayers[playerID],
                coins: G.coins[playerID],
                ctx,
                moves,
                G,
                playerID,
            })
            return ele
        }
    }

    return (
        <div className='justify-around h-full'>
            <div className='m-8 h-40 text-xl'>
                <div className='text-center'>You are Player {ctx.playOrder[playerID]}!</div>
                <CoinBox coins={G.coins[playerID]} drawWinner={G.drawWinner} />
            </div>
            <div className='flex flex-row justify-around w-full h-62'>
                <table id="board" >
                    <tbody>{tbody}</tbody>
                </table>
                <BiddingMenu />
            </div >
        </div>
    );
}
