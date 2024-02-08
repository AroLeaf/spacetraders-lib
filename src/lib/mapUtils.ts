export class MapUtils {
  static map<K, V>(map: Map<K, V>, mapper: (v: V, k: K, map: Map<K,V>) => V, thisArg?: any) {
    if (thisArg) mapper = mapper.bind(thisArg);
    for (const [k, v] of map) {
      map.set(k, mapper(v, k, map));
    }
  }

  static filter<K, V>(map: Map<K, V>, filter: (v: V, k: K, map: Map<K,V>) => V, thisArg?: any) {
    if (thisArg) filter = filter.bind(thisArg);
    for (const [k, v] of map) {
      if (!filter(v, k, map)) map.delete(k);
    }
  }
}