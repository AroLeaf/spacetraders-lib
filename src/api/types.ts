/**
 * This file has been generated from the JSON schema model definitions SpaceTraders provide here: https://github.com/SpaceTradersAPI/api-docs.
 * Please do not make changes to this file directly.
*/
 
/** The activity level of a trade good. If the good is an import, this represents how strong consumption is. If the good is an export, this represents how strong the production is for the good. When activity is strong, consumption or production is near maximum capacity. When activity is weak, consumption or production is near minimum capacity. */
export enum ActivityLevel {
  /** Indicates very low production or consumption activity. This may suggest a surplus in supply or a lack of demand. */
  WEAK = "WEAK",
  /** Represents increasing activity in production or consumption, suggesting a developing market. */
  GROWING = "GROWING",
  /** Signifies high levels of production or consumption. Indicates a healthy and active market with high demand or supply. */
  STRONG = "STRONG",
  /** Reflects a bottlneck in production or consumption, possibly due to a lack of supply or demand in related goods. */
  RESTRICTED = "RESTRICTED",
}

/** Agent details. */
export interface Agent {
  /** Account ID that is tied to this agent. Only included on your own agent. */
  "accountId"?: string,
  /** Symbol of the agent. */
  "symbol": string,
  /** The headquarters of the agent. */
  "headquarters": string,
  /** The number of credits the agent has available. Credits can be negative if funds have been overdrawn. */
  "credits": number,
  /** The faction the agent started with. */
  "startingFaction": string,
  /** How many ships are owned by the agent. */
  "shipCount": number,
}

/** The chart of a system or waypoint, which makes the location visible to other agents. */
export interface Chart {
  "waypointSymbol"?: WaypointSymbol,
  /** The agent that submitted the chart for this waypoint. */
  "submittedBy"?: string,
  /** The time the chart for this waypoint was submitted. */
  "submittedOn"?: string,
}

export interface ConnectedSystem {
  /** The symbol of the system. */
  "symbol": string,
  /** The sector of this system. */
  "sectorSymbol": string,
  "type": SystemType,
  /** The symbol of the faction that owns the connected jump gate in the system. */
  "factionSymbol"?: string,
  /** Position in the universe in the x axis. */
  "x": number,
  /** Position in the universe in the y axis. */
  "y": number,
  /** The distance of this system to the connected Jump Gate. */
  "distance": number,
}

/** The construction details of a waypoint. */
export interface Construction {
  /** The symbol of the waypoint. */
  "symbol": string,
  /** The materials required to construct the waypoint. */
  "materials": ConstructionMaterial[],
  /** Whether the waypoint has been constructed. */
  "isComplete": boolean,
}

/** The details of the required construction materials for a given waypoint under construction. */
export interface ConstructionMaterial {
  "tradeSymbol": TradeSymbol,
  /** The number of units required. */
  "required": number,
  /** The number of units fulfilled toward the required amount. */
  "fulfilled": number,
}

/** Contract details. */
export interface Contract {
  /** ID of the contract. */
  "id": string,
  /** The symbol of the faction that this contract is for. */
  "factionSymbol": string,
  /** Type of contract. */
  "type": ("PROCUREMENT" | "TRANSPORT" | "SHUTTLE"),
  "terms": ContractTerms,
  /** Whether the contract has been accepted by the agent */
  "accepted": boolean,
  /** Whether the contract has been fulfilled */
  "fulfilled": boolean,
  /** Deprecated in favor of deadlineToAccept */
  "expiration": string,
  /** The time at which the contract is no longer available to be accepted */
  "deadlineToAccept"?: string,
}

/** The details of a delivery contract. Includes the type of good, units needed, and the destination. */
export interface ContractDeliverGood {
  /** The symbol of the trade good to deliver. */
  "tradeSymbol": string,
  /** The destination where goods need to be delivered. */
  "destinationSymbol": string,
  /** The number of units that need to be delivered on this contract. */
  "unitsRequired": number,
  /** The number of units fulfilled on this contract. */
  "unitsFulfilled": number,
}

/** Payments for the contract. */
export interface ContractPayment {
  /** The amount of credits received up front for accepting the contract. */
  "onAccepted": number,
  /** The amount of credits received when the contract is fulfilled. */
  "onFulfilled": number,
}

/** The terms to fulfill the contract. */
export interface ContractTerms {
  /** The deadline for the contract. */
  "deadline": string,
  "payment": ContractPayment,
  /** The cargo that needs to be delivered to fulfill the contract. */
  "deliver"?: ContractDeliverGood[],
}

/** A cooldown is a period of time in which a ship cannot perform certain actions. */
export interface Cooldown {
  /** The symbol of the ship that is on cooldown */
  "shipSymbol": string,
  /** The total duration of the cooldown in seconds */
  "totalSeconds": number,
  /** The remaining duration of the cooldown in seconds */
  "remainingSeconds": number,
  /** The date and time when the cooldown expires in ISO 8601 format */
  "expiration"?: string,
}

/** Extraction details. */
export interface Extraction {
  /** Symbol of the ship that executed the extraction. */
  "shipSymbol": string,
  "yield": ExtractionYield,
}

/** A yield from the extraction operation. */
export interface ExtractionYield {
  "symbol": TradeSymbol,
  /** The number of units extracted that were placed into the ship's cargo hold. */
  "units": number,
}

/** Faction details. */
export interface Faction {
  "symbol": FactionSymbol,
  /** Name of the faction. */
  "name": string,
  /** Description of the faction. */
  "description": string,
  /** The waypoint in which the faction's HQ is located in. */
  "headquarters": string,
  /** List of traits that define this faction. */
  "traits": FactionTrait[],
  /** Whether or not the faction is currently recruiting new agents. */
  "isRecruiting": boolean,
}

/** The symbol of the faction. */
export enum FactionSymbol {
  COSMIC = "COSMIC",
  VOID = "VOID",
  GALACTIC = "GALACTIC",
  QUANTUM = "QUANTUM",
  DOMINION = "DOMINION",
  ASTRO = "ASTRO",
  CORSAIRS = "CORSAIRS",
  OBSIDIAN = "OBSIDIAN",
  AEGIS = "AEGIS",
  UNITED = "UNITED",
  SOLITARY = "SOLITARY",
  COBALT = "COBALT",
  OMEGA = "OMEGA",
  ECHO = "ECHO",
  LORDS = "LORDS",
  CULT = "CULT",
  ANCIENTS = "ANCIENTS",
  SHADOW = "SHADOW",
  ETHEREAL = "ETHEREAL",
}

