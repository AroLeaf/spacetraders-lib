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

  setAgent(data: ApiTypes.Agent): Agent {
    return this.agent = this.agent?.patch(data) || new Agent(this, data);
  }

  async getAgent(): Promise<Agent> {
    const agent = new Agent(this, await this.rest.getMyAgent());
    this.agent = agent;
    return agent;
  }

  addContract(data: ApiTypes.Contract): Contract {
    const existing = this.contracts.get(data.id);
    const contract = existing || new Contract(this, data);
    if (existing) contract.patch(data);
    else this.contracts.set(contract.id, contract);
    return contract;
  }

  async getContracts(): Promise<Contract[]> {
    const contracts = await this.rest.paginated.getContracts();
    return contracts.map(contract => this.addContract(contract));
  }

  async getContract(id: string, force = false): Promise<Contract> {
    const existing = this.contracts.get(id);
    if (existing && !force) return existing;
    return this.addContract(await this.rest.getContract(id));
  }
}

export default Client;