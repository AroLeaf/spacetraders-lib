import { Route } from './route';
import { ApiTypes } from '../api';
import { Ship } from './ship';

export class Navigation {
  ship          : Ship;
  systemSymbol  : string;
  waypointSymbol: string;
  route         : Route;
  status        : ApiTypes.ShipNavStatus;
  flightMode    : ApiTypes.ShipNavFlightMode;
  
  constructor(ship: Ship, data: ApiTypes.ShipNav) {
    this.ship           = ship;
    this.systemSymbol   = data.systemSymbol;
    this.waypointSymbol = data.waypointSymbol;
    this.route          = new Route(this.ship, data.route);
    this.status         = data.status;
    this.flightMode     = data.flightMode;
  }

  get client() {
    return this.ship.client;
  }

  get system() {
    return this.client.universe.systems.get(this.systemSymbol);
  }
  
  get waypoint() {
    return this.client.universe.waypoints.get(this.waypointSymbol);
  }

  patch(data: Partial<ApiTypes.ShipNav>) {
    if (data.systemSymbol) this.systemSymbol = data.systemSymbol;
    if (data.waypointSymbol) this.waypointSymbol = data.waypointSymbol;
    if (data.route) this.route = new Route(this.ship, data.route);
    if (data.status) this.status = data.status;
    if (data.flightMode) this.flightMode = data.flightMode;
  }
}