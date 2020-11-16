爬虫应用

puppeteer的等待操作
    waitForSelector()
    waitForFunction()
    waitForXPath()

    await page.waitFor(5000);

    await page.waitForFunction(() => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        return username.length !== 0 && password.length !== 0;
    });

    await page.type('#username', 'username');
    await page.type('#password', 'password');
    await page.click('#login');
    await page.waitForNavigation();

    await page.type('[name="wd"]','自动抓站',{delay : 100});
    await page.click('#su');
    await page.waitFor('.result.c-container:nth-child(1)>h3>a');

    const pages = await browser.pages();
    const newPage = pages[2];

