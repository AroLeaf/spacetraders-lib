import { ApiTypes, Cargo, Client, Crew, Engine, Frame, Module, Mount, Reactor } from '..';

export class Ship {
  client            : Client;
  symbol            : string;
  role              : ApiTypes.ShipRole;
  factionSymbol     : ApiTypes.FactionSymbol;
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

  patch(data: Partial<ApiTypes.Ship>) {
    if (data.frame)                 this.frame              = new Frame(this, data.frame);
    if (data.reactor)               this.reactor            = new Reactor(this, data.reactor);
    if (data.engine)                this.engine             = new Engine(this, data.engine);
    if (data.modules)               this.modules            = new Map(data.modules.map(module => [module.symbol, new Module(this, module)]));
    if (data.mounts)                this.mounts             = new Map(data.mounts.map(mount => [mount.symbol, new Mount(this, mount)]));
    if (data.fuel)                  this.fuel               = data.fuel;
    if (data.cooldown?.expiration)  this.cooldownTimestamp  = new Date(data.cooldown.expiration).getTime();
    if (data.cargo)                 this.cargo.patch(data.cargo);
    if (data.crew)                  this.crew.patch(data.crew);
  }
}

export default Ship;