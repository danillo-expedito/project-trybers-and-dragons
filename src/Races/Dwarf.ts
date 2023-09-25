import Race from './Race';

class Dwarf extends Race {
  private _maxLifePoints: number;
  public static raceInstances = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLifePoints = 80;
    Dwarf.raceInstances += 1;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  static createdRacesInstances(): number {
    return Dwarf.raceInstances;
  }
}

export default Dwarf;