export interface FactionTrait {
  "symbol": FactionTraitSymbol,
  /** The name of the trait. */
  "name": string,
  /** A description of the trait. */
  "description": string,
}

/** The unique identifier of the trait. */
export enum FactionTraitSymbol {
  BUREAUCRATIC = "BUREAUCRATIC",
  SECRETIVE = "SECRETIVE",
  CAPITALISTIC = "CAPITALISTIC",
  INDUSTRIOUS = "INDUSTRIOUS",
  PEACEFUL = "PEACEFUL",
  DISTRUSTFUL = "DISTRUSTFUL",
  WELCOMING = "WELCOMING",
  SMUGGLERS = "SMUGGLERS",
  SCAVENGERS = "SCAVENGERS",
  REBELLIOUS = "REBELLIOUS",
  EXILES = "EXILES",
  PIRATES = "PIRATES",
  RAIDERS = "RAIDERS",
  CLAN = "CLAN",
  GUILD = "GUILD",
  DOMINION = "DOMINION",
  FRINGE = "FRINGE",
  FORSAKEN = "FORSAKEN",
  ISOLATED = "ISOLATED",
  LOCALIZED = "LOCALIZED",
  ESTABLISHED = "ESTABLISHED",
  NOTABLE = "NOTABLE",
  DOMINANT = "DOMINANT",
  INESCAPABLE = "INESCAPABLE",
  INNOVATIVE = "INNOVATIVE",
  BOLD = "BOLD",
  VISIONARY = "VISIONARY",
  CURIOUS = "CURIOUS",
  DARING = "DARING",
  EXPLORATORY = "EXPLORATORY",
  RESOURCEFUL = "RESOURCEFUL",
  FLEXIBLE = "FLEXIBLE",
  COOPERATIVE = "COOPERATIVE",
  UNITED = "UNITED",
  STRATEGIC = "STRATEGIC",
  INTELLIGENT = "INTELLIGENT",
  RESEARCH_FOCUSED = "RESEARCH_FOCUSED",
  COLLABORATIVE = "COLLABORATIVE",
  PROGRESSIVE = "PROGRESSIVE",
  MILITARISTIC = "MILITARISTIC",
  TECHNOLOGICALLY_ADVANCED = "TECHNOLOGICALLY_ADVANCED",
  AGGRESSIVE = "AGGRESSIVE",
  IMPERIALISTIC = "IMPERIALISTIC",
  TREASURE_HUNTERS = "TREASURE_HUNTERS",
  DEXTEROUS = "DEXTEROUS",
  UNPREDICTABLE = "UNPREDICTABLE",
  BRUTAL = "BRUTAL",
  FLEETING = "FLEETING",
  ADAPTABLE = "ADAPTABLE",
  SELF_SUFFICIENT = "SELF_SUFFICIENT",
  DEFENSIVE = "DEFENSIVE",
  PROUD = "PROUD",
  DIVERSE = "DIVERSE",
  INDEPENDENT = "INDEPENDENT",
  SELF_INTERESTED = "SELF_INTERESTED",
  FRAGMENTED = "FRAGMENTED",
  COMMERCIAL = "COMMERCIAL",
  FREE_MARKETS = "FREE_MARKETS",
  ENTREPRENEURIAL = "ENTREPRENEURIAL",
}

export interface JumpGate {
  "symbol": WaypointSymbol,
  /** All the gates that are connected to this waypoint. */
  "connections": string[],
}

export interface Market {
  /** The symbol of the market. The symbol is the same as the waypoint where the market is located. */
  "symbol": string,
  /** The list of goods that are exported from this market. */
  "exports": TradeGood[],
  /** The list of goods that are sought as imports in this market. */
  "imports": TradeGood[],
  /** The list of goods that are bought and sold between agents at this market. */
  "exchange": TradeGood[],
  /** The list of recent transactions at this market. Visible only when a ship is present at the market. */
  "transactions"?: MarketTransaction[],
  /** The list of goods that are traded at this market. Visible only when a ship is present at the market. */
  "tradeGoods"?: MarketTradeGood[],
}

export interface MarketTradeGood {
  "symbol": TradeSymbol,
  /** The type of trade good (export, import, or exchange). */
  "type": ("EXPORT" | "IMPORT" | "EXCHANGE"),
  /** This is the maximum number of units that can be purchased or sold at this market in a single trade for this good. Trade volume also gives an indication of price volatility. A market with a low trade volume will have large price swings, while high trade volume will be more resilient to price changes. */
  "tradeVolume": number,
  "supply": SupplyLevel,
  "activity"?: ActivityLevel,
  /** The price at which this good can be purchased from the market. */
  "purchasePrice": number,
  /** The price at which this good can be sold to the market. */
  "sellPrice": number,
}

/** Result of a transaction with a market. */
export interface MarketTransaction {
  "waypointSymbol": WaypointSymbol,
  /** The symbol of the ship that made the transaction. */
  "shipSymbol": string,
  /** The symbol of the trade good. */
  "tradeSymbol": string,
  /** The type of transaction. */
  "type": ("PURCHASE" | "SELL"),
  /** The number of units of the transaction. */
  "units": number,
  /** The price per unit of the transaction. */
  "pricePerUnit": number,
  /** The total price of the transaction. */
  "totalPrice": number,
  /** The timestamp of the transaction. */
  "timestamp": string,
}

/** Meta details for pagination. */
export interface Meta {
  /** Shows the total amount of items of this kind that exist. */
  "total": number,
  /** A page denotes an amount of items, offset from the first item. Each page holds an amount of items equal to the `limit`. */
  "page": number,
  /** The amount of items in each page. Limits how many items can be fetched at once. */
  "limit": number,
}

