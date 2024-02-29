import { ApiTypes } from '../../api';
import { Ship } from '..';

export interface ComponentData {
  symbol      : string;
  name        : string;
  description?: string;
  condition?  : number;
  requirements: ApiTypes.ShipRequirements;
}

export class Component implements ComponentData {
  ship        : Ship;
  symbol      : string;
  name        : string;
  description?: string;
  condition?  : number;
  requirements: ApiTypes.ShipRequirements;

  constructor(ship: Ship, data: ComponentData) {
    this.ship         = ship;
    this.symbol       = data.symbol;
    this.name         = data.name;
    this.description  = data.description;
    this.condition    = data.condition;
    this.requirements = data.requirements;
  }

  get client() {
    return this.ship.client;
  }
}