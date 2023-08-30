const axios = require('axios');
const fs = require('fs');
const { resolve } = require('path');
const proxyWorker = require('worker_threads');

async function checkProxy(proxy) {
  try {
    const response = await axios.get('http://ipinfo.io/json', {
      proxy: {
        host: proxy.host,
        port: proxy.port,
      },
      timeout: 5000, // Set a timeout for the request in milliseconds
    });
    resolve(true);
    console.log(`Proxy ${proxy.host}:${proxy.port} is working`);
  } catch (error) {
    resolve(false);
  }
}

async function checkProxiesFromFile(filePath, workerCount) {
  try {
    const proxies = fs.readFileSync(filePath, 'utf-8')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const chunkSize = Math.ceil(proxies.length / workerCount);

    const workers = [];
    for (let i = 0; i < workerCount; i++) {
      const startIdx = i * chunkSize;
      const endIdx = startIdx + chunkSize;
      const workerProxies = proxies.slice(startIdx, endIdx);

      const worker = new proxyWorker.Worker('./service/proxyWorker.js', {
        workerData: workerProxies,
      });

      workers.push(worker);
    }

    workers.forEach(worker => {
      worker.on('message', message => {
        const { proxy, isWorking } = message;
        if (!isWorking) {
          console.log(`Proxy ${proxy} is not working and will be removed.`);
        }
      });

      worker.on('error', error => {
        console.error('Worker error:', error);
      });

      worker.on('exit', code => {
        if (code !== 0) {
          console.error(`Worker exited with code ${code}`);
        }
      });
    });
  } catch (error) {
    console.error('Error reading proxy file:', error);
  }
}

// Usage: Pass the path to the text file containing the proxy list
const proxyFilePath = 'proxies.txt';
const numberOfWorkers = 4;
checkProxiesFromFile(proxyFilePath, numberOfWorkers);
