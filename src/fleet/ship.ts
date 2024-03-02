import { Client, Contract } from '../client';
import { ApiTypes } from '../api';
import { Engine, Frame, Module, Mount, Reactor } from './components';
import { Crew } from './crew';
import { Cargo } from './cargo';
import { Navigation } from './navigation';

export class Ship {
  client            : Client;
  symbol            : string;
  role              : ApiTypes.ShipRole;
  factionSymbol     : ApiTypes.FactionSymbol;
  nav               : Navigation;
  crew              : Crew;
  frame             : Frame;
  reactor           : Reactor;
  engine            : Engine;
  modules           : Map<string, Module>;
  mounts            : Map<string, Mount>;
  cargo             : Cargo;
  fuel              : ApiTypes.ShipFuel;
  cooldownTimestamp?: number;

  constructor(client: Client, data: ApiTypes.Ship) {
    this.client            = client;
    this.symbol            = data.symbol;
    this.role              = data.registration.role;
    this.factionSymbol     = data.registration.factionSymbol as ApiTypes.FactionSymbol;
    this.nav               = new Navigation(this, data.nav);
    this.crew              = new Crew(this, data.crew);
    this.frame             = new Frame(this, data.frame);
    this.reactor           = new Reactor(this, data.reactor);
    this.engine            = new Engine(this, data.engine);
    this.modules           = new Map(data.modules.map(module => [module.symbol, new Module(this, module)]));
    this.mounts            = new Map(data.mounts.map(mount => [mount.symbol, new Mount(this, mount)]));
    this.cargo             = new Cargo(this, data.cargo);
    this.fuel              = data.fuel;
    this.cooldownTimestamp = data.cooldown.expiration ? new Date(data.cooldown.expiration).getTime() : undefined;
  }

  get cooldown() {
    return this.cooldownTimestamp ? new Date(this.cooldownTimestamp) : undefined;
  }

  patch(data: Partial<ApiTypes.Ship>): this {
    if (data.frame)                 this.frame              = new Frame(this, data.frame);
    if (data.reactor)               this.reactor            = new Reactor(this, data.reactor);
    if (data.engine)                this.engine             = new Engine(this, data.engine);
    if (data.modules)               this.modules            = new Map(data.modules.map(module => [module.symbol, new Module(this, module)]));
    if (data.mounts)                this.mounts             = new Map(data.mounts.map(mount => [mount.symbol, new Mount(this, mount)]));
    if (data.fuel)                  this.fuel               = data.fuel;
    if (data.cooldown?.expiration)  this.cooldownTimestamp  = new Date(data.cooldown.expiration).getTime();
    if (data.cargo)                 this.cargo.patch(data.cargo);
    if (data.crew)                  this.crew.patch(data.crew);
    if (data.nav)                   this.nav.patch(data.nav);
    return this;
  }

  async deliverContract(contract: Contract | string, tradeGood: { tradeSymbol: ApiTypes.TradeSymbol, units: number }) {
    const contractId = typeof contract === 'string' ? contract : contract.id;
    const { cargo, contract: contractData } = await this.client.rest.deliverContract(contractId, { ...tradeGood, shipSymbol: this.symbol });
    this.client.addContract(contractData);
    this.patch({ cargo });
  }

  async refine(produce: 'IRON' | 'COPPER' | 'SILVER' | 'GOLD' | 'ALUMINUM' | 'PLATINUM' | 'URANITE' | 'MERITIUM' | 'FUEL') {
    const { consumed, produced, ...ship } = await this.client.rest.shipRefine(this.symbol, { produce });
    this.patch(ship);
    return { consumed, produced };
  }

  async createChart() {
    const { chart, waypoint } = await this.client.rest.createChart(this.symbol);
    this.client.universe.addWaypoint(waypoint);
    return chart;
  }

  // TODO: manage surveys on client
  async createSurvey() {
    const { surveys, ...ship } = await this.client.rest.createSurvey(this.symbol);
    this.patch(ship);
    return surveys;
  }

  async extractResources(survey?: ApiTypes.Survey) {
    const { extraction, ...ship } = await (survey ? this.client.rest.extractResourcesWithSurvey(this.symbol, survey) : this.client.rest.extractResources(this.symbol));
    this.patch(ship);
    return extraction;
  }

  async siphonResources() {
    const { siphon, ...ship } = await this.client.rest.siphonResources(this.symbol);
    this.patch(ship);
    return siphon;
  }

  async scanSystems() {
    const { systems, ...ship } = await this.client.rest.createShipSystemScan(this.symbol);
    this.patch(ship);
    return systems;
  }

  async scanWaypoints() {
    const { waypoints, ...ship } = await this.client.rest.createShipWaypointScan(this.symbol);
    this.patch(ship);
    return waypoints;
  }

  async scanShips() {
    const { ships, ...ship } = await this.client.rest.createShipShipScan(this.symbol);
    this.patch(ship);
    return ships;
  }
}

export default Ship;