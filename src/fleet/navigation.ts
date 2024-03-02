import { Route } from './route';
import { ApiTypes } from '../api';
import { Ship } from './ship';
import { Waypoint } from '../universe';

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

  patch(data: Partial<ApiTypes.ShipNav>): this {
    if (data.systemSymbol) this.systemSymbol = data.systemSymbol;
    if (data.waypointSymbol) this.waypointSymbol = data.waypointSymbol;
    if (data.route) this.route = new Route(this.ship, data.route);
    if (data.status) this.status = data.status;
    if (data.flightMode) this.flightMode = data.flightMode;
    return this;
  }

  async orbit() {
    this.patch(await this.client.rest.orbitShip(this.ship.symbol));
    return this;
  }
  
  async dock() {
    this.patch(await this.client.rest.dockShip(this.ship.symbol));
    return this;
  }

  async jump(waypoint: Waypoint | string) {
    const waypointSymbol = typeof waypoint === 'string' ? waypoint : waypoint.symbol;
    const { agent, transaction, ...ship } = await this.client.rest.jumpShip(this.ship.symbol, { waypointSymbol });
    this.ship.patch(ship);
    this.client.setAgent(agent);
    return transaction;
  }

  async navigate(waypoint: Waypoint | string) {
    const waypointSymbol = typeof waypoint === 'string' ? waypoint : waypoint.symbol;
    const ship = await this.client.rest.navigateShip(this.ship.symbol, { waypointSymbol });
    this.ship.patch(ship);
  }

  async warp(waypoint: Waypoint | string) {
    const waypointSymbol = typeof waypoint === 'string' ? waypoint : waypoint.symbol;
    this.ship.patch(await this.client.rest.warpShip(this.ship.symbol, { waypointSymbol }));
  }

  async setFlightMode(flightMode: ApiTypes.ShipNavFlightMode) {
    this.patch(await this.client.rest.patchShipNav(this.ship.symbol, { flightMode }));
  }
}