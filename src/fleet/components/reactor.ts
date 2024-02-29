import { ApiTypes } from '../../api';
import { Component } from './component';
import { Ship } from '..';

export class Reactor extends Component implements ApiTypes.ShipReactor {
  symbol     : 'REACTOR_SOLAR_I' | 'REACTOR_FUSION_I' | 'REACTOR_FISSION_I' | 'REACTOR_CHEMICAL_I' | 'REACTOR_ANTIMATTER_I';
  description: string;
  condition? : number;
  powerOutput: number;

  constructor(ship: Ship, data: ApiTypes.ShipReactor) {
    super(ship, data);
    this.symbol      = data.symbol;
    this.description = data.description;
    this.condition   = data.condition;
    this.powerOutput = data.powerOutput;
  }
}