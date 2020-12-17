const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({

        headless: false

    })

    const page = await browser.newPage()

    await page.goto('https://sso.unipus.cn/sso/login?service=https%3A%2F%2Fu.unipus.cn%2Fuser%2Fcomm%2Flogin%3Fschool_id%3D')

    await page.waitForTimeout(3000)
    await page.type("input.form-control","13671220074")
    await page.type("input[name='password']","dudu2002")
    await page.click('#login')
})()
