import { ApiTypes } from '../api';
import { Ship } from './ship';

export class Crew implements ApiTypes.ShipCrew {
  ship: Ship;
  current : number;
  required: number;
  capacity: number;
  rotation: 'STRICT' | 'RELAXED';
  morale  : number;
  wages   : number;
  
  constructor(ship: Ship, data: ApiTypes.ShipCrew) {
    this.ship = ship;
    this.current  = data.current;
    this.required = data.required;
    this.capacity = data.capacity;
    this.rotation = data.rotation;
    this.morale   = data.morale;
    this.wages    = data.wages;
  }

  get client() {
    return this.ship.client;
  }

  patch(data: Partial<ApiTypes.ShipCrew>): this {
    if (data.current) this.current = data.current;
    if (data.required) this.required = data.required;
    if (data.capacity) this.capacity = data.capacity;
    if (data.rotation) this.rotation = data.rotation;
    if (data.morale) this.morale = data.morale;
    if (data.wages) this.wages = data.wages;
    return this;
  }
}

export default Crew;