import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  await page.goto('http://localhost:3000/booking', { waitUntil: 'networkidle0' });
  
  // Try to submit the booking form
  await page.evaluate(async () => {
    try {
      const { db } = await import('/src/utils/database.ts');
      await db.saveEntry('lead', { test: true });
      console.log('DB Save Success');
    } catch(e) {
      console.log('DB Save Error:', e.message);
    }
  });
  
  await browser.close();
})();
