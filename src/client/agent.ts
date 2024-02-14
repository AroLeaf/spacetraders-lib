import { ApiTypes, Client } from '..';

export class Agent {
  client               : Client;
  accountId?           : string;
  symbol               : string;
  headquarterSymbol    : string;
  credits              : number;
  startingFactionSymbol: string;
  shipCount            : number;

  constructor(client: Client, data: ApiTypes.Agent) {
    this.client                = client;
    this.symbol                = data.symbol;
    this.headquarterSymbol     = data.headquarters;
    this.credits               = data.credits;
    this.startingFactionSymbol = data.startingFaction;
    this.shipCount             = data.shipCount;
  }

  get headquarters() {
    return this.headquarterSymbol ? this.client.universe.waypoints.get(this.headquarterSymbol) : undefined;
  }

  get startingFaction() {
    return this.startingFactionSymbol ? this.client.universe.factions.get(this.startingFactionSymbol) : undefined;
  }

  patch(data: Partial<ApiTypes.Agent>) {
    if (data.credits) this.credits = data.credits;
    if (data.shipCount) this.shipCount = data.shipCount;
  }
}

export default Agent;