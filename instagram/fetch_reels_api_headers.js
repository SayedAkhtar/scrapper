const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const fetch = require("node-fetch");
const { API } = require("../config");
const { logger, scrapperLogger } = require("../logger");

const fetchApiReelsHeaders = async (username = "") => {
  const browser = await puppeteer.launch({
    headless: "new",
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  page.setRequestInterception(true);
  page.on("request", async (interceptedRequest) => {
    if (interceptedRequest.isInterceptResolutionHandled()) return;
    var url = interceptedRequest.url();
    // console.log(typeof url);
    if (url.indexOf("user/") > 0) {
      let headers = interceptedRequest.headers();
      await fs.writeFile("./reels_headers.json", JSON.stringify(headers, null, 2));
    }
    interceptedRequest.continue();
  });

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
  );
  await page.setViewport({ width: 1366, height: 768 });
  const cookiesString = await fs.readFile("./cookies.json");
  const cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies);
  await page.goto("https://instagram.com", { waitUntil: "networkidle2" });
  const buttonElement = await page.$$("button");
  for (let t of buttonElement) {
    let text = await page.evaluate((el) => el.textContent, t);
    if (text == "Not Now") {
      await t.click();
    }
  }
  await page.goto(`https://www.instagram.com/${username}/reels`, {
    waitUntil: "networkidle2",
  });
  await page.evaluate(() => {
    window.scrollTo(0, window.document.body.scrollHeight);
  });
  browser.close();

  const headerString = await fs.readFile("./headers.json");
  const header = JSON.parse(headerString);
  const headerObj = Object.entries(header).map(
    ([name, value]) => `${name}=${value}`
  );
  const data = headerObj.join("; ");

  let fetchUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
    try{
      var res = await fetch(fetchUrl, {
        headers: header,
        referrer: `https://www.instagram.com/${username}/`,
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      if(res.status == 200){
        var body = await res.json();
        console.log(body.data.user.id);
        return body.data.user.id;
      }
      
    }catch (e){
      logger.info(`Error while fetching headers for ${username}  : ${e.toString()}}`);
    }
  
    return Promise.resolve(false);
  
};


module.exports = fetchApiReelsHeaders;

// fetchApiReelsHeaders("virat.kohli");
