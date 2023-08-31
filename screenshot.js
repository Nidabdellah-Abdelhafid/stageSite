const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
    console.log("Valid URL");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = process.argv[2]; // Replace with the actual URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitForSelector('body');

    const script = `
        var header = document.querySelectorAll('header');
        var footer = document.querySelector('footer');
        header.forEach(element => {
            element.style.display = 'none';
        });

        footer.style.display = 'none';
    `;

    await page.evaluate(script);

    const totalHeight = await page.evaluate(() => {
        return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    });

    await page.setViewport({ width: 1400, height: totalHeight });

    await page.waitForTimeout(1000); // Use this instead of time.sleep

    const screenshotPath = 'fullpage_screenshot.png';
    await page.screenshot({ path: "static/img/" + screenshotPath, fullPage: true });

    await browser.close();

    // Open the image using Jimp
    // Call the function with the path to your image
    // Replace 'fullpage_screenshot.png' with your image file path

})();
