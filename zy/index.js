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
    await page.type("#contents","I think it's normal to be stressed in college. When we face a mountain of pressure. Heavy study and embarrassing life are the sources of our stress. So how to deal with the pressure from school? I don't think stress is terrible, just like a double-edged sword. There are both advantages and disadvantages. Moderate pressure can be the driving force for us to move forward and inspire us to move forward bravely. However, excessive pressure may also crush the defense lines in our hearts, which means that our hearts collapse. If the pressure is caused by poor study, what we should do is to find out the reasons for weak academic performance and ask those students who study well for advice. Spend more time on study. When the study progresses, the pressure will disappear. We can also talk to our friends about our troubles, and the pressure will be relieved. Learn to relax yourself and relax your heart. In a word, pressure is inevitable, so we should have confidence in ourselves and face it positively.")

})()
