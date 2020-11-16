const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width:1400, height:1200},
        args: ['--start-maximized']
    })
//     const page = await browser.newPage()
    const pages = await browser.pages();
    const page = pages[0];
    // await page.goto('https://www.baidu.com/')
    await page.goto('https://www.cnki.net/')
    await page.type("#txt_SearchText", "北京服装学院")
    await page.keyboard.press("Enter")
    await page.waitForTimeout(5000)
    console.log("打开搜索结果页面")

    let frame = await page.mainFrame()
    let bodyHandle = await frame.$('html');
    let html = await frame.evaluate(body => body.innerHTML, bodyHandle);
    await bodyHandle.dispose(); 
    saveWeb(html)
})()

// 保存清洗后的网页内容到mongodb数据库
function saveWeb(html){
    const $ = cheerio.load(html)
    // const text = $("body").text().replace(/\s*/g,'')
    // console.log(text)
    let link, name, author, source, date, data = ""
    $("#gridTable .result-table-list tr.odd").each(function(index, element){
      const item = $(element);
      link = item.find(".name a").attr("href")
        name = item.find(".name a").text()
        author = item.find(".author a").text();
        source = item.find(".source a").text();
        date = item.find(".date").text();
        data = item.find(".data").text();
      const matcht = new RegExp(/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i)
      const result = matcht.exec(link)
      console.log(name)
      if(name && name != ""){
        // Site.insert({ link: link, title: title, desc: desc, host:host })
      }
    })
  }