/** The ship that was scanned. Details include information about the ship that could be detected by the scanner. */
export interface ScannedShip {
  /** The globally unique identifier of the ship. */
  "symbol": string,
  "registration": ShipRegistration,
  "nav": ShipNav,
  /** The frame of the ship. */
  "frame"?: {
    /** The symbol of the frame. */
    "symbol": string,
  },
  /** The reactor of the ship. */
  "reactor"?: {
    /** The symbol of the reactor. */
    "symbol": string,
  },
  /** The engine of the ship. */
  "engine": {
    /** The symbol of the engine. */
    "symbol": string,
  },
  /** List of mounts installed in the ship. */
  "mounts"?: {
    /** The symbol of the mount. */
    "symbol": string,
  }[],
}

/** Details of a system was that scanned. */
export interface ScannedSystem {
  /** Symbol of the system. */
  "symbol": string,
  /** Symbol of the system's sector. */
  "sectorSymbol": string,
  "type": SystemType,
  /** Position in the universe in the x axis. */
  "x": number,
  /** Position in the universe in the y axis. */
  "y": number,
  /** The system's distance from the scanning ship. */
  "distance": number,
}

/** A waypoint that was scanned by a ship. */
export interface ScannedWaypoint {
  "symbol": WaypointSymbol,
  "type": WaypointType,
  "systemSymbol": SystemSymbol,
  /** Position in the universe in the x axis. */
  "x": number,
  /** Position in the universe in the y axis. */
  "y": number,
  /** List of waypoints that orbit this waypoint. */
  "orbitals": WaypointOrbital[],
  "faction"?: WaypointFaction,
  /** The traits of the waypoint. */
  "traits": WaypointTrait[],
  "chart"?: Chart,
}

/** Ship details. */
export interface Ship {
  /** The globally unique identifier of the ship in the following format: `[AGENT_SYMBOL]-[HEX_ID]` */
  "symbol": string,
  "registration": ShipRegistration,
  "nav": ShipNav,
  "crew": ShipCrew,
  "frame": ShipFrame,
  "reactor": ShipReactor,
  "engine": ShipEngine,
  "cooldown": Cooldown,
  /** Modules installed in this ship. */
  "modules": ShipModule[],
  /** Mounts installed in this ship. */
  "mounts": ShipMount[],
  "cargo": ShipCargo,
  "fuel": ShipFuel,
}

/** Ship cargo details. */
export interface ShipCargo {
  /** The max number of items that can be stored in the cargo hold. */
  "capacity": number,
  /** The number of items currently stored in the cargo hold. */
  "units": number,
  /** The items currently in the cargo hold. */
  "inventory": ShipCargoItem[],
}

/** The type of cargo item and the number of units. */
export interface ShipCargoItem {
  "symbol": TradeSymbol,
  /** The name of the cargo item type. */
  "name": string,
  /** The description of the cargo item type. */
  "description": string,
  /** The number of units of the cargo item. */
  "units": number,
}

/** Condition is a range of 0 to 100 where 0 is completely worn out and 100 is brand new. */
export type ShipCondition = number;

/** The ship's crew service and maintain the ship's systems and equipment. */
export interface ShipCrew {
  /** The current number of crew members on the ship. */
  "current": number,
  /** The minimum number of crew members required to maintain the ship. */
  "required": number,
  /** The maximum number of crew members the ship can support. */
  "capacity": number,
  /** The rotation of crew shifts. A stricter shift improves the ship's performance. A more relaxed shift improves the crew's morale. */
  "rotation": ("STRICT" | "RELAXED"),
  /** A rough measure of the crew's morale. A higher morale means the crew is happier and more productive. A lower morale means the ship is more prone to accidents. */
  "morale": number,
  /** The amount of credits per crew member paid per hour. Wages are paid when a ship docks at a civilized waypoint. */
  "wages": number,
}

/** The engine determines how quickly a ship travels between waypoints. */
export interface ShipEngine {
  /** The symbol of the engine. */
  "symbol": ("ENGINE_IMPULSE_DRIVE_I" | "ENGINE_ION_DRIVE_I" | "ENGINE_ION_DRIVE_II" | "ENGINE_HYPER_DRIVE_I"),
  /** The name of the engine. */
  "name": string,
  /** The description of the engine. */
  "description": string,
  "condition"?: ShipCondition,
  /** The speed stat of this engine. The higher the speed, the faster a ship can travel from one point to another. Reduces the time of arrival when navigating the ship. */
  "speed": number,
  "requirements": ShipRequirements,
}

/** The frame of the ship. The frame determines the number of modules and mounting points of the ship, as well as base fuel capacity. As the condition of the frame takes more wear, the ship will become more sluggish and less maneuverable. */
export interface ShipFrame {
  /** Symbol of the frame. */
  "symbol": ("FRAME_PROBE" | "FRAME_DRONE" | "FRAME_INTERCEPTOR" | "FRAME_RACER" | "FRAME_FIGHTER" | "FRAME_FRIGATE" | "FRAME_SHUTTLE" | "FRAME_EXPLORER" | "FRAME_MINER" | "FRAME_LIGHT_FREIGHTER" | "FRAME_HEAVY_FREIGHTER" | "FRAME_TRANSPORT" | "FRAME_DESTROYER" | "FRAME_CRUISER" | "FRAME_CARRIER"),
  /** Name of the frame. */
  "name": string,
  /** Description of the frame. */
  "description": string,
  "condition"?: ShipCondition,
  /** The amount of slots that can be dedicated to modules installed in the ship. Each installed module take up a number of slots, and once there are no more slots, no new modules can be installed. */
  "moduleSlots": number,
  /** The amount of slots that can be dedicated to mounts installed in the ship. Each installed mount takes up a number of points, and once there are no more points remaining, no new mounts can be installed. */
  "mountingPoints": number,
  /** The maximum amount of fuel that can be stored in this ship. When refueling, the ship will be refueled to this amount. */
  "fuelCapacity": number,
  "requirements": ShipRequirements,
}

/** Details of the ship's fuel tanks including how much fuel was consumed during the last transit or action. */
export interface ShipFuel {
  /** The current amount of fuel in the ship's tanks. */
  "current": number,
  /** The maximum amount of fuel the ship's tanks can hold. */
  "capacity": number,
  /** An object that only shows up when an action has consumed fuel in the process. Shows the fuel consumption data. */
  "consumed"?: {
    /** The amount of fuel consumed by the most recent transit or action. */
    "amount": number,
    /** The time at which the fuel was consumed. */
    "timestamp": string,
  },
}

