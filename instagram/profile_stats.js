const puppeteer = require("puppeteer");
const fs = require('fs').promises;
const fetch = require("node-fetch");
const { API } = require("../config");
const { logger, scrapperLogger } = require("../logger");

async function getProfileStats(username) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
  );
  await page.setViewport({ width: 1366, height: 768 });
  // Go to Instagram
  await page.goto("https://www.instagram.com/", { waitUntil: "networkidle2" });
  const cookiesString = await fs.readFile('./cookies.json');
  const cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies);

  await new Promise((r) => setTimeout(r, 2000));
  // Go to the user's profile
  await page.goto(`https://www.instagram.com/${username}/`, {
    waitUntil: "networkidle2",
  });

  // Extract data from the user's profile
  const data = await page.evaluate(() => {
    let username,
      postsCount,
      followersCount,
      followingCount = "";
    try {
      const header = document.querySelector("main header section");
      username = header.children[0].children[0].innerText ?? "";
      postsCount = header.children[2].children[0].innerText ?? "";
      followersCount = header.children[2].children[1].innerText ?? "";
      followingCount = header.children[2].children[2].innerText ?? "";
    } catch (e) {
      logger.error(e);
      console.log(e);
    }

    return {
      username,
      postsCount,
      followersCount,
      followingCount,
    };
  });

  var res = await postDataToMongo(data);
  scrapperLogger.info(`Profile stats for ${username} fetched successfully`);
  await browser.close();
  return Promise.resolve(res);
}



async function postDataToMongo(req){
  var date = new Date();
    const temp = req.followersCount.split(' ')[0].replace(/[0-9]/g, "");
    let followersCount=req.followersCount.replace(/\D/g, "");
    if(temp == 'M'){
      followersCount = req.followersCount.replace(/\D/g, "")*1000000;
    }else if(temp == 'K'){
      followersCount = req.followersCount.replace(/\D/g, "")*1000;
    }
    const temp1 = req.followingCount.split(' ')[0].replace(/[0-9]/g, "");
    let followingCount = req.followingCount.replace(/\D/g, "");
    if(temp1 == 'M'){
      followingCount = req.followingCount.replace(/\D/g, "")*1000000;
    }else if(temp1 == 'K'){
      followingCount = req.followingCount.replace(/\D/g, "")*1000;
    }
    console.log(temp);
    let user =[{
      "user_name": req.username, 
      "name": req.username, 
      "posts": req.postsCount.replace(/\D/g, ""), 
      "followers": followersCount, 
      "following": followingCount, 
      "creation_date": date.toJSON().toString(), 
      "is_private": false, 
      "is_verified": true, 
      "is_business": false,
      }];
      console.log(JSON.stringify(user));
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    }
    try{
      let res = await fetch(API+'api/user', options);
      let data = await res.json();
      scrapperLogger.info(`Profile stats for ${username} posted successfully`);
      return true;
    }catch(e){
      logger.error(e);
      console.log(e);
    }
    return false;
}

// Usage: Pass the username of the profile you want to scrape
// getProfileStats("cristiano");

const args = process.argv.slice(2);
if(args.length == 1){
  getProfileStats(args[0]);
}else{
  console.error("Please provide a username  \nUsage: node instagram/profile_stats.js <username>");
}

module.exports = getProfileStats;

