let teamBalances = { yellow: 5000, blue: 5000, green: 5000 };
let teamBids = { yellow: 0, blue: 0, green: 0 };
let bidPool = 0;

export function getGameState() {
  return { teamBalances, teamBids, bidPool };
}

export function updateBids(newBids) {
  for (const team in newBids) {
    const bid = newBids[team];
    const currentBalance = teamBalances[team];
    const currentBid = teamBids[team];
    const maxPossibleBid = currentBalance + currentBid;

    if (bid <= maxPossibleBid) {
      const bidDifference = bid - currentBid;
      teamBids[team] = bid;
      teamBalances[team] = Math.max(0, currentBalance - bidDifference);
      bidPool += bidDifference;
    }
  }
  emitUpdate();
}

export function declareWinner(winner) {
  if (winner !== "none") {
    teamBalances[winner] += bidPool;
    bidPool = 0;
  }
  teamBids = { yellow: 0, blue: 0, green: 0 };
  emitUpdate();
}

export function resetGame() {
  teamBalances = { yellow: 5000, blue: 5000, green: 5000 };
  teamBids = { yellow: 0, blue: 0, green: 0 };
  bidPool = 0;
  emitUpdate();
}

let ioInstance;

export function io(io) {
  ioInstance = io;
}

function emitUpdate() {
  if (ioInstance) {
    ioInstance.emit("updateScoreboard", getGameState());
  }
}
