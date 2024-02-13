import { ApiTypes, Universe } from '..';

export type FactionData = Partial<ApiTypes.Faction> & ApiTypes.SystemFaction;

export class Faction {
  universe: Universe;
  symbol: string;

  constructor(universe: Universe, data: FactionData) {
    this.universe = universe;
    this.symbol = data.symbol;
  }

  get client() {
    return this.universe.client;
  }

  patch(data: Partial<FactionData>) {
    //
  }
}

export default Faction;