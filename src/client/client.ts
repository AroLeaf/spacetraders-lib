import Logger from '@aroleaf/logs';
import { Agent } from './agent';
import { Contract } from './contract';
import { ApiTypes, REST } from '../api';
import { Fleet } from '../fleet';
import { Scheduler } from '../lib';
import { Universe } from '../universe';

export interface ClientOptions {
  token?: string;
}

export class Client {
  logger: Logger;
  rest: REST;
  scheduler: Scheduler;
  fleet: Fleet;
  universe: Universe;
  contracts: Map<string, Contract>;
  agent?: Agent;
  
  constructor(options: ClientOptions = {}) {
    this.logger = new Logger();
    this.rest = new REST(options.token);
    this.scheduler = new Scheduler();
    this.fleet = new Fleet(this);
    this.universe = new Universe(this);
    this.contracts = new Map();
  }

  async register(symbol: string, faction: ApiTypes.FactionSymbol, email?: string) {
    if (this.rest.token) throw new Error('Client already has an agent!');
    
    const res = await this.rest.register({ symbol, faction, email });
    this.logger.info(`Token: ${res.token}`);
    
    this.agent = new Agent(this, res.agent);
    this.contracts.set(res.contract.id, new Contract(this, res.contract));
    this.universe.addFaction(res.faction);
    this.fleet.addShip(res.ship);
   
    return this;
  }
}

export default Client;