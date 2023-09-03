const { Worker, isMainThread, parentPort } = require('worker_threads');

const workerScriptPath = './workerScript.js';

if (isMainThread) {
  const workers = [];

  for (let i = 0; i < 10; i++) {
    const worker = new Worker(workerScriptPath);
    workers.push(worker);
  }

  workers.forEach((worker, index) => {
    worker.on('message', message => {
      console.log(`Worker ${index} says: ${message}`);
    });
    worker.postMessage(`Hello from main to Worker ${index}`);
  });
} else {
  parentPort.on('message', message => {
    // Your worker script logic here
    parentPort.postMessage(`Worker received: ${message}`);
  });
}
