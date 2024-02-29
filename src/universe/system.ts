import { ApiTypes } from '../api';
import { Universe } from './universe';

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
    this.waypointSymbols = data.waypoints.map(waypointData => this.universe.addWaypoint(Object.assign(waypointData, { systemSymbol: this.symbol })).symbol);
    this.factionSymbols = data.factions.map(factionData => this.universe.addFaction(factionData).symbol);
  }

  get client() {
    return this.universe.client;
  }

  get waypoints() {
    return this.waypointSymbols.map(symbol => this.client.universe.waypoints.get(symbol));
  }

  get factions() {
    return this.factionSymbols.map(symbol => this.client.universe.factions.get(symbol));
  }
}

export default System;