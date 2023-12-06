const fs = require('fs');

const data = fs.readFileSync('d2', 'utf8').split('\n');
const games = data
  .map((x) => x.split(':'))
  .map((x) => {
    return {
      game: x[0].split(' ')[1],
      sets: x[1]
        .split(';')
        .map((x) => x.split(','))
        .map((x) => {
          const ca = x
            .map((r) => {
              const ra = r.trim();
              const va = ra.split(' ');
              return {
                [va[1]]: va[0],
              };
            })
            .reduce((a, c) => {
              return {
                ...a,
                ...c,
              };
            }, {});
          return ca;
        }),
    };
  });

const red = 12;
const blue = 14;
const green = 13;
const allowedGames = [];

for (const game of games) {
  let maxRed = 0;
  let maxBlue = 0;
  let maxGreen = 0;

  for (const set of game.sets) {
    if(set.red !== undefined)
      maxRed = Math.max(maxRed, set.red);
   
    if(set.blue !== undefined)
      maxBlue = Math.max(maxBlue, set.blue);
    
    if(set.green !== undefined)
      maxGreen = Math.max(maxGreen, set.green);
  }
game['allowed'] = {
  red: maxRed,
  blue: maxBlue,
  green: maxGreen,
}
console.log(game.allowed)
 allowedGames.push(maxRed * maxBlue*maxGreen);
}



console.log(allowedGames.reduce((a, c) => a + c, 0));
