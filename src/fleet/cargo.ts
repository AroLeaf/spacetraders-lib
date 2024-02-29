import { ApiTypes } from '../api';
import { Ship } from './ship';

export class Cargo {
  ship    : Ship;
  capacity: number;
  items   : Map<string, ApiTypes.ShipCargoItem>;

  constructor(ship: Ship, data: ApiTypes.ShipCargo) {
    this.ship     = ship;
    this.capacity = data.capacity;
    this.items    = new Map(data.inventory.map(item => [item.symbol, item]));
  }

  get client() {
    return this.ship.client;
  }

  patch(data: Partial<ApiTypes.ShipCargo>) {
    if (data.capacity) this.capacity = data.capacity;
    if (data.inventory) this.items = new Map(data.inventory.map(item => [item.symbol, item])); // TODO: map patch
  }
}