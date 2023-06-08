const puppeteer = require("puppeteer");
const fs = require('fs').promises;

async function getProfileStats(username) {
  const browser = await puppeteer.launch({ headless: false });
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
      console.log(e);
    }

    return {
      username,
      postsCount,
      followersCount,
      followingCount,
    };
  });

  console.log(data);

  await browser.close();
}

// Usage: Pass the username of the profile you want to scrape
getProfileStats("cristiano");