/** Result of a transaction for a ship modification, such as installing a mount or a module. */
export interface ShipModificationTransaction {
  /** The symbol of the waypoint where the transaction took place. */
  "waypointSymbol": string,
  /** The symbol of the ship that made the transaction. */
  "shipSymbol": string,
  /** The symbol of the trade good. */
  "tradeSymbol": string,
  /** The total price of the transaction. */
  "totalPrice": number,
  /** The timestamp of the transaction. */
  "timestamp": string,
}

/** A module can be installed in a ship and provides a set of capabilities such as storage space or quarters for crew. Module installations are permanent. */
export interface ShipModule {
  /** The symbol of the module. */
  "symbol": ("MODULE_MINERAL_PROCESSOR_I" | "MODULE_GAS_PROCESSOR_I" | "MODULE_CARGO_HOLD_I" | "MODULE_CARGO_HOLD_II" | "MODULE_CARGO_HOLD_III" | "MODULE_CREW_QUARTERS_I" | "MODULE_ENVOY_QUARTERS_I" | "MODULE_PASSENGER_CABIN_I" | "MODULE_MICRO_REFINERY_I" | "MODULE_ORE_REFINERY_I" | "MODULE_FUEL_REFINERY_I" | "MODULE_SCIENCE_LAB_I" | "MODULE_JUMP_DRIVE_I" | "MODULE_JUMP_DRIVE_II" | "MODULE_JUMP_DRIVE_III" | "MODULE_WARP_DRIVE_I" | "MODULE_WARP_DRIVE_II" | "MODULE_WARP_DRIVE_III" | "MODULE_SHIELD_GENERATOR_I" | "MODULE_SHIELD_GENERATOR_II"),
  /** Modules that provide capacity, such as cargo hold or crew quarters will show this value to denote how much of a bonus the module grants. */
  "capacity"?: number,
  /** Modules that have a range will such as a sensor array show this value to denote how far can the module reach with its capabilities. */
  "range"?: number,
  /** Name of this module. */
  "name": string,
  /** Description of this module. */
  "description": string,
  "requirements": ShipRequirements,
}

/** A mount is installed on the exterier of a ship. */
export interface ShipMount {
  /** Symbo of this mount. */
  "symbol": ("MOUNT_GAS_SIPHON_I" | "MOUNT_GAS_SIPHON_II" | "MOUNT_GAS_SIPHON_III" | "MOUNT_SURVEYOR_I" | "MOUNT_SURVEYOR_II" | "MOUNT_SURVEYOR_III" | "MOUNT_SENSOR_ARRAY_I" | "MOUNT_SENSOR_ARRAY_II" | "MOUNT_SENSOR_ARRAY_III" | "MOUNT_MINING_LASER_I" | "MOUNT_MINING_LASER_II" | "MOUNT_MINING_LASER_III" | "MOUNT_LASER_CANNON_I" | "MOUNT_MISSILE_LAUNCHER_I" | "MOUNT_TURRET_I"),
  /** Name of this mount. */
  "name": string,
  /** Description of this mount. */
  "description"?: string,
  /** Mounts that have this value, such as mining lasers, denote how powerful this mount's capabilities are. */
  "strength"?: number,
  /** Mounts that have this value denote what goods can be produced from using the mount. */
  "deposits"?: ("QUARTZ_SAND" | "SILICON_CRYSTALS" | "PRECIOUS_STONES" | "ICE_WATER" | "AMMONIA_ICE" | "IRON_ORE" | "COPPER_ORE" | "SILVER_ORE" | "ALUMINUM_ORE" | "GOLD_ORE" | "PLATINUM_ORE" | "DIAMONDS" | "URANITE_ORE" | "MERITIUM_ORE")[],
  "requirements": ShipRequirements,
}

/** The navigation information of the ship. */
export interface ShipNav {
  "systemSymbol": SystemSymbol,
  "waypointSymbol": WaypointSymbol,
  "route": ShipNavRoute,
  "status": ShipNavStatus,
  "flightMode": ShipNavFlightMode,
}

/** The ship's set speed when traveling between waypoints or systems. */
export enum ShipNavFlightMode {
  DRIFT = "DRIFT",
  STEALTH = "STEALTH",
  CRUISE = "CRUISE",
  BURN = "BURN",
}

/** The routing information for the ship's most recent transit or current location. */
export interface ShipNavRoute {
  "destination": ShipNavRouteWaypoint,
  "origin": ShipNavRouteWaypoint,
  /** The date time of the ship's departure. */
  "departureTime": string,
  /** The date time of the ship's arrival. If the ship is in-transit, this is the expected time of arrival. */
  "arrival": string,
}

/** The destination or departure of a ships nav route. */
export interface ShipNavRouteWaypoint {
  /** The symbol of the waypoint. */
  "symbol": string,
  "type": WaypointType,
  "systemSymbol": SystemSymbol,
  /** Position in the universe in the x axis. */
  "x": number,
  /** Position in the universe in the y axis. */
  "y": number,
}

/** Deprecated. Use origin instead. */
export interface ShipNavRouteWaypointDeprecated {
  /** The symbol of the waypoint. */
  "symbol": string,
  "type": WaypointType,
  "systemSymbol": SystemSymbol,
  /** Position in the universe in the x axis. */
  "x": number,
  /** Position in the universe in the y axis. */
  "y": number,
}

/** The current status of the ship */
export enum ShipNavStatus {
  IN_TRANSIT = "IN_TRANSIT",
  IN_ORBIT = "IN_ORBIT",
  DOCKED = "DOCKED",
}

/** The reactor of the ship. The reactor is responsible for powering the ship's systems and weapons. */
export interface ShipReactor {
  /** Symbol of the reactor. */
  "symbol": ("REACTOR_SOLAR_I" | "REACTOR_FUSION_I" | "REACTOR_FISSION_I" | "REACTOR_CHEMICAL_I" | "REACTOR_ANTIMATTER_I"),
  /** Name of the reactor. */
  "name": string,
  /** Description of the reactor. */
  "description": string,
  "condition"?: ShipCondition,
  /** The amount of power provided by this reactor. The more power a reactor provides to the ship, the lower the cooldown it gets when using a module or mount that taxes the ship's power. */
  "powerOutput": number,
  "requirements": ShipRequirements,
}

/** The public registration information of the ship */
export interface ShipRegistration {
  /** The agent's registered name of the ship */
  "name": string,
  /** The symbol of the faction the ship is registered with */
  "factionSymbol": string,
  "role": ShipRole,
}

