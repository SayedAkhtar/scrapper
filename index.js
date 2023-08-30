const puppeteer = require("puppeteer-extra");
const fs = require("fs").promises;
const Utils = require('./helpers/Utils')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const USERNAME = "g290050632";
const PASSWORD = "Fxpros@9";

// puppeteerExtra.use(StealthPlugin());
const loginToInstagram = async () => {
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: '819d06a591934f851e0b973198711fd5'
      },
      visualFeedback: true
    })
  )
  puppeteer.use(StealthPlugin());  
  const browser = await puppeteer.launch({
    headless: 'new',
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
    await Utils.sleep(1);
  }while(!moveForward)

  await page.waitForSelector('input[name="username"]');
  await page.waitForSelector('input[name="password"]');
  await page.waitForSelector('button[type="submit"]');
  console.log("Page loaded");
  
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
  
  await page.goto("https://www.instagram.com/"+USERNAME, { waitUntil: "networkidle2" });
  await Utils.sleep(1);
  const f = await page.$('main header h2');
  const text = await (await f.getProperty('textContent')).jsonValue()
  console.log(text);
  if(text == USERNAME){
    console.log("Login Success");
  }else{
    console.log("Login Failed");
  }
  await page.screenshot({ path: "step4.png" });
  const cookies = await page.cookies();
  await fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));
  await browser.close();
};

loginToInstagram();
