import { ApiTypes, Component, Ship } from '../..';

export class Engine extends Component implements ApiTypes.ShipEngine {
  symbol     : 'ENGINE_IMPULSE_DRIVE_I' | 'ENGINE_ION_DRIVE_I' | 'ENGINE_ION_DRIVE_II' | 'ENGINE_HYPER_DRIVE_I';
  description: string;
  condition? : number;
  speed      : number;

  constructor(ship: Ship, data: ApiTypes.ShipEngine) {
    super(ship, data);
    this.symbol      = data.symbol;
    this.description = data.description;
    this.condition   = data.condition;
    this.speed       = data.speed;
  }
}