/** The requirements for installation on a ship */
export interface ShipRequirements {
  /** The amount of power required from the reactor. */
  "power"?: number,
  /** The number of crew required for operation. */
  "crew"?: number,
  /** The number of module slots required for installation. */
  "slots"?: number,
}

/** The registered role of the ship */
export enum ShipRole {
  FABRICATOR = "FABRICATOR",
  HARVESTER = "HARVESTER",
  HAULER = "HAULER",
  INTERCEPTOR = "INTERCEPTOR",
  EXCAVATOR = "EXCAVATOR",
  TRANSPORT = "TRANSPORT",
  REPAIR = "REPAIR",
  SURVEYOR = "SURVEYOR",
  COMMAND = "COMMAND",
  CARRIER = "CARRIER",
  PATROL = "PATROL",
  SATELLITE = "SATELLITE",
  EXPLORER = "EXPLORER",
  REFINERY = "REFINERY",
}

/** Type of ship */
export enum ShipType {
  SHIP_PROBE = "SHIP_PROBE",
  SHIP_MINING_DRONE = "SHIP_MINING_DRONE",
  SHIP_SIPHON_DRONE = "SHIP_SIPHON_DRONE",
  SHIP_INTERCEPTOR = "SHIP_INTERCEPTOR",
  SHIP_LIGHT_HAULER = "SHIP_LIGHT_HAULER",
  SHIP_COMMAND_FRIGATE = "SHIP_COMMAND_FRIGATE",
  SHIP_EXPLORER = "SHIP_EXPLORER",
  SHIP_HEAVY_FREIGHTER = "SHIP_HEAVY_FREIGHTER",
  SHIP_LIGHT_SHUTTLE = "SHIP_LIGHT_SHUTTLE",
  SHIP_ORE_HOUND = "SHIP_ORE_HOUND",
  SHIP_REFINING_FREIGHTER = "SHIP_REFINING_FREIGHTER",
  SHIP_SURVEYOR = "SHIP_SURVEYOR",
}

export interface Shipyard {
  /** The symbol of the shipyard. The symbol is the same as the waypoint where the shipyard is located. */
  "symbol": string,
  /** The list of ship types available for purchase at this shipyard. */
  "shipTypes": {
    "type": ShipType,
  }[],
  /** The list of recent transactions at this shipyard. */
  "transactions"?: ShipyardTransaction[],
  /** The ships that are currently available for purchase at the shipyard. */
  "ships"?: ShipyardShip[],
  /** The fee to modify a ship at this shipyard. This includes installing or removing modules and mounts on a ship. In the case of mounts, the fee is a flat rate per mount. In the case of modules, the fee is per slot the module occupies. */
  "modificationsFee": number,
}

export interface ShipyardShip {
  "type": ShipType,
  "name": string,
  "description": string,
  "supply": SupplyLevel,
  "activity"?: ActivityLevel,
  "purchasePrice": number,
  "frame": ShipFrame,
  "reactor": ShipReactor,
  "engine": ShipEngine,
  "modules": ShipModule[],
  "mounts": ShipMount[],
  "crew": {
    "required": number,
    "capacity": number,
  },
}

/** Results of a transaction with a shipyard. */
export interface ShipyardTransaction {
  "waypointSymbol": WaypointSymbol,
  /** The symbol of the ship that was the subject of the transaction. */
  "shipSymbol": string,
  /** The symbol of the ship that was the subject of the transaction. */
  "shipType": string,
  /** The price of the transaction. */
  "price": number,
  /** The symbol of the agent that made the transaction. */
  "agentSymbol": string,
  /** The timestamp of the transaction. */
  "timestamp": string,
}

/** Siphon details. */
export interface Siphon {
  /** Symbol of the ship that executed the siphon. */
  "shipSymbol": string,
  "yield": SiphonYield,
}

/** A yield from the siphon operation. */
export interface SiphonYield {
  "symbol": TradeSymbol,
  /** The number of units siphoned that were placed into the ship's cargo hold. */
  "units": number,
}

/** The supply level of a trade good. */
export enum SupplyLevel {
  SCARCE = "SCARCE",
  LIMITED = "LIMITED",
  MODERATE = "MODERATE",
  HIGH = "HIGH",
  ABUNDANT = "ABUNDANT",
}

/** A resource survey of a waypoint, detailing a specific extraction location and the types of resources that can be found there. */
export interface Survey {
  /** A unique signature for the location of this survey. This signature is verified when attempting an extraction using this survey. */
  "signature": string,
  /** The symbol of the waypoint that this survey is for. */
  "symbol": string,
  /** A list of deposits that can be found at this location. A ship will extract one of these deposits when using this survey in an extraction request. If multiple deposits of the same type are present, the chance of extracting that deposit is increased. */
  "deposits": SurveyDeposit[],
  /** The date and time when the survey expires. After this date and time, the survey will no longer be available for extraction. */
  "expiration": string,
  /** The size of the deposit. This value indicates how much can be extracted from the survey before it is exhausted. */
  "size": ("SMALL" | "MODERATE" | "LARGE"),
}

/** A surveyed deposit of a mineral or resource available for extraction. */
export interface SurveyDeposit {
  /** The symbol of the deposit. */
  "symbol": string,
}

export interface System {
  /** The symbol of the system. */
  "symbol": string,
  /** The symbol of the sector. */
  "sectorSymbol": string,
  "type": SystemType,
  /** Relative position of the system in the sector in the x axis. */
  "x": number,
  /** Relative position of the system in the sector in the y axis. */
  "y": number,
  /** Waypoints in this system. */
  "waypoints": SystemWaypoint[],
  /** Factions that control this system. */
  "factions": SystemFaction[],
}

export interface SystemFaction {
  "symbol": FactionSymbol,
}

type SystemSymbol = string;

/** The type of system. */
export enum SystemType {
  NEUTRON_STAR = "NEUTRON_STAR",
  RED_STAR = "RED_STAR",
  ORANGE_STAR = "ORANGE_STAR",
  BLUE_STAR = "BLUE_STAR",
  YOUNG_STAR = "YOUNG_STAR",
  WHITE_DWARF = "WHITE_DWARF",
  BLACK_HOLE = "BLACK_HOLE",
  HYPERGIANT = "HYPERGIANT",
  NEBULA = "NEBULA",
  UNSTABLE = "UNSTABLE",
}

