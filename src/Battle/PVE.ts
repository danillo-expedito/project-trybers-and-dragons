import Fighter, { SimpleFighter } from '../Fighter';
import Monster from '../Monster';
import Battle from './Battle';

class PVE extends Battle {
  constructor(
    protected player: Fighter, 
    protected enemies: SimpleFighter[] = [new Monster()],
  ) {
    super(player);
    super.fight();
  }

  playerTurn() {
    this.player.attack(this.enemies[0]);
    if (this.enemies[0].lifePoints === -1) {
      this.enemies.shift();
    }
  }

  enemiesTurn() {
    for (let i = 0; i < this.enemies.length; i += 1) {
      this.enemies[i].attack(this.player);
      if (this.player.lifePoints === -1) {
        return -1;
      }
    }
  }

  fight(): number {
    while (this.enemies.length > 0) {
      this.playerTurn();

      const playerLost = this.enemiesTurn();
      if (playerLost) {
        return -1;
      }
    }

    return 1;
  }
}

export default PVE;