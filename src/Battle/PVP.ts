import Fighter from '../Fighter';
import Battle from './Battle';

class PVP extends Battle {
  constructor(protected player: Fighter, protected enemy: Fighter) {
    super(player);
    super.fight();
  }
    
  fight(): number {
    while (true) {
      this.player.attack(this.enemy);

      if (this.enemy.lifePoints === -1) {
        return 1;
      }

      this.enemy.attack(this.player);

      if (this.player.lifePoints === -1) {
        return -1;
      }
    }
  }
}

export default PVP;