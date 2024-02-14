import { ApiTypes, Fleet, REST, Scheduler, Universe } from '..';
import Logger from '@aroleaf/logs';

export interface ClientOptions {
  token?: string;
}

export class Client {
  logger: Logger;
  rest: REST;
  scheduler: Scheduler;
  fleet: Fleet;
  universe: Universe;
  
  constructor(options: ClientOptions = {}) {
    this.logger = new Logger();
    this.rest = new REST(options.token);
    this.scheduler = new Scheduler();
    this.fleet = new Fleet(this);
    this.universe = new Universe(this);
  }

  async register(symbol: string, faction: ApiTypes.FactionSymbol, email?: string) {
    if (this.rest.token) throw new Error('Client already has an agent!');
    const { token } = await this.rest.register({ symbol, faction, email });
    this.logger.info(`Token: ${token}`);
    // TODO: process `res`
    return this;
  }
}

export default Client;