abstract class Race {
  public static racesInstances = 0;

  constructor(private _name: string, private _dexterity: number) {}

  name(): string {
    return this._name;
  }

  dexterity(): number {
    return this._dexterity;
  }

  abstract get maxLifePoints(): number;

  static createdRacesInstances(): number | string {
    throw new Error('Not implemented');
  }
}

export default Race;