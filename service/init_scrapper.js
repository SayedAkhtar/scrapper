const { createClient } = require("redis");
const { logger } = require("../logger.js");
const getProfileStatsApi = require("../instagram/profile_stats.js");
const fetchApiHeaders = require("../instagram/fetch_api_headers.js");
const getProfilePostsFromApi = require("../instagram/profile_posts.js");
const { sleep } = require("../helpers/Utils.js");
const { REFRESH_INTERVAL } = require("../config.js");
const { spawn } = require("child_process");

async function init() {
  let users = [];
  const client = createClient(6379, "127.0.0.1");
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  console.log("Connected to redis");

  try {
    setInterval(async () => {
      const keys = await client.KEYS("*");
      console.log(keys);
      if (keys != undefined && keys.length > 0) {
        // console.log(keys[0].indexOf(':'))
        const user = keys[0].slice(keys[0].indexOf(':')+1);
        await client.del("USER:" + user);
        let userId = await fetchApiHeaders(user);
        if(userId){
          let status = await getProfileStatsApi(userId);
          console.log(status);
          logger.info(`User ${user} deleted from redis`);
          childPostDetails(user);
        }
      } else {
        logger.info(`User ${user} Somthig Wrong fettching data`);
        console.log("No users in redis");
      }
    },100 *  1000);
  } catch (err) {
    logger.error(err.toString());
  }
}

async function runner(users) {
  for (let i = 0; i < users.length; i++) {
    await getProfileStats(users[i]);
  }
}

// init();

const childPostDetails = (username) => {
  const child = spawn("node", ["instagram/profile_posts.js", username]);

  child.stdout.on("data", (data) => {
    logger.info(`${username} (Post Scrapper): ${data}`);
    console.log("StdOut : " + data);
  });

  child.stderr.on("data", (data) => {
    logger.info(`${username} (Post Scrapper): ${data}`);
    console.log("StdError : " + data);
  });

  child.on("exit", (code, signal) => {
    if (code) {
      logger.info(`${username} (Post Scrapper) | Process exited with code : ${code}`);
      console.log("Process exited with code : " + code);
    }
    if (signal) {
      console.log("Process killed with signal : " + signal);
      logger.info(`${username} (Post Scrapper) | Process killed with signal : ${signal}`);
    }
  });
};

init();