export interface SystemWaypoint {
  "symbol": WaypointSymbol,
  "type": WaypointType,
  /** Relative position of the waypoint on the system's x axis. This is not an absolute position in the universe. */
  "x": number,
  /** Relative position of the waypoint on the system's y axis. This is not an absolute position in the universe. */
  "y": number,
  /** Waypoints that orbit this waypoint. */
  "orbitals": WaypointOrbital[],
  /** The symbol of the parent waypoint, if this waypoint is in orbit around another waypoint. Otherwise this value is undefined. */
  "orbits"?: string,
}

/** A good that can be traded for other goods or currency. */
export interface TradeGood {
  "symbol": TradeSymbol,
  /** The name of the good. */
  "name": string,
  /** The description of the good. */
  "description": string,
}

/** The good's symbol. */
export enum TradeSymbol {
  PRECIOUS_STONES = "PRECIOUS_STONES",
  QUARTZ_SAND = "QUARTZ_SAND",
  SILICON_CRYSTALS = "SILICON_CRYSTALS",
  AMMONIA_ICE = "AMMONIA_ICE",
  LIQUID_HYDROGEN = "LIQUID_HYDROGEN",
  LIQUID_NITROGEN = "LIQUID_NITROGEN",
  ICE_WATER = "ICE_WATER",
  EXOTIC_MATTER = "EXOTIC_MATTER",
  ADVANCED_CIRCUITRY = "ADVANCED_CIRCUITRY",
  GRAVITON_EMITTERS = "GRAVITON_EMITTERS",
  IRON = "IRON",
  IRON_ORE = "IRON_ORE",
  COPPER = "COPPER",
  COPPER_ORE = "COPPER_ORE",
  ALUMINUM = "ALUMINUM",
  ALUMINUM_ORE = "ALUMINUM_ORE",
  SILVER = "SILVER",
  SILVER_ORE = "SILVER_ORE",
  GOLD = "GOLD",
  GOLD_ORE = "GOLD_ORE",
  PLATINUM = "PLATINUM",
  PLATINUM_ORE = "PLATINUM_ORE",
  DIAMONDS = "DIAMONDS",
  URANITE = "URANITE",
  URANITE_ORE = "URANITE_ORE",
  MERITIUM = "MERITIUM",
  MERITIUM_ORE = "MERITIUM_ORE",
  HYDROCARBON = "HYDROCARBON",
  ANTIMATTER = "ANTIMATTER",
  FAB_MATS = "FAB_MATS",
  FERTILIZERS = "FERTILIZERS",
  FABRICS = "FABRICS",
  FOOD = "FOOD",
  JEWELRY = "JEWELRY",
  MACHINERY = "MACHINERY",
  FIREARMS = "FIREARMS",
  ASSAULT_RIFLES = "ASSAULT_RIFLES",
  MILITARY_EQUIPMENT = "MILITARY_EQUIPMENT",
  EXPLOSIVES = "EXPLOSIVES",
  LAB_INSTRUMENTS = "LAB_INSTRUMENTS",
  AMMUNITION = "AMMUNITION",
  ELECTRONICS = "ELECTRONICS",
  SHIP_PLATING = "SHIP_PLATING",
  SHIP_PARTS = "SHIP_PARTS",
  EQUIPMENT = "EQUIPMENT",
  FUEL = "FUEL",
  MEDICINE = "MEDICINE",
  DRUGS = "DRUGS",
  CLOTHING = "CLOTHING",
  MICROPROCESSORS = "MICROPROCESSORS",
  PLASTICS = "PLASTICS",
  POLYNUCLEOTIDES = "POLYNUCLEOTIDES",
  BIOCOMPOSITES = "BIOCOMPOSITES",
  QUANTUM_STABILIZERS = "QUANTUM_STABILIZERS",
  NANOBOTS = "NANOBOTS",
  AI_MAINFRAMES = "AI_MAINFRAMES",
  QUANTUM_DRIVES = "QUANTUM_DRIVES",
  ROBOTIC_DRONES = "ROBOTIC_DRONES",
  CYBER_IMPLANTS = "CYBER_IMPLANTS",
  GENE_THERAPEUTICS = "GENE_THERAPEUTICS",
  NEURAL_CHIPS = "NEURAL_CHIPS",
  MOOD_REGULATORS = "MOOD_REGULATORS",
  VIRAL_AGENTS = "VIRAL_AGENTS",
  MICRO_FUSION_GENERATORS = "MICRO_FUSION_GENERATORS",
  SUPERGRAINS = "SUPERGRAINS",
  LASER_RIFLES = "LASER_RIFLES",
  HOLOGRAPHICS = "HOLOGRAPHICS",
  SHIP_SALVAGE = "SHIP_SALVAGE",
  RELIC_TECH = "RELIC_TECH",
  NOVEL_LIFEFORMS = "NOVEL_LIFEFORMS",
  BOTANICAL_SPECIMENS = "BOTANICAL_SPECIMENS",
  CULTURAL_ARTIFACTS = "CULTURAL_ARTIFACTS",
  FRAME_PROBE = "FRAME_PROBE",
  FRAME_DRONE = "FRAME_DRONE",
  FRAME_INTERCEPTOR = "FRAME_INTERCEPTOR",
  FRAME_RACER = "FRAME_RACER",
  FRAME_FIGHTER = "FRAME_FIGHTER",
  FRAME_FRIGATE = "FRAME_FRIGATE",
  FRAME_SHUTTLE = "FRAME_SHUTTLE",
  FRAME_EXPLORER = "FRAME_EXPLORER",
  FRAME_MINER = "FRAME_MINER",
  FRAME_LIGHT_FREIGHTER = "FRAME_LIGHT_FREIGHTER",
  FRAME_HEAVY_FREIGHTER = "FRAME_HEAVY_FREIGHTER",
  FRAME_TRANSPORT = "FRAME_TRANSPORT",
  FRAME_DESTROYER = "FRAME_DESTROYER",
  FRAME_CRUISER = "FRAME_CRUISER",
  FRAME_CARRIER = "FRAME_CARRIER",
  REACTOR_SOLAR_I = "REACTOR_SOLAR_I",
  REACTOR_FUSION_I = "REACTOR_FUSION_I",
  REACTOR_FISSION_I = "REACTOR_FISSION_I",
  REACTOR_CHEMICAL_I = "REACTOR_CHEMICAL_I",
  REACTOR_ANTIMATTER_I = "REACTOR_ANTIMATTER_I",
  ENGINE_IMPULSE_DRIVE_I = "ENGINE_IMPULSE_DRIVE_I",
  ENGINE_ION_DRIVE_I = "ENGINE_ION_DRIVE_I",
  ENGINE_ION_DRIVE_II = "ENGINE_ION_DRIVE_II",
  ENGINE_HYPER_DRIVE_I = "ENGINE_HYPER_DRIVE_I",
  MODULE_MINERAL_PROCESSOR_I = "MODULE_MINERAL_PROCESSOR_I",
  MODULE_GAS_PROCESSOR_I = "MODULE_GAS_PROCESSOR_I",
  MODULE_CARGO_HOLD_I = "MODULE_CARGO_HOLD_I",
  MODULE_CARGO_HOLD_II = "MODULE_CARGO_HOLD_II",
  MODULE_CARGO_HOLD_III = "MODULE_CARGO_HOLD_III",
  MODULE_CREW_QUARTERS_I = "MODULE_CREW_QUARTERS_I",
  MODULE_ENVOY_QUARTERS_I = "MODULE_ENVOY_QUARTERS_I",
  MODULE_PASSENGER_CABIN_I = "MODULE_PASSENGER_CABIN_I",
  MODULE_MICRO_REFINERY_I = "MODULE_MICRO_REFINERY_I",
  MODULE_SCIENCE_LAB_I = "MODULE_SCIENCE_LAB_I",
  MODULE_JUMP_DRIVE_I = "MODULE_JUMP_DRIVE_I",
  MODULE_JUMP_DRIVE_II = "MODULE_JUMP_DRIVE_II",
  MODULE_JUMP_DRIVE_III = "MODULE_JUMP_DRIVE_III",
  MODULE_WARP_DRIVE_I = "MODULE_WARP_DRIVE_I",
  MODULE_WARP_DRIVE_II = "MODULE_WARP_DRIVE_II",
  MODULE_WARP_DRIVE_III = "MODULE_WARP_DRIVE_III",
  MODULE_SHIELD_GENERATOR_I = "MODULE_SHIELD_GENERATOR_I",
  MODULE_SHIELD_GENERATOR_II = "MODULE_SHIELD_GENERATOR_II",
  MODULE_ORE_REFINERY_I = "MODULE_ORE_REFINERY_I",
  MODULE_FUEL_REFINERY_I = "MODULE_FUEL_REFINERY_I",
  MOUNT_GAS_SIPHON_I = "MOUNT_GAS_SIPHON_I",
  MOUNT_GAS_SIPHON_II = "MOUNT_GAS_SIPHON_II",
  MOUNT_GAS_SIPHON_III = "MOUNT_GAS_SIPHON_III",
  MOUNT_SURVEYOR_I = "MOUNT_SURVEYOR_I",
  MOUNT_SURVEYOR_II = "MOUNT_SURVEYOR_II",
  MOUNT_SURVEYOR_III = "MOUNT_SURVEYOR_III",
  MOUNT_SENSOR_ARRAY_I = "MOUNT_SENSOR_ARRAY_I",
  MOUNT_SENSOR_ARRAY_II = "MOUNT_SENSOR_ARRAY_II",
  MOUNT_SENSOR_ARRAY_III = "MOUNT_SENSOR_ARRAY_III",
  MOUNT_MINING_LASER_I = "MOUNT_MINING_LASER_I",
  MOUNT_MINING_LASER_II = "MOUNT_MINING_LASER_II",
  MOUNT_MINING_LASER_III = "MOUNT_MINING_LASER_III",
  MOUNT_LASER_CANNON_I = "MOUNT_LASER_CANNON_I",
  MOUNT_MISSILE_LAUNCHER_I = "MOUNT_MISSILE_LAUNCHER_I",
  MOUNT_TURRET_I = "MOUNT_TURRET_I",
  SHIP_PROBE = "SHIP_PROBE",
  SHIP_MINING_DRONE = "SHIP_MINING_DRONE",
  SHIP_SIPHON_DRONE = "SHIP_SIPHON_DRONE",
  SHIP_INTERCEPTOR = "SHIP_INTERCEPTOR",
  SHIP_LIGHT_HAULER = "SHIP_LIGHT_HAULER",
  SHIP_COMMAND_FRIGATE = "SHIP_COMMAND_FRIGATE",
  SHIP_EXPLORER = "SHIP_EXPLORER",
  SHIP_HEAVY_FREIGHTER = "SHIP_HEAVY_FREIGHTER",
  SHIP_LIGHT_SHUTTLE = "SHIP_LIGHT_SHUTTLE",
  SHIP_ORE_HOUND = "SHIP_ORE_HOUND",
  SHIP_REFINING_FREIGHTER = "SHIP_REFINING_FREIGHTER",
  SHIP_SURVEYOR = "SHIP_SURVEYOR",
}

