import { ApiTypes } from '../api';
import { Universe } from './universe';

export type WaypointData =
  & Partial<ApiTypes.Waypoint> 
  & Partial<ApiTypes.SystemWaypoint> 
  & ApiTypes.ShipNavRouteWaypoint;

export class Waypoint {
  universe            : Universe;
  symbol              : string;
  type                : ApiTypes.WaypointType;
  x                   : number;
  y                   : number;
  systemSymbol?       : string;
  orbitals?           : string[];
  orbits?             : string;
  factionSymbol?      : string;
  traits?             : ApiTypes.WaypointTrait[];
  modifiers?          : ApiTypes.WaypointModifier[];
  chart?              : ApiTypes.Chart;
  isUnderConstruction?: boolean;

  constructor(universe: Universe, data: WaypointData) {
    this.universe            = universe;
    this.symbol              = data.symbol;
    this.type                = data.type;
    this.x                   = data.x;
    this.y                   = data.y;
    this.systemSymbol        = data.systemSymbol;
    this.orbitals            = data.orbitals?.map(orbital => orbital.symbol);
    this.orbits              = data.orbits;
    this.factionSymbol       = data.faction?.symbol;
    this.traits              = data.traits;
    this.modifiers           = data.modifiers;
    this.chart               = data.chart;
    this.isUnderConstruction = data.isUnderConstruction;
  }

  get client() {
    return this.universe.client;
  }

  get system() {
    return this.systemSymbol ? this.universe.systems.get(this.systemSymbol) : undefined;
  }

  get faction() {
    return this.factionSymbol ? this.universe.factions.get(this.factionSymbol) : undefined;
  }

  patch(data: Partial<WaypointData>): this {
    if (data.orbitals) this.orbitals = data.orbitals?.map(orbital => orbital.symbol);
    if (data.orbits) this.orbits = data.orbits;
    if (data.faction) this.factionSymbol = data.faction.symbol;
    if (data.traits) this.traits = data.traits;
    if (data.modifiers) this.modifiers = data.modifiers;
    if (data.chart) this.chart = data.chart;
    if (data.isUnderConstruction) this.isUnderConstruction = data.isUnderConstruction;
    return this;
  }
}

export default Waypoint;