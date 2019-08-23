import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    // -> Uma fila para cada background de fila
    this.queues = {};
    this.init();
  }

  // -> Todos os trabalhos que ficam dentro de filas sao chamados de jobs
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        // fila
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // -> adc na fila
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // -> processando os jobs
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.process(handle);
    });
  }
}

export default new Queue();
