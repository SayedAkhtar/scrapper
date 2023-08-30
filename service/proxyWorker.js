const axios = require('axios');
const fs = require('fs');
const { workerData, parentPort } = require('worker_threads');

function checkProxy(proxy) {
    return new Promise(async (resolve) => {
        try {
            const response = await axios.get('http://ipinfo.io/json', {
                proxy: {
                    host: proxy.host,
                    port: proxy.port,
                },
                timeout: 5000, // Set a timeout for the request in milliseconds
            });
            resolve(true);
            // console.log(`Proxy ${proxy.host}:${proxy.port} is working`);
        } catch (error) {
            resolve(false);
            // console.error(`Proxy ${proxy.host}:${proxy.port} is not working`);
        }
    });
}

const workerProxies = workerData;
const workingProxies = [];

async function run() {
  for (const proxyString of workerProxies) {
    const [host, port] = proxyString.split(':');
    const proxy = { host, port: parseInt(port) };

    const isWorking = await checkProxy(proxy);
    if (isWorking) {
      workingProxies.push(proxyString);
    }

    parentPort.postMessage({ proxy: proxyString, isWorking });
  }

  // Write working proxies back to the file
  fs.writeFileSync('working_proxies.txt', workingProxies.join('\n'));
}

run();
