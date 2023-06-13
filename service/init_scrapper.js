const { createClient } = require("redis");
const { logger } = require("../logger.js");
const getProfileStats = require("../instagram/profile_stats.js");
const getProfilePostsFromApi = require("../instagram/profile_posts.js");
const { sleep } = require("../helpers/Utils.js");
const { REFRESH_INTERVAL } = require("../config.js");

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
    if(keys != undefined && keys.length > 0){
        const user = keys[0].split(":")[1];
        let status = await getProfileStats(user);
        await client.del("USER:" + user);
        logger.info(`User ${user} deleted from redis`);
    }else{
        console.log("No users in redis");
    }
    
    // if (status) {
    //   let s = await getProfilePostsFromApi(user);
    // }
    }, 100 * 1000);
  } catch (err) {
    logger.error(err.toString());
  }
}

async function runner(users) {
  for (let i = 0; i < users.length; i++) {
    await getProfileStats(users[i]);
  }
}

init();
