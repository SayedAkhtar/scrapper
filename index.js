const puppeteer = require("puppeteer");
const fs = require("fs").promises;

// Nmgq9Z4)49h(+W;
// https://www.instagram.com/_daani.____/
const USERNAME = "intel_00_00";
const PASSWORD = "Fxpayservices";

const loginToInstagram = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
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
  await page.screenshot({ path: "example.png" });
  await page.type('input[name="username"]', USERNAME);
  await page.type('input[name="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  await page.goto(`https://www.instagram.com/`, { waitUntil: "networkidle2" });
  const cookies = await page.cookies();
  await fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));

  await browser.close();
};

loginToInstagram();
