import { ApiTypes, Client, Ship } from '..';

export class Fleet {
  client: Client;
  ships : Map<string, Ship>;
  
  constructor(client: Client, ships?: Ship[]) {
    this.client = client;
    this.ships  = new Map(ships?.map(ship => [ship.symbol, ship]));
  }

  addShip(data: ApiTypes.Ship) {
    const exists = this.ships.get(data.symbol);
    const ship = exists || new Ship(this.client, data);
    if (exists) ship.patch(data);
    else this.ships.set(ship.symbol, ship);
    return ship;
  }
}

export default Fleet;