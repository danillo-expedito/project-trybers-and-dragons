import getRandomInt from './utils';
import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';

class Character implements Fighter {
  public name: string;
  private _archetype: Archetype;
  protected _strength: number;
  protected _defense: number;
  private _dexterity: number;
  private _race: Race;
  public maxLifePoints: number;
  protected _lifePoints: number;
  protected _energy: Energy;

  constructor(
    name: string, 
    race?: Race, 
    archetype?: Archetype, 
    energy?: Energy,
  ) {
    this.name = name;
    this._dexterity = getRandomInt(1, 10);
    this._race = race || new Elf(name, this._dexterity);
    this._archetype = archetype || new Mage(name);
    this.maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this.maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = energy || { 
      type_: this._archetype.energyType, amount: getRandomInt(1, 10) };
  }

  race(): Race {
    return this._race;
  }

  archetype(): Archetype {
    return this._archetype;
  }

  get lifePoints() {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy {
    return { ...this._energy };
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage <= 0) {
      this._lifePoints -= 1;
      return this._lifePoints;
    } 

    this._lifePoints -= damage;
    if (this._lifePoints < 0) this._lifePoints = -1;
    return this._lifePoints;
  }

  attack(enemy: SimpleFighter): void {
    const attackPoints = this._strength;
    enemy.receiveDamage(attackPoints);
  }

  levelUp() {
    this._dexterity += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;

    const lifePointsUpgrade = getRandomInt(1, 10);

    if (this._lifePoints < this._race.maxLifePoints) {
      this.maxLifePoints += lifePointsUpgrade;
      this._lifePoints += lifePointsUpgrade;
      if (this.maxLifePoints > this._race.maxLifePoints 
        || this._lifePoints > this._race.maxLifePoints) {
        this.maxLifePoints = this._race.maxLifePoints;
        this._lifePoints = this.maxLifePoints;
      }
    }
  }

  special(): void {
    if (this._energy.amount >= 5) {
      this._energy.amount -= 5;
      this._strength += 5;
    }
  }
}

// const BandaBision = new Character('BandaBision');
// const Loke = new Character('Loke', new Dwarf('Loke', 5), new Warrior('Loke'));
// console.log(BandaBision.race());
// console.log(BandaBision.archetype());
// console.log(BandaBision.maxLifePoints);
// console.log(BandaBision.lifePoints);
// console.log(BandaBision.strength);
// console.log(BandaBision.defense);
// console.log(BandaBision.dexterity());
// console.log(BandaBision.energy);
// console.log('--------------');
// console.log(Loke.race());
// console.log(Loke.archetype());
// console.log(Loke.maxLifePoints);
// console.log(Loke.lifePoints);
// console.log(Loke.strength);
// console.log(Loke.defense);
// console.log(Loke.dexterity());
// console.log(Loke.energy);
// console.log('-----------------');
// console.log(BandaBision.attack(Loke));
// console.log(Loke.attack(BandaBision));
// console.log(BandaBision.lifePoints);
// console.log(Loke.lifePoints);
// console.log('-----------------');
// console.log(Loke.levelUp());
// console.log(Loke.maxLifePoints);
// console.log(Loke.lifePoints);
// console.log(Loke.strength);
// console.log(Loke.defense);

export default Character;