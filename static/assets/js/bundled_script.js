(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Remove the require statements for 'puppeteer' and 'fs'
// ...

// Add a function to handle the Puppeteer code
async function captureScreenshot() {
    const urlInput = document.getElementById('url');
    const url = urlInput.value;

    if (!url) {
        alert('Please enter a URL.');
        return;
    }

    console.log("Valid URL: " + url);
    console.log("Valid URL");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
   // Replace with the actual URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitForSelector('body');

    // Hide header and footer elements using JavaScript in the browser context
    const script = `
        var header = document.querySelectorAll('header');
        var footer = document.querySelector('footer');
        header.forEach(element => {
            element.style.display = 'none';
        });

        footer.style.display = 'none';
    `;
    await page.evaluate(script);

    // Calculate the total height of the page
    const totalHeight = await page.evaluate(() => {
        return Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
    });

    // Set the viewport size to capture the full page
    await page.setViewport({ width: 1400, height: totalHeight });

    await page.waitForTimeout(1000); // Use this instead of time.sleep

    // Capture a full-page screenshot
    const screenshotPath = 'fullpage_screenshot.png';
    const screenshotData = await page.screenshot({ fullPage: true });

    // Close the browser
    await browser.close();

    // Display the screenshot or perform other actions with the data
    // ...
}
document.addEventListener('DOMContentLoaded', function() {
    const captureButton = document.querySelector('button');
    captureButton.addEventListener('click', captureScreenshot);
});
},{}]},{},[1]);
