import { ApiTypes, Ship } from '..';

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
}

export default Crew;