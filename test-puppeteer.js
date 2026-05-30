import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://127.0.0.1:8000/our-menu', { waitUntil: 'networkidle0' });

  // Wait a bit for animations
  await new Promise(r => setTimeout(r, 2000));

  // Get elements that are positioned weirdly or might cause a black box on the left
  const elements = await page.evaluate(() => {
    const all = document.querySelectorAll('*');
    const out = [];
    for (let el of all) {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      // Check if it's on the left, dark colored, or causing weird offsets
      if (rect.width > 0 && rect.height > 0) {
        if (rect.left < 0 || style.backgroundColor === 'rgb(0, 0, 0)' || style.backgroundColor.includes('rgba(0, 0, 0') || el.className.includes('pin-spacer')) {
           out.push({
             tag: el.tagName,
             class: el.className,
             rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
             bg: style.backgroundColor
           });
        }
      }
    }
    return out;
  });
  console.log("Elements exceeding bounds or with black bg:", elements);
  
  // also get the body margin
  const bodyStyle = await page.evaluate(() => {
    return {
      margin: window.getComputedStyle(document.body).margin,
      padding: window.getComputedStyle(document.body).padding,
      width: document.body.clientWidth,
      windowWidth: window.innerWidth
    };
  });
  console.log("Body metrics:", bodyStyle);

  // Take screenshot
  await page.screenshot({ path: 'menu-screenshot.png' });

  await browser.close();
})();
