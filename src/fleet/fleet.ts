import { Client } from '../client';
import { ApiTypes } from '../api';
import { Ship } from './ship';

export class Fleet {
  client: Client;
  ships : Map<string, Ship>;
  
  constructor(client: Client, ships?: Ship[]) {
    this.client = client;
    this.ships  = new Map(ships?.map(ship => [ship.symbol, ship]));
  }

  addShip(data: ApiTypes.Ship) {
    const existing = this.ships.get(data.symbol)?.patch(data);
    const ship = existing || new Ship(this.client, data);
    if (!existing) this.ships.set(ship.symbol, ship);
    return ship;
  }

  async getShips(): Promise<Ship[]> {
    const ships = await this.client.rest.paginated.getMyShips();
    return ships.map(ship => this.addShip(ship));
  }

  async getShip(symbol: string): Promise<Ship> {
    return this.addShip(await this.client.rest.getMyShip(symbol));
  }
}

export default Fleet;