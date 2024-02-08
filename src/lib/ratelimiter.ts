export class Bucket {
  count: number;
  interval: number;
  current: { count: number, start: number };

  constructor(count: number, interval: number) {
    this.count = count;
    this.interval = interval;
    this.current = { count: 0, start: 0 };
  }

  get expired(): boolean {
    return this.current.start + this.interval < Date.now();
  }

  get remaining(): number {
    return this.expired ? this.count : Math.max(this.count - this.current.count, 0);
  }

  get full(): boolean {
    return !this.remaining;
  }

  add(): void {
    if (this.full) throw Object.assign(new Error('Bucket is full'), { bucket: this });
    if (this.expired) {
      this.current = { count: 1, start: Date.now() };
    } else {
      this.current.count++;
    }
  }
}


export class Ratelimiter {
  #queue: (() => void)[];
  #buckets: Bucket[];

  constructor(buckets: { count: number, interval: number }[]) {
    this.#queue = [];
    this.#buckets = buckets.map(bucket => new Bucket(bucket.count, bucket.interval));
  }

  async #emptyQueue(): Promise<void> {
    while (this.#queue.length) {
      const bucket = this.#buckets.find(bucket => !bucket.full);
      if (bucket) {
        bucket.add();
        this.#queue.shift()!();
        continue;
      }
      const timeout = Math.min(...this.#buckets.map(bucket => bucket.current.start + bucket.interval)) - Date.now();
      await new Promise(resolve => setTimeout(resolve, timeout));
    }
  }
  
  queue(): Promise<void> {
    const promise = new Promise<void>(resolve => this.#queue.push(resolve));
    if (this.#queue.length === 1) this.#emptyQueue();
    return promise;
  }
}