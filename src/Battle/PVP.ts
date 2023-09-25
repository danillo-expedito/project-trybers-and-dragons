import Fighter from '../Fighter';
import Battle from './Battle';

class PVP extends Battle {
  constructor(protected player: Fighter, protected enemy: Fighter) {
    super(player);
    super.fight();
  }
    
  playerTurn() {
    this.player.attack(this.enemy);
    if (this.enemy.lifePoints === -1) {
      return 1;
    }
  }

  enemyTurn() {
    this.enemy.attack(this.player);
    if (this.player.lifePoints === -1) {
      return -1;
    }
  }

  fight(): number {
    while (this.player.lifePoints > -1 && this.enemy.lifePoints > -1) {
      this.playerTurn();

      const playerLost = this.enemyTurn();
      if (playerLost) {
        return -1;
      }
    }

    return 1;
  }
}

export default PVP;