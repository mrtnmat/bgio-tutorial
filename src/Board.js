import React from 'react';
import { BidBox, CoinBox } from './Components';

export function TicTacToeBoard({ ctx, G, moves, playerID }) {
    const onClick = (id) => moves.clickCell(id);

    let winner = '';
    if (ctx.gameover) {
        winner =
            ctx.gameover.winner !== undefined ? (
                <div id="winner">Winner: {ctx.gameover.winner}</div>
            ) : (
                <div id="winner">Draw!</div>
            );
    }


    let tbody = [];
    for (let i = 0; i < 3; i++) {
        let cells = [];
        for (let j = 0; j < 3; j++) {
            const id = 3 * i + j;
            cells.push(
                <td key={id}>
                    {G.cells[id] ? (
                        <div className='h-14 text-center border border-black aspect-square'>{G.cells[id]}</div>
                    ) : (
                        <button className='h-14 text-center bg-gray-50 border border-black aspect-square' onClick={() => onClick(id)} />
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
                ctx,
                moves,
            })
            return ele
        }
    }

    return (
        <div className='h-full'>
            <CoinBox coins={G.coins[playerID]} />
            <div className='flex flex-row w-full h-full'>
                <table id="board">
                    <tbody>{tbody}</tbody>
                </table>
                <BiddingMenu />
            </div >
            {winner}
        </div>
    );
}