/** A waypoint is a location that ships can travel to such as a Planet, Moon or Space Station. */
export interface Waypoint {
  "symbol": WaypointSymbol,
  "type": WaypointType,
  "systemSymbol": SystemSymbol,
  /** Relative position of the waypoint on the system's x axis. This is not an absolute position in the universe. */
  "x": number,
  /** Relative position of the waypoint on the system's y axis. This is not an absolute position in the universe. */
  "y": number,
  /** Waypoints that orbit this waypoint. */
  "orbitals": WaypointOrbital[],
  /** The symbol of the parent waypoint, if this waypoint is in orbit around another waypoint. Otherwise this value is undefined. */
  "orbits"?: string,
  "faction"?: WaypointFaction,
  /** The traits of the waypoint. */
  "traits": WaypointTrait[],
  /** The modifiers of the waypoint. */
  "modifiers"?: WaypointModifier[],
  "chart"?: Chart,
  /** True if the waypoint is under construction. */
  "isUnderConstruction": boolean,
}

/** The faction that controls the waypoint. */
export interface WaypointFaction {
  "symbol": FactionSymbol,
}

export interface WaypointModifier {
  "symbol": WaypointModifierSymbol,
  /** The name of the trait. */
  "name": string,
  /** A description of the trait. */
  "description": string,
}

