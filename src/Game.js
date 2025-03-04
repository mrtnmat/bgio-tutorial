import { INVALID_MOVE } from 'boardgame.io/core';

export const TicTacToe = {
    setup: () => ({
        cells: Array(9).fill(null),
        coins: {
            '0': 10,
            '1': 10
        },
        lastBid: 0,
        drawWinner: undefined
    }),

    turn: {
        activePlayers: {
            currentPlayer: 'placeBid'
        },
        stages: {
            'playing': {
                moves: {
                    clickCell: ({ G, ctx, events, playerID }, id) => {
                        if (G.cells[id] !== null) return INVALID_MOVE
                        let player = ctx.playOrder[playerID]
                        G.cells[id] = player
                        events.endTurn({ next: player })
                    },
                }
            },
            'placeBid': {
                moves: {
                    placeBid: ({ ctx, events }, amount) => {

                        ctx.lastBid = amount
                        events.setActivePlayers({
                            others: 'answerBid',
                        })
                    }
                },
            },
            'answerBid': {
                moves: {
                    acceptBid: ({ G, ctx, playerID, events }) => {
                        let player = ctx.playOrder[playerID]
                        let otherPlayer = player === '0' ? '1' : '0'

                        if (ctx.lastBid > G.coins[player]) {
                            alert('not enough coins')
                            return INVALID_MOVE
                        }

                        G.coins[player] -= ctx.lastBid
                        G.coins[otherPlayer] += ctx.lastBid

                        if (!G.drawWinner) {
                            G.drawWinner = player
                            events.endTurn({ next: player })
                        }
                        else {
                            events.setActivePlayers({
                                others: 'playing',
                            })
                        }
                    },
                    refuseBid: ({ G, ctx, playerID, events }) => {
                        let player = ctx.playOrder[playerID]
                        let otherPlayer = player === '0' ? '1' : '0'

                        G.coins[player] += ctx.lastBid
                        G.coins[otherPlayer] -= ctx.lastBid

                        if (!G.drawWinner) {
                            G.drawWinner = otherPlayer
                            events.endTurn({ next: player })
                        }
                        else {
                            events.setActivePlayers({
                                currentPlayer: 'playing',
                            })
                        }
                    },
                },
            },
        }
    },

    endIf: ({ G, ctx }) => {
        if (IsVictory(G.cells)) {
            return { winner: ctx.currentPlayer }
        }
        if (IsDraw(G.cells)) {
            return { winner: G.drawWinner }
        }
    },
};

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
    const positions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    const isRowComplete = row => {
        const symbols = row.map(i => cells[i]);
        return symbols.every(i => i !== null && i === symbols[0]);
    };

    return positions.map(isRowComplete).some(i => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
    return cells.filter(c => c === null).length === 0;
}
