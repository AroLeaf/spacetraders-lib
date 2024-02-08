import { Client } from '..';

export class System {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}

export default System;