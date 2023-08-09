const puppeteer = require('puppeteer-extra');
const utils = require('./helpers/Utils');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// puppeteer usage as normal
puppeteer.launch({ headless: 'new' }).then(async browser => {
  console.log('Check the bot tests..');
  const page = await browser.newPage();
  await page.goto('https://bot.sannysoft.com');
  await utils.sleep(5);
  await page.screenshot({ path: 'bot-test-result.png', fullPage: true });
  await browser.close();
  console.log(`All done, check the bot result screenshot. `);
});