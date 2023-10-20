const { createClient } = require("redis");
const { logger, scrapperLogger } = require("../logger.js");
// const getProfileStatsApi = require("../instagram/profile_stats.js");
// const fetchApiHeaders = require("../instagram/fetch_api_headers.js");
// const getProfilePostsFromApi = require("../instagram/profile_posts.js");
const { sleep } = require("../helpers/Utils.js");
const { REFRESH_INTERVAL } = require("../config.js");
const { spawn } = require("child_process");
// const fetchApiReelsHeaders = require("../instagram/fetch_reels_api_headers.js");
const { userInfo } = require("../instagram/unauthenticated_scripts/user_info.js");
const { getPosts } = require("../instagram/unauthenticated_scripts/profile_all_posts.js");

var POST_THREAD_COUNT = 0;
var REEL_THREAD_COUNT = 0;
async function init() {
  let users = [];
  const client = createClient(6379, "127.0.0.1");
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  console.log("Connected to redis");

  try {
    setInterval(async () => {
      const keys = await client.KEYS("USER:*");
      console.log(keys);
      // const keys = undefined;
      const priority = await client.KEYS("USER_NOW:*");
      console.table(keys, priority);
      if (priority.length > 0 && priority != undefined) {
        const user = priority[0].split(":")[1];
        let res = await main(user);
        if(res || (res == -1)){
          await client.del("USER_NOW:" + user);
        }
      }
      else if (keys != undefined && keys.length > 0) {
        const user = keys[0].split(":")[1];
        let res = await main(user);
        if(res || (res == -1)){
          await client.del("USER:" + user);
        }
      } else {
        logger.info("No users in redis");
        console.log("No users in redis");
      }
    }, 100 * 1000);
  } catch (err) {
    logger.error(err.toString());
  }
}

async function main(user) {
  console.log("Current User : ------------- : "+user);
  if((user != "https" || user.length != 0) && (POST_THREAD_COUNT + REEL_THREAD_COUNT < 10)){
    // let userId = await fetchApiHeaders(user);
    // if(userId == -1){
    //   return -1;
    // }
    let res = await userInfo(user);
    if(res.hasOwnProperty('user_id')){
      childPostDetails(res.user_id, res.posts_count);
      let status = await getPosts(res.user_id, res.posts_count)
      // console.log("Starting Child process for Scrapping "+res.posts_count+" of "+user);
      //return true;
      return status;
    }
  }
  return false;
}

async function runner(users) {
  for (let i = 0; i < users.length; i++) {
    await getProfileStats(users[i]);
  }
}

// init();

const childPostDetails = (username, post_count) => {
  POST_THREAD_COUNT = POST_THREAD_COUNT + 1;
  const child = spawn("node", ["instagram/unauthenticated_scripts/profile_all_posts.js", username]);
  
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
    POST_THREAD_COUNT = POST_THREAD_COUNT - 1;
  });
};

const childReels = (userId, username) => {
  REEL_THREAD_COUNT = REEL_THREAD_COUNT + 1;
  const child = spawn("node", ["instagram/profile_reels.js", userId, username]);
  child.stdout.on("data", (data) => {
    logger.info(`${username} (Reels Scrapper): ${data}`);
    console.log("StdOut : " + data);
  });

  child.stderr.on("data", (data) => {
    logger.info(`${username} (Reels Scrapper): ${data}`);
    console.log("StdError : " + data);
  });

  child.on("exit", (code, signal) => {
    if (code) {
      logger.info(`${username} (Reels Scrapper) | Process exited with code : ${code}`);
      console.log("Process exited with code : " + code);
    }
    if (signal) {
      console.log("Process killed with signal : " + signal);
      logger.info(`${username} (Reels Scrapper) | Process killed with signal : ${signal}`);
    }
    REEL_THREAD_COUNT = REEL_THREAD_COUNT - 1;
  });
};

init();
