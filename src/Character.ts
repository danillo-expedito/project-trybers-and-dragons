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

  get race(): Race { return this._race; }
  get archetype(): Archetype { return this._archetype; }
  get lifePoints() { return this._lifePoints; }
  get strength(): number { return this._strength; }
  get defense(): number { return this._defense; }
  get dexterity(): number { return this._dexterity; }
  get energy(): Energy { return { ...this._energy }; }

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

  levelUp(): void {
    this._dexterity += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;
    this.maxLifePoints += getRandomInt(1, 10);

    if (this.maxLifePoints > this.race.maxLifePoints) {
      this.maxLifePoints = this.race.maxLifePoints;
    }

    this._lifePoints = this.maxLifePoints;
  }

  special(): void {
    if (this._energy.amount >= 5) {
      this._energy.amount -= 5;
      this._strength += 5;
    }
  }
}

// const Herald = new Character('Herald');
// const Sona = new Character('Sona', new Dwarf('Sona', 5), new Warrior('Sona'));
// console.log(Herald.race());
// console.log(Herald.archetype());
// console.log(Herald.maxLifePoints);
// console.log(Herald.lifePoints);
// console.log(Herald.strength);
// console.log(Herald.defense);
// console.log(Herald.dexterity());
// console.log(Herald.energy);
// console.log('--------------');
// console.log(Sona.race());
// console.log(Sona.archetype());
// console.log(Sona.maxLifePoints);
// console.log(Sona.lifePoints);
// console.log(Sona.strength);
// console.log(Sona.defense);
// console.log(Sona.dexterity());
// console.log(Sona.energy);
// console.log('-----------------');
// console.log(Herald.attack(Sona));
// console.log(Sona.attack(Herald));
// console.log(Herald.lifePoints);
// console.log(Sona.lifePoints);
// console.log('-----------------');
// console.log(Sona.levelUp());
// console.log(Sona.maxLifePoints);
// console.log(Sona.lifePoints);
// console.log(Sona.strength);
// console.log(Sona.defense);

export default Character;