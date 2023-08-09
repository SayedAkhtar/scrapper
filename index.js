const puppeteer = require("puppeteer-extra");
const fs = require("fs").promises;
const Utils = require('./helpers/Utils')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: '819d06a591934f851e0b973198711fd5' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
  })
)
// Nmgq9Z4)49h(+W;
// https://www.instagram.com/_daani.____/
const USERNAME = "nandhini123156";
const PASSWORD = "Fxpayservices";

// puppeteerExtra.use(StealthPlugin());
const loginToInstagram = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      `--disable-extension-except=/extensions/cookie-blocker`,
      `--load-extension=/extensions/cookie-blocker`,
    ]
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
  );
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto("https://instagram.com/", { waitUntil: "networkidle2" });
  await page.screenshot({ path: "example.png" });
 
  let moveForward = true;
  const element = await page.$x("//button[text()='Allow all cookies']");
  if(element[0] != undefined){
    await element[0].click();
    moveForward = false;
  }
  // await page.waitForSelector(element[0], {hidden: true});
  do{
    let e = await page.$x("//button[text()='Allow all cookies']");
    if(e[0] == undefined){
      moveForward = true;
    }
    await Utils.sleep(2);
  }while(!moveForward)

  await page.waitForSelector('input[name="username"]');
  await page.waitForSelector('input[name="password"]');
  await page.waitForSelector('button[type="submit"]');
  console.log("Page loaded");
  // const [element] = await page.$x('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div[2]/div/div/div/div/div[2]/div/button[1]');
  // await element.click();
  // await page.waitForNavigation();
  
  await page.type('input[name="username"]', USERNAME);
  await page.type('input[name="password"]', PASSWORD);
  await page.screenshot({ path: "step1.png" });
  await page.click('button[type="submit"]');
  await page.screenshot({ path: "step2.png" });
  await page.waitForNavigation();
  await page.screenshot({ path: "step3.png" }); 

  for (const frame of page.mainFrame().childFrames()) {
    // Attempt to solve any potential captchas in those frames
    await frame.solveRecaptchas()
  }


await Promise.all([
// page.waitForNavigation(),
page.click(`button[type="button"]`)
])
  
  await page.goto("https://www.instagram.com/", { waitUntil: "networkidle2" });
  await page.waitForNavigation();
  await page.screenshot({ path: "step4.png" });
  const cookies = await page.cookies();
  console.log(cookies);
  await fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));

  await browser.close();
};

loginToInstagram();
