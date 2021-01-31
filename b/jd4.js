const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { Console } = require('console');
const args = process.argv

let p = 0;
fs.appendFileSync("./p4-1.csv",'latest,price,author,title,content,detail'+os.EOL+os.EOL);

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
    openWeb(page, browser)
})()

async function openWeb(page, browser){
    await page.waitForTimeout(30000)
    let frame = await page.mainFrame()
    let bodyHandle = await frame.$('html');
    let html = await frame.evaluate(body => body.innerHTML,bodyHandle);
    await bodyHandle.dispose();
    const $ = cheerio.load(html)
    $('.gl-item').each(function(index, element){
      let item = $(element);
      saveWeb(item, browser)
    })
    await page.click('.pn-next')
    p = p+1
    console.log(p +'page'+ os.EOL)
    openWeb(page)
}

async function saveWeb(item, browser){
  let latest, author, title, content, url, price
  latest = item.find(".p-commit").text().replace(/,/g, ";").replace(/\s+/g, " ");
  author = item.find(".p-shop").text().replace(/,/g, ";").replace(/\s+/g, " ");
  title = item.find(".j_th_tit ").text().replace(/,/g, ";").replace(/\s+/g, " ");
  content = item.find(".p-name.p-name-type-2").text().replace(/,/g, ";").replace(/\s+/g, " ");
  price = item.find(".p-price").text().replace(/,/g, ";").replace(/\s+/g, " ");
  url = item.find(".p-name.p-name-type-2 a").attr("href");
  try{
    let page = await browser.newPage()
    await page.goto('https:' + url);
    let frame = await page.mainFrame()
    let bodyHandle = await frame.$('html');
    let html = await frame.evaluate(body => body.innerHTML,bodyHandle);
    await bodyHandle.dispose();
    let $ = cheerio.load(html)
    let detail = $('body .detail .ETab .tab-con').text().replace(/\s+/g, " ").replace(/,/g, "，")
    fs.appendFileSync("./p4-1.csv",latest + ',' + price + ',' + author + ',' + title + ',' + content + ',' + detail + os.EOL + os.EOL)
    await page.close()
  }catch (error) {
      console.log(error)}
}
