import { ApiTypes, Ship } from '..';

export class Route {
  ship              : Ship;
  destinationSymbol : string;
  originSymbol      : string;
  departureTimestamp: number;
  arrivalTimestamp  : number;

  constructor(ship: Ship, data: ApiTypes.ShipNavRoute) {
    this.ship               = ship;
    this.destinationSymbol  = this.client.universe.addWaypoint(data.destination).symbol;
    this.originSymbol       = this.client.universe.addWaypoint(data.origin).symbol;
    this.departureTimestamp = new Date(data.departureTime).getTime();
    this.arrivalTimestamp   = new Date(data.arrival).getTime();
  }

  get client() {
    return this.ship.client;
  }

  get destination() {
    return this.client.universe.waypoints.get(this.destinationSymbol);
  }

  get origin() {
    return this.client.universe.waypoints.get(this.originSymbol);
  }

  get departure() {
    return new Date(this.departureTimestamp);
  }

  get arrival() {
    return new Date(this.arrivalTimestamp);
  }
}