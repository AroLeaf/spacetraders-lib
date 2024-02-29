import { ApiTypes } from '../../api';
import { Component } from './component';
import { Ship } from '..';

export class Mount extends Component implements ApiTypes.ShipMount {
  symbol: 'MOUNT_GAS_SIPHON_I' | 'MOUNT_GAS_SIPHON_II' | 'MOUNT_GAS_SIPHON_III' | 'MOUNT_SURVEYOR_I' | 'MOUNT_SURVEYOR_II' | 'MOUNT_SURVEYOR_III' | 'MOUNT_SENSOR_ARRAY_I' | 'MOUNT_SENSOR_ARRAY_II' | 'MOUNT_SENSOR_ARRAY_III' | 'MOUNT_MINING_LASER_I' | 'MOUNT_MINING_LASER_II' | 'MOUNT_MINING_LASER_III' | 'MOUNT_LASER_CANNON_I' | 'MOUNT_MISSILE_LAUNCHER_I' | 'MOUNT_TURRET_I';
  strength?: number;
  deposits?: ('QUARTZ_SAND' | 'SILICON_CRYSTALS' | 'PRECIOUS_STONES' | 'ICE_WATER' | 'AMMONIA_ICE' | 'IRON_ORE' | 'COPPER_ORE' | 'SILVER_ORE' | 'ALUMINUM_ORE' | 'GOLD_ORE' | 'PLATINUM_ORE' | 'DIAMONDS' | 'URANITE_ORE' | 'MERITIUM_ORE')[];

  constructor(ship: Ship, data: ApiTypes.ShipMount) {
    super(ship, data as ApiTypes.ShipMount);
    this.symbol   = data.symbol;
    this.strength = data.strength;
    this.deposits = data.deposits;
  }
}