import { ApiTypes } from '../api';
import { Universe } from './universe';
import { Waypoint } from './waypoint';

export type FactionData = Partial<ApiTypes.Faction> & ApiTypes.SystemFaction;

export class Faction {
  universe          : Universe;
  symbol            : string;
  name?             : string;
  description?      : string;
  headquarterSymbol?: string;
  traits?           : ApiTypes.FactionTrait[];
  isRecruiting?     : boolean;

  constructor(universe: Universe, data: FactionData) {
    this.universe          = universe;
    this.symbol            = data.symbol;
    this.name              = data.name;
    this.description       = data.description;
    this.headquarterSymbol = data.headquarters;
    this.traits            = data.traits;
    this.isRecruiting      = data.isRecruiting;
  }

  get client() {
    return this.universe.client;
  }

  get headquarters(): Waypoint | undefined {
    return this.headquarterSymbol ? this.universe.waypoints.get(this.headquarterSymbol) : undefined;
  }

  patch(data: Partial<FactionData>): this {
    if (data.name) this.name = data.name;
    if (data.description) this.description = data.description;
    if (data.headquarters) this.headquarterSymbol = data.headquarters;
    if (data.traits) this.traits = data.traits;
    if (data.isRecruiting) this.isRecruiting = data.isRecruiting;
    return this;
  }
}

export default Faction;