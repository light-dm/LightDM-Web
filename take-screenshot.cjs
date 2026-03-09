const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ 
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light'
  });
  await page.goto('https://momhunting.com', { waitUntil: 'networkidle', timeout: 45000 });
  
  try {
    await page.click('text=Akzeptieren', { timeout: 3000 });
    await page.waitForTimeout(1000);
  } catch (e) {}
  try {
    await page.click('text=Accept', { timeout: 2000 });
    await page.waitForTimeout(1000);
  } catch (e) {}
  try {
    await page.click('text=Alle akzeptieren', { timeout: 2000 });
    await page.waitForTimeout(1000);
  } catch (e) {}
  try {
    await page.click('text=OK', { timeout: 2000 });
    await page.waitForTimeout(1000);
  } catch (e) {}
  try {
    await page.click('[class*="cookie"] button', { timeout: 2000 });
    await page.waitForTimeout(1000);
  } catch (e) {}
  try {
    await page.click('#cookie-accept', { timeout: 1000 });
  } catch (e) {}

  await page.evaluate(() => {
    document.querySelectorAll('[class*="cookie"], [id*="cookie"], [class*="consent"], [id*="consent"], [class*="banner"], [class*="popup"], [class*="overlay"], [class*="modal"]').forEach(el => {
      if (el.textContent && (el.textContent.includes('Cookie') || el.textContent.includes('cookie') || el.textContent.includes('Datenschutz') || el.textContent.includes('privacy'))) {
        el.remove();
      }
    });
    document.querySelectorAll('div[style*="position: fixed"], div[style*="position:fixed"]').forEach(el => {
      if (el.offsetHeight < 400) el.remove();
    });
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
  
  await page.screenshot({ path: 'public/images/momhunting-screenshot.png', fullPage: false, type: 'png' });
  await browser.close();
  console.log('Screenshot saved!');
})();
