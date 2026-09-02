import puppeteer from 'puppeteer';

(async () => {
  console.log("Starting browser...");
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  console.log("Navigating to /schedule...");
  await page.goto('http://localhost:3000/schedule', { waitUntil: 'domcontentloaded' });
  
  console.log("Waiting for 2s...");
  await new Promise(r => setTimeout(r, 2000));
  
  // Step 1: click a date
  console.log("Clicking date...");
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const dateBtn = btns.find(b => b.innerText.includes('15') || b.innerText.includes('16') || b.innerText.includes('17'));
    if (dateBtn) dateBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Step 2: click a time
  console.log("Clicking time...");
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const timeBtn = btns.find(b => b.innerText.includes('10:00'));
    if (timeBtn) timeBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Step 3: click Continue
  console.log("Clicking Continue...");
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const continueBtn = btns.find(b => b.innerText.includes('Continue'));
    if (continueBtn) continueBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Step 4: fill form and submit
  console.log("Filling form...");
  await page.evaluate(() => {
    const inputs = document.querySelectorAll('input');
    if (inputs.length >= 3) {
      inputs[1].value = 'Test User';
      inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
      inputs[2].value = 'test@example.com';
      inputs[2].dispatchEvent(new Event('input', { bubbles: true }));
    }
    const txt = document.querySelector('textarea');
    if (txt) {
      txt.value = 'Test bottleneck';
      txt.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const btns = Array.from(document.querySelectorAll('button'));
    const confirmBtn = btns.find(b => b.innerText.includes('Confirm'));
    if (confirmBtn) confirmBtn.click();
  });
  
  console.log("Waiting 3s for response...");
  await new Promise(r => setTimeout(r, 3000));
  
  await browser.close();
  console.log("Done.");
})();
