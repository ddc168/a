const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { Console } = require('console');
const args = process.argv

let p = 0;
fs.appendFileSync("./p1.csv",'latest,price,author,title,content'+os.EOL+os.EOL);
fs.appendFileSync("./p2.csv",'latest,price,author,title,content'+os.EOL+os.EOL);
(async()=>{
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width:1000,height:1000},
        args: ['--start-maximized']
    })
    let pages = await browser.pages();
    let page = pages[0];
    await page.goto('https://www.jd.com');
    await page.type('#key', args[2]);
    await page.click('.button')
    await page.waitForTimeout(3000)
    openWeb(page)
})()
async function openWeb(page){
    await page.waitForTimeout(3000)
    let frame = await page.mainFrame()
    let bodyHandle = await frame.$('html');
    let html = await frame.evaluate(body => body.innerHTML,bodyHandle);
    await bodyHandle.dispose();
    const $ = cheerio.load(html)
    $('.gl-item').each(
        function(index,element){
            const item = $(element);
            let latest, author, title, content, url, price
            latest = item.find(".p-commit").text().replace(/,/g, ";").replace(/\s+/g, " ");
            author = item.find(".p-shop").text().replace(/,/g, ";").replace(/\s+/g, " ");
            title = item.find(".j_th_tit ").text().replace(/,/g, ";").replace(/\s+/g, " ");
            content = item.find(".p-name.p-name-type-2").text().replace(/,/g, ";").replace(/\s+/g, " ");
            price = item.find(".p-price").text().replace(/,/g, ";").replace(/\s+/g, " ");
            url = item.find(".p-name.p-name-type-2 a").attr("href");
            try{
                if(true){
                    fs.appendFileSync("./p1-3.csv",latest + ',' + price + ',' + author + ',' + title + ',' + content + os.EOL + os.EOL)
                    fetch('https:' + url).then(
                        res => res.textConverted()).then(data => saveWeb(data))
                }
            }catch (error) {
                console.log(error)}
        }
    )
    await page.click('.pn-next')
    p = p+1
    console.log(p +'page'+ os.EOL)
    openWeb(page)
}
function saveWeb(html){
    const $ = cheerio.load(html)
    let title = $(".sku-name").text().replace(/,/g, ";").replace(/\s+/g, " ")
    let author = $(".item .name").text().replace(/,/g, ";").replace(/\s+/g, " ")
    let price1 = $(".summary-price.J-summary-price .dd").text().replace(/,/g, ";").replace(/\s+/g, " ")
    // console.log($().text().replace(/,/g, ";").replace(/\s+/g, " "))
    fs.appendFileSync("./p2-3.csv", author + ',' + title + ',' + price1 + ',' + os.EOL + os.EOL)
  }