/** The unique identifier of the modifier. */
export enum WaypointModifierSymbol {
  STRIPPED = "STRIPPED",
  UNSTABLE = "UNSTABLE",
  RADIATION_LEAK = "RADIATION_LEAK",
  CRITICAL_LIMIT = "CRITICAL_LIMIT",
  CIVIL_UNREST = "CIVIL_UNREST",
}

/** An orbital is another waypoint that orbits a parent waypoint. */
export interface WaypointOrbital {
  /** The symbol of the orbiting waypoint. */
  "symbol": string,
}

type WaypointSymbol = string;

export interface WaypointTrait {
  "symbol": WaypointTraitSymbol,
  /** The name of the trait. */
  "name": string,
  /** A description of the trait. */
  "description": string,
}

/** The unique identifier of the trait. */
export enum WaypointTraitSymbol {
  UNCHARTED = "UNCHARTED",
  UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
  MARKETPLACE = "MARKETPLACE",
  SHIPYARD = "SHIPYARD",
  OUTPOST = "OUTPOST",
  SCATTERED_SETTLEMENTS = "SCATTERED_SETTLEMENTS",
  SPRAWLING_CITIES = "SPRAWLING_CITIES",
  MEGA_STRUCTURES = "MEGA_STRUCTURES",
  PIRATE_BASE = "PIRATE_BASE",
  OVERCROWDED = "OVERCROWDED",
  HIGH_TECH = "HIGH_TECH",
  CORRUPT = "CORRUPT",
  BUREAUCRATIC = "BUREAUCRATIC",
  TRADING_HUB = "TRADING_HUB",
  INDUSTRIAL = "INDUSTRIAL",
  BLACK_MARKET = "BLACK_MARKET",
  RESEARCH_FACILITY = "RESEARCH_FACILITY",
  MILITARY_BASE = "MILITARY_BASE",
  SURVEILLANCE_OUTPOST = "SURVEILLANCE_OUTPOST",
  EXPLORATION_OUTPOST = "EXPLORATION_OUTPOST",
  MINERAL_DEPOSITS = "MINERAL_DEPOSITS",
  COMMON_METAL_DEPOSITS = "COMMON_METAL_DEPOSITS",
  PRECIOUS_METAL_DEPOSITS = "PRECIOUS_METAL_DEPOSITS",
  RARE_METAL_DEPOSITS = "RARE_METAL_DEPOSITS",
  METHANE_POOLS = "METHANE_POOLS",
  ICE_CRYSTALS = "ICE_CRYSTALS",
  EXPLOSIVE_GASES = "EXPLOSIVE_GASES",
  STRONG_MAGNETOSPHERE = "STRONG_MAGNETOSPHERE",
  VIBRANT_AURORAS = "VIBRANT_AURORAS",
  SALT_FLATS = "SALT_FLATS",
  CANYONS = "CANYONS",
  PERPETUAL_DAYLIGHT = "PERPETUAL_DAYLIGHT",
  PERPETUAL_OVERCAST = "PERPETUAL_OVERCAST",
  DRY_SEABEDS = "DRY_SEABEDS",
  MAGMA_SEAS = "MAGMA_SEAS",
  SUPERVOLCANOES = "SUPERVOLCANOES",
  ASH_CLOUDS = "ASH_CLOUDS",
  VAST_RUINS = "VAST_RUINS",
  MUTATED_FLORA = "MUTATED_FLORA",
  TERRAFORMED = "TERRAFORMED",
  EXTREME_TEMPERATURES = "EXTREME_TEMPERATURES",
  EXTREME_PRESSURE = "EXTREME_PRESSURE",
  DIVERSE_LIFE = "DIVERSE_LIFE",
  SCARCE_LIFE = "SCARCE_LIFE",
  FOSSILS = "FOSSILS",
  WEAK_GRAVITY = "WEAK_GRAVITY",
  STRONG_GRAVITY = "STRONG_GRAVITY",
  CRUSHING_GRAVITY = "CRUSHING_GRAVITY",
  TOXIC_ATMOSPHERE = "TOXIC_ATMOSPHERE",
  CORROSIVE_ATMOSPHERE = "CORROSIVE_ATMOSPHERE",
  BREATHABLE_ATMOSPHERE = "BREATHABLE_ATMOSPHERE",
  THIN_ATMOSPHERE = "THIN_ATMOSPHERE",
  JOVIAN = "JOVIAN",
  ROCKY = "ROCKY",
  VOLCANIC = "VOLCANIC",
  FROZEN = "FROZEN",
  SWAMP = "SWAMP",
  BARREN = "BARREN",
  TEMPERATE = "TEMPERATE",
  JUNGLE = "JUNGLE",
  OCEAN = "OCEAN",
  RADIOACTIVE = "RADIOACTIVE",
  MICRO_GRAVITY_ANOMALIES = "MICRO_GRAVITY_ANOMALIES",
  DEBRIS_CLUSTER = "DEBRIS_CLUSTER",
  DEEP_CRATERS = "DEEP_CRATERS",
  SHALLOW_CRATERS = "SHALLOW_CRATERS",
  UNSTABLE_COMPOSITION = "UNSTABLE_COMPOSITION",
  HOLLOWED_INTERIOR = "HOLLOWED_INTERIOR",
  STRIPPED = "STRIPPED",
}

/** The type of waypoint. */
export enum WaypointType {
  PLANET = "PLANET",
  GAS_GIANT = "GAS_GIANT",
  MOON = "MOON",
  ORBITAL_STATION = "ORBITAL_STATION",
  JUMP_GATE = "JUMP_GATE",
  ASTEROID_FIELD = "ASTEROID_FIELD",
  ASTEROID = "ASTEROID",
  ENGINEERED_ASTEROID = "ENGINEERED_ASTEROID",
  ASTEROID_BASE = "ASTEROID_BASE",
  NEBULA = "NEBULA",
  DEBRIS_FIELD = "DEBRIS_FIELD",
  GRAVITY_WELL = "GRAVITY_WELL",
  ARTIFICIAL_GRAVITY_WELL = "ARTIFICIAL_GRAVITY_WELL",
  FUEL_STATION = "FUEL_STATION",
}