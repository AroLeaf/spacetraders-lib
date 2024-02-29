import { ApiTypes } from '../../api';
import { Component } from './component';
import { Ship } from '..';

export class Frame extends Component implements ApiTypes.ShipFrame {
  symbol        : 'FRAME_PROBE' | 'FRAME_DRONE' | 'FRAME_INTERCEPTOR' | 'FRAME_RACER' | 'FRAME_FIGHTER' | 'FRAME_FRIGATE' | 'FRAME_SHUTTLE' | 'FRAME_EXPLORER' | 'FRAME_MINER' | 'FRAME_LIGHT_FREIGHTER' | 'FRAME_HEAVY_FREIGHTER' | 'FRAME_TRANSPORT' | 'FRAME_DESTROYER' | 'FRAME_CRUISER' | 'FRAME_CARRIER';
  description   : string;
  condition?    : number;
  moduleSlots   : number;
  mountingPoints: number;
  fuelCapacity  : number;

  constructor(ship: Ship, data: ApiTypes.ShipFrame) {
    super(ship, data);
    this.symbol         = data.symbol;
    this.description    = data.description;
    this.condition      = data.condition;
    this.moduleSlots    = data.moduleSlots;
    this.mountingPoints = data.mountingPoints;
    this.fuelCapacity   = data.fuelCapacity;
  }
}