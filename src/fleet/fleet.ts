import { Client, Ship } from '..';

export class Fleet {
  client: Client;
  ships: Map<string, Ship>;
  
  constructor(client: Client, ships?: Ship[]) {
    this.client = client;
    this.ships = new Map(ships?.map(ship => [ship.symbol, ship]));
  }
}

export default Fleet;