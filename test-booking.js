import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('ERR:', err.message));
  await page.goto('http://localhost:3000/schedule', { waitUntil: 'domcontentloaded' });
  
  await new Promise(r => setTimeout(r, 2000));
  
  await page.evaluate(async () => {
    try {
      const dates = document.querySelectorAll('button');
      for (const b of dates) {
         if (b.innerText.includes('15') || b.innerText.includes('16') || b.innerText.includes('17')) { b.click(); break; }
      }
    } catch(e) {}
  });
  
  await new Promise(r => setTimeout(r, 500));
  
  await page.evaluate(async () => {
    try {
      const times = document.querySelectorAll('button');
      for (const b of times) {
         if (b.innerText.includes('10:00')) { b.click(); break; }
      }
    } catch(e) {}
  });
  
  await new Promise(r => setTimeout(r, 500));
  
  await page.evaluate(async () => {
    try {
      const btns = document.querySelectorAll('button');
      for (const b of btns) {
         if (b.innerText.includes('Continue')) { b.click(); break; }
      }
    } catch(e) {}
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  await page.evaluate(async () => {
    const inputs = document.querySelectorAll('input');
    if (inputs.length > 2) {
      inputs[1].value = 'Test User';
      inputs[2].value = 'test@example.com';
    }
    const txt = document.querySelector('textarea');
    if (txt) txt.value = 'Test bottleneck';
    
    document.querySelectorAll('button').forEach(b => {
         if (b.innerText.includes('Confirm')) b.click();
    });
  });
  
  await new Promise(r => setTimeout(r, 4000));
  
  await browser.close();
})();
