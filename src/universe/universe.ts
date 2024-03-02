import { Agent, Client  } from '../client';
import { ApiTypes } from '../api';
import { Faction, FactionData } from './faction';
import { Waypoint, WaypointData } from './waypoint';
import { System } from './system';

export class Universe {
  client: Client;
  agents: Map<string, Agent>;
  factions: Map<string, Faction>;
  systems: Map<string, System>;
  waypoints: Map<string, Waypoint>;

  constructor(client: Client) {
    this.client = client;
    this.systems = new Map();
    this.factions = new Map();
    this.agents = new Map();
    this.waypoints = new Map();
  }

  addAgent(data: ApiTypes.Agent): Agent {
    const existing = this.agents.get(data.symbol)?.patch(data);
    const agent = existing || new Agent(this.client, data);
    if (!existing) this.agents.set(agent.symbol, agent);
    return agent;
  }

  async getAgents(): Promise<Agent[]> {
    const agents = await this.client.rest.paginated.getAgents();
    return agents.map(agent => this.addAgent(agent));
  }

  async getAgent(symbol: string, force = false): Promise<Agent> {
    const existing = this.agents.get(symbol);
    if (existing && !force) return existing;
    return this.addAgent(await this.client.rest.getAgent(symbol));
  }

  addFaction(data: FactionData): Faction {
    const existing = this.factions.get(data.symbol)?.patch(data);
    const faction = existing || new Faction(this, data);
    if (!existing) this.factions.set(faction.symbol, faction);
    return faction;
  }

  async getFactions(): Promise<Faction[]> {
    const factions = await this.client.rest.paginated.getFactions();
    return factions.map(faction => this.addFaction(faction));
  }

  async getFaction(symbol: ApiTypes.FactionSymbol, force = false): Promise<Faction> {
    const existing = this.factions.get(symbol);
    if (existing && !force) return existing;
    return this.addFaction(await this.client.rest.getFaction(symbol));
  }

  addSystem(data: ApiTypes.System): System {
    const existing = this.systems.get(data.symbol);
    const system = existing || new System(this, data);
    if (!existing) this.systems.set(system.symbol, system);
    return system;
  }

  async getSystems(): Promise<System[]> {
    const systems = await this.client.rest.paginated.getSystems();
    return systems.map(system => this.addSystem(system));
  }

  async getSystem(symbol: string, force = false): Promise<System> {
    const existing = this.systems.get(symbol);
    if (existing && !force) return existing;
    return this.addSystem(await this.client.rest.getSystem(symbol));
  }

  addWaypoint(data: WaypointData): Waypoint {
    const existing = this.waypoints.get(data.symbol)?.patch(data);
    const waypoint = existing || new Waypoint(this, data);
    if (!existing) this.waypoints.set(waypoint.symbol, waypoint);
    return waypoint;
  }

  async getWaypoints(systemSymbol: string): Promise<Waypoint[]> {
    const waypoints = await this.client.rest.paginated.getSystemWaypoints(systemSymbol);
    return waypoints.map(waypoint => this.addWaypoint(waypoint));
  }

  async getWaypoint(symbol: string, force = false): Promise<Waypoint> {
    const systemSymbol = symbol.split(/-(?!.*-)/)[0];
    const existing = this.waypoints.get(symbol);
    if (existing && !force) return existing;
    return this.addWaypoint(await this.client.rest.getWaypoint(systemSymbol, symbol));
  }
}

export default Universe;