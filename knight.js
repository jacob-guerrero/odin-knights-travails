const gameBoard = [
    [7,0], [7,1], [7,2], [7,3], [7,4], [7,5], [7,6], [7,7],
    [6,0], [6,1], [6,2], [6,3], [6,4], [6,5], [6,6], [6,7],
    [5,0], [5,1], [5,2], [5,3], [5,4], [5,5], [5,6], [5,7],
    [4,0], [4,1], [4,2], [4,3], [4,4], [4,5], [4,6], [4,7],
    [3,0], [3,1], [3,2], [3,3], [3,4], [3,5], [3,6], [3,7],
    [2,0], [2,1], [2,2], [2,3], [2,4], [2,5], [2,6], [2,7],
    [1,0], [1,1], [1,2], [1,3], [1,4], [1,5], [1,6], [1,7],
    [0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7],
];

const knight = {
  position: [0, 0],
};

const possibleMovesFrom = (position) => {
  const moves = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  const validMoves = moves
    .map((move) => [position[0] + move[0], position[1] + move[1]])
    .filter(
      (move) => move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8
    );

  return validMoves;
};

const knightTravailsBFS = (start, end) => {
  const queue = [];
  const visited = new Set();
  const prev = {};

  queue.push(start);
  visited.add(start.toString());
  prev[start.toString()] = null;

  while (queue.length > 0) {
    const current = queue.shift();

    if (current[0] === end[0] && current[1] === end[1]) {
      // Found the end position, reconstruct the path and return it
      const path = [];
      let at = end.toString();
      while (at !== null) {
        path.unshift(at.split(',').map(Number));
        at = prev[at];
      }
      return path;
    }

    const possibleMoves = possibleMovesFrom(current);
    for (const move of possibleMoves) {
      const moveString = move.toString();
      if (!visited.has(moveString)) {
        queue.push(move);
        visited.add(moveString);
        prev[moveString] = current.toString();
      }
    }
  }

  // If no path is found
  return null;
};
  
const start = [3, 3];
const end = [4, 3];
const shortestPath = knightTravailsBFS(start, end);
console.log(`You made it in ${shortestPath.length - 1} moves! Here´s your path: `);
shortestPath.forEach(path => {
  console.log(path);
});