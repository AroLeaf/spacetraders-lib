import { Client  } from '../client';
import { ApiTypes } from '../api';
import { Faction, FactionData } from './faction';
import { Waypoint, WaypointData } from './waypoint';
import { System } from './system';

export class Universe {
  client: Client;
  systems: Map<string, System>;
  waypoints: Map<string, Waypoint>;
  factions: Map<string, Faction>;

  constructor(client: Client) {
    this.client = client;
    this.systems = new Map();
    this.waypoints = new Map();
    this.factions = new Map();
  }

  addSystem(data: ApiTypes.System): System {
    const exists = this.systems.get(data.symbol);
    const system = exists || new System(this, data);
    if (!exists) this.systems.set(system.symbol, system);
    return system;
  }

  addWaypoint(data: WaypointData): Waypoint {
    const exists = this.waypoints.get(data.symbol);
    const waypoint = exists || new Waypoint(this, data);
    if (exists) waypoint.patch(data);
    else this.waypoints.set(waypoint.symbol, waypoint);
    return waypoint;
  }

  addFaction(data: FactionData): Faction {
    const exists = this.factions.get(data.symbol);
    const faction = exists || new Faction(this, data);
    if (exists) faction.patch(data);
    else this.factions.set(faction.symbol, faction);
    return faction;
  }
}

export default Universe;