const puppeteer = require("puppeteer");
const fs = require("fs").promises;

// Nmgq9Z4)49h(+W;
// https://www.instagram.com/_daani.____/
const USERNAME = "intel_00_00";
const PASSWORD = "Fxpayservices";

const loginToInstagram = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      `--disable-extension-except=/extensions/cookie-blocker`,
      `--load-extension=/extensions/cookie-blocker`,
      '--proxy-server=http://49.51.184.233:8080'
    ]
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
  );
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto("https://instagram.com", { waitUntil: "networkidle2" });
  await page.waitForSelector('input[name="username"]');
  await page.waitForSelector('input[name="password"]');
  await page.waitForSelector('button[type="submit"]');
  console.log("Page loaded");
  // const [element] = await page.$x('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div[2]/div/div/div/div/div[2]/div/button[1]');
  // await element.click();
  // await page.waitForNavigation();
  await page.screenshot({ path: "example.png" });
  await page.type('input[name="username"]', USERNAME);
  await page.type('input[name="password"]', PASSWORD);
  await page.screenshot({ path: "step1.png" });
  await page.click('button[type="submit"]');
  await page.screenshot({ path: "step2.png" });
  await page.waitForNavigation();
  await page.screenshot({ path: "step3.png" }); 
  await page.goto(`https://www.instagram.com/`, { waitUntil: "networkidle2" });
  await page.screenshot({ path: "step4.png" });
  const cookies = await page.cookies();
  await fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));

  await browser.close();
};

loginToInstagram();
