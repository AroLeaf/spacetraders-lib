import { ApiTypes, Universe } from '..';

export class System {
  universe: Universe;
  symbol: string;
  sectorSymbol: string;
  type: ApiTypes.SystemType;
  x: number;
  y: number;
  waypointSymbols: string[];
  factionSymbols: string[];

  constructor(universe: Universe, data: ApiTypes.System) {
    this.universe = universe;
    this.symbol = data.symbol;
    this.sectorSymbol = data.sectorSymbol;
    this.type = data.type;
    this.x = data.x;
    this.y = data.y;
    this.waypointSymbols = data.waypoints.map(waypointData => this.universe.addWaypoint(waypointData).symbol);
    this.factionSymbols = data.factions.map(factionData => this.universe.addFaction(factionData).symbol);
  }

  get client() {
    return this.universe.client;
  }
}

export default System;