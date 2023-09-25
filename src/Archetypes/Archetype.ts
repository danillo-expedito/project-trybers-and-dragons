import { EnergyType } from '../Energy';

abstract class Archetype {
  constructor(
    private _name: string,
    private _special: number = 0,
    private _cost: number = 0,
  ) {}

  name(): string {
    return this._name;
  }

  special(): number {
    return this._special;
  }

  cost(): number {
    return this._cost;
  }

  static createdArchtypesInstances(): number {
    throw new Error('Not implemented');
  }

  abstract get energyType(): EnergyType;
}

export default Archetype;