export interface SchedulerTask {
  scheduledFor: number;
  callback: () => void;
}

export class Scheduler {
  tasks: SchedulerTask[];
  #timeout?: NodeJS.Timeout;
  #running = false;
  
  constructor() {
    this.tasks = [];
  }

  schedule(callback: () => void, timestamp = Date.now()): void {
    const scheduledFor = Math.max(timestamp, Date.now());
    let placeToInsert = this.tasks.findIndex(task => task.scheduledFor > timestamp);
    if (placeToInsert === -1) placeToInsert = this.tasks.length;
    
    this.tasks.splice(placeToInsert, 0, {
      callback,
      scheduledFor,
    });
    
    if (placeToInsert === 0) this.stop();
    if (!this.#running) this.start();
  }

  start() {
    if (this.#running || !this.tasks.length) return;

    const callback = async () => {
      const task = this.tasks.shift()!;
      task.callback();
      
      if (!this.tasks.length) return this.stop();
      this.#timeout = setTimeout(callback, this.tasks[0].scheduledFor - Date.now());
    }

    this.#timeout = setTimeout(callback, this.tasks[0].scheduledFor - Date.now());
    this.#running = true;
  }

  stop() {
    if (this.#running) {
      clearTimeout(this.#timeout);
      this.#running = false;
    };
  }
}