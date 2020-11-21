const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({

        headless: false

    })

    const page = await browser.newPage()

    await page.goto('https://www.pigai.org/')

    await page.type("#username","13671220074")
    await page.type("#password","dudu2002")

    await page.waitFor(30000)
    await page.type("#contents","As a college student, how to succeed on campusCampus life is our most precious time. We should learn to cherish it, especially college life. In our university life, we can participate in various societies or activities. These activities can help you broaden your horizons and make you more and more knowledgeable. More importantly, you can gain a lot of experience in communicating with people. In addition, if possible, you can learn more about what you need in the future.Cherish your college life, you can benefit a lot from it.")

})()
