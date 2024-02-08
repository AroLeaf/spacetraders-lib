import { Client } from '..';

export class Universe {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}

export default Universe;