const puppeteer = require("puppeteer");
const fs = require("fs");

(async function main() {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const url = '' //enter URL here
        const page = await browser.newPage();
        await page.goto(url, { timeout: 0, waitUntil: 'load' });
        const cdp = await page.target().createCDPSession();
        const title = page.title();
        const { data } = await cdp.send('Page.captureSnapshot', { format: 'mhtml' });
        fs.writeFileSync(`Scraped-Pages/${title}.mhtml`, data);
        console.log(`${title} Scraped`);
        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();