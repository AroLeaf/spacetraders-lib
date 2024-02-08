import { ApiTypes, Client } from '..';

export class Ship {
  client: Client;
  symbol: string;

  constructor(client: Client, data: ApiTypes.Ship) {
    this.client = client;
    this.symbol = data.symbol;
  }
}

export default Ship;