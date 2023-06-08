const puppeteer = require("puppeteer");
const fs = require("fs").promises;

async function getPostStats(postUrl) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
  );
  await page.setViewport({ width: 1366, height: 768 });
  // Go to Instagram
  await page.goto("https://www.instagram.com/", { waitUntil: "networkidle2" });
  const cookiesString = await fs.readFile("./cookies.json");
  const cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies);
  await new Promise((r) => setTimeout(r, 2000));
  // Go to the user's profile
  await page.goto(postUrl, {
    waitUntil: "networkidle2",
  });

  const pageData = await page.evaluate(() => {
    let dataMap = [];
    try {
      const imgList = document
        .querySelector("main")
        .querySelector("[role=button]")
        .querySelectorAll("img");
      const videoList = document
        .querySelector("main")
        .querySelector("[role=button]")
        .querySelectorAll("video");
      const description = document
        .querySelector("main")
        .querySelector("ul")
        .querySelector("li").textContent;
      if (imgList != undefined || imgList.length > 0) {
        for (let i = 0; i < imgList.length; i++) {
          console.log(imgList[i].src);
        }
      }

      if (videoList != undefined || videoList.length > 0) {
        for (let i = 0; i < videoList.length; i++) {
          console.log(videoList[i].src);
        }
      }
    } catch (e) {
      console.log(e);
    }

    return dataMap;
  });
  console.log(pageData);
  await browser.close();
}

// Usage: Pass the username of the profile you want to scrape
getPostStats("https://www.instagram.com/p/Cr3nFlFI-1p/");
