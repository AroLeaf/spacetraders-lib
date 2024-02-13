import { ApiTypes, Universe } from '..';

export type WaypointData = Partial<ApiTypes.Waypoint> & ApiTypes.SystemWaypoint;

export class Waypoint {
  universe: Universe;
  symbol: string;
  type: ApiTypes.WaypointType;
  x: number;
  y: number;
  orbitals: ApiTypes.WaypointOrbital[]; // TODO: change to better thing
  orbits?: string;
  factionSymbol?: string;
  traits?: ApiTypes.WaypointTrait[];
  modifiers?: ApiTypes.WaypointModifier[];
  chart?: ApiTypes.Chart;
  isUnderConstruction?: boolean;

  constructor(universe: Universe, data: WaypointData) {
    this.universe = universe;
    this.symbol = data.symbol;
    this.type = data.type;
    this.x = data.x;
    this.y = data.y;
    this.orbitals = data.orbitals;
    this.orbits = data.orbits;
    this.factionSymbol = data.faction?.symbol;
    this.traits = data.traits;
    this.modifiers = data.modifiers;
    this.chart = data.chart;
    this.isUnderConstruction = data.isUnderConstruction;
  }

  get client() {
    return this.universe.client;
  }

  patch(data: Partial<WaypointData>) {
    //
  }
}

export default Waypoint;