import * as ApiTypes from './types';
import { Ratelimiter } from '../lib';
import { APIError, APIErrorData } from './apiError';

export interface RequestOptions {
  method?: string,
  body?: any,
  query?: Record<string, boolean | number | string | (boolean | number | string)[]>,
  headers?: Record<string, string>,
}

export class REST {
  #ratelimiter: Ratelimiter;
  baseUrl = 'https://api.spacetraders.io/v2';
  token?: string;

  constructor(token?: string) {
    this.token = token;
    this.#ratelimiter = new Ratelimiter([
      { count: 2, interval: 1000 },
      { count: 30, interval: 60000 },
    ]);
  }

  async request(path: string, options: RequestOptions = {}) {
    await this.#ratelimiter.queue();

    const queryString: string = options.query
      ? '?' + Object.entries(options.query)
        .flatMap(([k, v]) => Array.isArray(v) ? v.map(item => [k, item]) : [[k, v]])
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')
      : '';

    const res = await fetch(this.baseUrl + path + queryString, {
      method: options.method || (options.body ? 'POST' : 'GET'),
      ...options.body ? { body: JSON.stringify(options.body) } : {},
      headers: {
        ...options.headers || {},
        ...options.body ? { 'Content-Type': 'application/json' } : {},
        ...this.token ? { 'Authorization': `Bearer ${this.token}` } : {},
      },
    });

    if (res.status >= 400) {
      const data = await res.json().catch(() => ({
        error: {
          code: res.status,
          message: res.statusText,
        },
      }));
      throw new APIError(path, data.error as APIErrorData);
    }

    return res;
  }


  async getStatus(): Promise<{
    status: string,
    version: string,
    resetDate: string,
    description: string,
    stats: {
      agents: number,
      ships: number,
      systems: number,
      waypoints: number,
    },
    leaderboards: {
      mostCredits: [{
        agentSymbol: string,
        credits: number,
      }],
      mostSubmittedCharts: [{
        agentSymbol: string,
        chartCount: number,
      }],
    },
    serverResets: {
      next: string,
      frequency: string,
    },
    announcements: [{
      title: string,
      body: string,
    }],
    links: [{
      name: string,
      url: string,
    }],
  }> {
    const res = await this.request('/');
    return res.json();
  }

  async register(body: { faction: ApiTypes.FactionSymbol, symbol: string, email?: string }): Promise<{
    agent: ApiTypes.Agent,
    contract: ApiTypes.Contract,
    faction: ApiTypes.Faction,
    ship: ApiTypes.Ship,
    token: string,
  }> {
    const res = await this.request('/register', { body });
    const { data } = await res.json();
    this.token = data.token;
    return data;
  }


  // AGENTS

  async getMyAgent(): Promise<ApiTypes.Agent> {
    const res = await this.request('/my/agent');
    const { data } = await res.json();
    return data;
  }

  async getAgents({ limit = 20, page = 1 }: { limit?: number, page?: number } = {}): Promise<{ data: ApiTypes.Agent[], meta: ApiTypes.Meta }> {
    const res = await this.request('/agents', { query: { limit, page } });
    return res.json();
  }

  async getAgent(agentSymbol: string): Promise<ApiTypes.Agent> {
    const res = await this.request(`/agents/${agentSymbol}`);
    const { data } = await res.json();
    return data;
  }


  // CONTRACTS

  async getContracts({ limit = 20, page = 1 }: { limit?: number, page?: number } = {}): Promise<{ data: ApiTypes.Contract[], meta: ApiTypes.Meta }> {
    const res = await this.request('/my/contracts', { query: { limit, page } });
    return res.json();
  }

  async getContract(contractId: string): Promise<ApiTypes.Contract> {
    const res = await this.request(`/my/contracts/${contractId}`);
    const { data } = await res.json();
    return data;
  }

  async acceptContract(contractId: string): Promise<{ agent: ApiTypes.Agent, contract: ApiTypes.Contract }> {
    const res = await this.request(`/my/contracts/${contractId}/accept`, { method: 'POST' });
    const { data } = await res.json();
    return data;
  }

  async deliverContract(contractId: string, body: { shipSymbol: string, tradeSymbol: ApiTypes.TradeSymbol, units: number }): Promise<{ contract: ApiTypes.Contract, cargo: ApiTypes.ShipCargo }> {
    const res = await this.request(`/my/contracts/${contractId}/accept`, { body });
    const { data } = await res.json();
    return data;
  }

  async fulfillContract(contractId: string): Promise<{ agent: ApiTypes.Agent, contract: ApiTypes.Contract }> {
    const res = await this.request(`/my/contracts/${contractId}/fulfill`, { method: 'POST' });
    const { data } = await res.json();
    return data;
  }


  // FACTIONS

  async getFactions({ limit = 20, page = 1 }: { limit?: number, page?: number } = {}): Promise<{ data: ApiTypes.Faction[], meta: ApiTypes.Meta }> {
    const res = await this.request('/factions', { query: { limit, page } });
    return res.json();
  }

  async getFaction(factionSymbol: ApiTypes.FactionSymbol): Promise<ApiTypes.Faction> {
    const res = await this.request(`/factions/${factionSymbol}`);
    const { data } = await res.json();
    return data;
  }

  
  // FLEET

  async getMyShips({ limit = 20, page = 1 }: { limit?: number, page?: number } = {}): Promise<{ data: ApiTypes.Ship[], meta: ApiTypes.Meta }> {
    const res = await this.request('/my/ships', { query: { limit, page } });
    return res.json();
  }

  async purchaseShip(body: { shipType: ApiTypes.ShipType, waypointSymbol: string }): Promise<{ agent: ApiTypes.Agent, ship: ApiTypes.Ship, transaction: ApiTypes.ShipyardTransaction }> {
    const res = await this.request('/my/ships', { body });
    const { data } = await res.json();
    return data;
  }

  async getMyShip(shipSymbol: string): Promise<ApiTypes.Ship> {
    const res = await this.request(`/my/ships/${shipSymbol}`);
    const { data } = await res.json();
    return data;
  }

  async getMyShipCargo(shipSymbol: string): Promise<ApiTypes.ShipCargo> {
    const res = await this.request(`/my/ships/${shipSymbol}/cargo`);
    const { data } = await res.json();
    return data;
  }

  async orbitShip(shipSymbol: string): Promise<ApiTypes.ShipNav> {
    const res = await this.request(`/my/ships/${shipSymbol}/orbit`, { method: 'POST' });
    const { data } = await res.json();
    return data.nav;
  }

  async shipRefine(shipSymbol: string, body: { produce: 'IRON' | 'COPPER' | 'SILVER' | 'GOLD' | 'ALUMINUM' | 'PLATINUM' | 'URANITE' | 'MERITIUM' | 'FUEL' }): Promise<{
    cargo: ApiTypes.ShipCargo,
    cooldown: ApiTypes.Cooldown,
    produced: [{ tradeSymbol: string, units: number }],
    consumed: [{ tradeSymbol: string, units: number }],
  }> {
    const res = await this.request(`/my/ships/${shipSymbol}`, { body });
    const { data } = await res.json();
    return data;
  }

  async createChart(shipSymbol: string): Promise<{ chart: ApiTypes.Chart, waypoint: ApiTypes.Waypoint }> {
    const res = await this.request(`/my/ships/${shipSymbol}/chart`, { method: 'POST' });
    const { data } = await res.json();
    return data;
  }

  async getShipCooldown(shipSymbol: string): Promise<ApiTypes.ShipCargo> {
    const res = await this.request(`/my/ships/${shipSymbol}/cargo`);
    const { data } = await res.json();
    return data;
  }

  async dockShip(shipSymbol: string): Promise<ApiTypes.ShipNav> {
    const res = await this.request(`/my/ships/${shipSymbol}/dock`, { method: 'POST' });
    const { data } = await res.json();
    return data.nav;
  }

  async createSurvey(shipSymbol: string): Promise<{ cooldown: ApiTypes.Cooldown, surveys: ApiTypes.Survey[] }> {
    const res = await this.request(`/my/ships/${shipSymbol}/survey`, { method: 'POST' });
    const { data } = await res.json();
    return data;
  }

  async extractResources(shipSymbol: string): Promise<{ cooldown: ApiTypes.Cooldown, extraction: ApiTypes.Extraction, cargo: ApiTypes.ShipCargo }> {
    const res = await this.request(`/my/ships/${shipSymbol}/extract`, { method: 'POST' });
    const { data } = await res.json();
    return data;
  }

  async siphonResources(shipSymbol: string): Promise<{ cooldown: ApiTypes.Cooldown, siphon: ApiTypes.Siphon, cargo: ApiTypes.ShipCargo }> {
    const res = await this.request(`/my/ships/${shipSymbol}/siphon`, { method: 'POST' });
    const { data } = await res.json();
    return data;
  }

  async extractResourcesWithSurvey(shipSymbol: string, body: ApiTypes.Survey): Promise<{ cooldown: ApiTypes.Cooldown, extraction: ApiTypes.Extraction, cargo: ApiTypes.ShipCargo }> {
    const res = await this.request(`/my/ships/${shipSymbol}/extract/survey`, { body });
    const { data } = await res.json();
    return data;
  }

  async jettison(shipSymbol: string, body: { symbol: ApiTypes.TradeSymbol, units: number }): Promise<ApiTypes.ShipCargo> {
    const res = await this.request(`/my/ships/${shipSymbol}/jettison`, { body });
    const { data } = await res.json();
    return data.cargo;
  }

  async jumpShip(shipSymbol: string, body: { waypointSymbol: string }): Promise<{ nav: ApiTypes.ShipNav, cooldown: ApiTypes.Cooldown, transaction: ApiTypes.MarketTransaction, agent: ApiTypes.Agent }> {
    const res = await this.request(`/my/ships/${shipSymbol}/jump`, { body });
    const { data } = await res.json();
    return data;
  }

  async navigateShip(shipSymbol: string, body: { waypointSymbol: string }): Promise<{ fuel: ApiTypes.ShipFuel, nav: ApiTypes.ShipNav }> {
    const res = await this.request(`/my/ships/${shipSymbol}/navigate`, { body });
    const { data } = await res.json();
    return data;
  }

  async patchShipNav(shipSymbol: string, body: { flightMode?: ApiTypes.ShipNavFlightMode }): Promise<ApiTypes.ShipNav> {
    const res = await this.request(`/my/ships/${shipSymbol}/nav`, { method: 'PATCH', body });
    const { data } = await res.json();
    return data;
  }

  async getShipNav(shipSymbol: string): Promise<ApiTypes.ShipNav> {
    const res = await this.request(`/my/ships/${shipSymbol}/nav`);
    const { data } = await res.json();
    return data;
  }

  async warpShip(shipSymbol: string, body: { waypointSymbol: string }): Promise<{ fuel: ApiTypes.ShipFuel, nav: ApiTypes.ShipNav }> {
    const res = await this.request(`/my/ships/${shipSymbol}/warp`, { body });
    const { data } = await res.json();
    return data;
  }

  async sellCargo(shipSymbol: string, body: { symbol: ApiTypes.TradeSymbol, units: number }): Promise<{ agent: ApiTypes.Agent, cargo: ApiTypes.ShipCargo, transaction: ApiTypes.MarketTransaction }> {
    const res = await this.request(`/my/ships/${shipSymbol}/sell`, { body });
    const { data } = await res.json();
    return data;
  }

  async createShipSystemScan(shipSymbol: string): Promise<{ cooldown: ApiTypes.Cooldown, systems: ApiTypes.ScannedSystem[] }> {
    const res = await this.request(`/my/ships/${shipSymbol}/scan/systems`, { method: 'POST' });
    const { data } = await res.json();
    return data;
  }

  async createShipWaypointScan(shipSymbol: string): Promise<{ cooldown: ApiTypes.Cooldown, systems: ApiTypes.ScannedWaypoint[] }> {
    const res = await this.request(`/my/ships/${shipSymbol}/scan/waypoints`, { method: 'POST' });
    const { data } = await res.json();
    return data;
  }

  async createShipShipScan(shipSymbol: string): Promise<{ cooldown: ApiTypes.Cooldown, systems: ApiTypes.ScannedShip[] }> {
    const res = await this.request(`/my/ships/${shipSymbol}/scan/ships`, { method: 'POST' });
    const { data } = await res.json();
    return data;
  }

  async refuelShip(shipSymbol: string, body: { units: number, fromCargo?: boolean }): Promise<{ agent: ApiTypes.Agent, fuel: ApiTypes.ShipFuel, transaction: ApiTypes.MarketTransaction }> {
    const res = await this.request(`/my/ships/${shipSymbol}/refuel`, { body });
    const { data } = await res.json();
    return data;
  }

  async purchaseCargo(shipSymbol: string, body: { symbol: ApiTypes.TradeSymbol, units: number }): Promise<{ agent: ApiTypes.Agent, cargo: ApiTypes.ShipCargo, transaction: ApiTypes.MarketTransaction }> {
    const res = await this.request(`/my/ships/${shipSymbol}/purchase`, { body });
    const { data } = await res.json();
    return data;
  }

  async transferCargo(shipSymbol: string, body: { tradeSymbol: ApiTypes.TradeSymbol, units: number, shipSymbol: string }): Promise<ApiTypes.ShipCargo> {
    const res = await this.request(`/my/ships/${shipSymbol}/transfer`, { body });
    const { data } = await res.json();
    return data.cargo;
  }

  async negotiateContract(shipSymbol: string): Promise<ApiTypes.Contract> {
    const res = await this.request(`/my/ships/${shipSymbol}/negotiate/contract`, { method: 'POST' });
    const { data } = await res.json();
    return data.contract;
  }

  async getMounts(shipSymbol: string): Promise<ApiTypes.ShipMount[]> {
    const res = await this.request(`/my/ships/${shipSymbol}/mounts`);
    const { data } = await res.json();
    return data;
  }

  async installMount(shipSymbol: string, body: { symbol: string }): Promise<{ agent: ApiTypes.Agent, mounts: ApiTypes.ShipMount[], cargo: ApiTypes.ShipCargo, transaction: ApiTypes.ShipModificationTransaction }> {
    const res = await this.request(`/my/ships/${shipSymbol}/mounts/install`, { body });
    const { data } = await res.json();
    return data;
  }

  async removeMount(shipSymbol: string, body: { symbol: string }): Promise<{ agent: ApiTypes.Agent, mounts: ApiTypes.ShipMount[], cargo: ApiTypes.ShipCargo, transaction: ApiTypes.ShipModificationTransaction }> {
    const res = await this.request(`/my/ships/${shipSymbol}/mounts/remove`, { body });
    const { data } = await res.json();
    return data;
  }


  // SYSTEMS

  async getSystems({ limit = 20, page = 1 }: { limit?: number, page?: number } = {}): Promise<{ data: ApiTypes.System[], meta: ApiTypes.Meta }> {
    const res = await this.request('/systems', { query: { limit, page } });
    return res.json();
  }

  async getSystem(systemSymbol: string): Promise<ApiTypes.System> {
    const res = await this.request(`/systems/${systemSymbol}`);
    const { data } = await res.json();
    return data;
  }

  async getSystemWaypoints(systemSymbol: string, { limit = 20, page = 1 }: { limit?: number, page?: number } = {}): Promise<{ data: ApiTypes.Waypoint[], meta: ApiTypes.Meta }> {
    const res = await this.request(`/systems/${systemSymbol}/waypoints`, { query: { limit, page } });
    return res.json();
  }

  async getWaypoint(systemSymbol: string, waypointSymbol: string): Promise<ApiTypes.Waypoint> {
    const res = await this.request(`/systems/${systemSymbol}/waypoints/${waypointSymbol}`);
    const { data } = await res.json();
    return data;
  }

  async getMarket(systemSymbol: string, waypointSymbol: string): Promise<ApiTypes.Market> {
    const res = await this.request(`/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`);
    const { data } = await res.json();
    return data;
  }

  async getShipyard(systemSymbol: string, waypointSymbol: string): Promise<ApiTypes.Shipyard> {
    const res = await this.request(`/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`);
    const { data } = await res.json();
    return data;
  }

  async getJumpGate(systemSymbol: string, waypointSymbol: string): Promise<ApiTypes.JumpGate> {
    const res = await this.request(`/systems/${systemSymbol}/waypoints/${waypointSymbol}/jump-gate`);
    const { data } = await res.json();
    return data;
  }

  async getConstruction(systemSymbol: string, waypointSymbol: string): Promise<ApiTypes.Construction> {
    const res = await this.request(`/systems/${systemSymbol}/waypoints/${waypointSymbol}/construction`);
    const { data } = await res.json();
    return data;
  }

  async supplyConstruction(systemSymbol: string, waypointSymbol: string, body: { shipSymbol: string, tradeSymbol: ApiTypes.TradeSymbol, units: number }): Promise<{ construction: ApiTypes.Construction, cargo: ApiTypes.ShipCargo }> {
    const res = await this.request(`/systems/${systemSymbol}/waypoints/${waypointSymbol}/construction/supply`, { body });
    const { data } = await res.json();
    return data;
  }
}

export default REST;