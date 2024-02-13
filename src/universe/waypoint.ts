import { ApiTypes, Universe } from '..';

export type WaypointData =
  & Partial<ApiTypes.Waypoint> 
  & Partial<ApiTypes.ScannedWaypoint> 
  & ApiTypes.ShipNavRouteWaypoint;

export class Waypoint {
  universe            : Universe;
  symbol              : string;
  type                : ApiTypes.WaypointType;
  x                   : number;
  y                   : number;
  orbitals?           : ApiTypes.WaypointOrbital[];   // TODO: change to better thing
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
    this.orbitals            = data.orbitals;
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

  patch(data: Partial<WaypointData>) {
    if (data.orbitals) this.orbitals = data.orbitals;
    if (data.orbits) this.orbits = data.orbits;
    if (data.faction) this.factionSymbol = data.faction.symbol;
    if (data.traits) this.traits = data.traits;
    if (data.modifiers) this.modifiers = data.modifiers;
    if (data.chart) this.chart = data.chart;
    if (data.isUnderConstruction) this.isUnderConstruction = data.isUnderConstruction;
  }
}

export default Waypoint;