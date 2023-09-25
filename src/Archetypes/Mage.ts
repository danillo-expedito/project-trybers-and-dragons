import { EnergyType } from '../Energy';
import Archetype from './Archetype';

class Mage extends Archetype {
  public static archetypeInstances = 0;
  private _energyType: EnergyType;

  constructor(name: string) {
    super(name);
    Mage.archetypeInstances += 1;
    this._energyType = 'mana';
  }

  static createdArchetypeInstances(): number {
    return Mage.archetypeInstances;
  }

  get energyType(): EnergyType {
    return this._energyType;
  }
}

export default Mage;