import Battle, { PVE, PVP } from './Battle';
import Character from './Character';
import Dragon from './Dragon';
import Monster from './Monster';

const player1 = new Character('Ciri');
const player2 = new Character('Yennefer');
const player3 = new Character('Geralt');

for (let i = 0, len = 5; i < len; i += 1) {
  player1.levelUp();
}
// ------------------------------------------ //

const monster1 = new Monster();
const monster2 = new Dragon();
// ------------------------------------------ //

const pvp = new PVP(player2, player3);
const pve = new PVE(player1, [monster1, monster2]);
// ------------------------------------------ //

function runBattles(battles: Battle[]) {
  for (let b = 0; b < battles.length; b += 1) {
    battles[b].fight();
  }
}
// ------------------------------------------ //

export { 
  player1, 
  player2, 
  player3, 
  monster1, 
  monster2,
  pvp,
  pve,
  runBattles,
};
