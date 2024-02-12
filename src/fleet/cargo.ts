import { ApiTypes, Ship } from '..';

export class Cargo {
  ship: Ship;
  capacity: number;
  items: Map<string, ApiTypes.ShipCargoItem>;

  constructor(ship: Ship, data: ApiTypes.ShipCargo) {
    this.ship = ship;
    this.capacity = data.capacity;
    this.items = new Map(data.inventory.map(item => [item.symbol, item]));
  }

  get client() {
    return this.ship.client;
  }
}