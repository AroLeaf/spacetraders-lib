import { Client } from '..';

export class Waypoint {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}

export default Waypoint;