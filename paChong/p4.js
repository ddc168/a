// 自动打开百度网，手动搜索页面，自动保存医院的名称和网址
// 注意修改保存文件名，避免错误添加到其他文件中
const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

// 浏览器打开百度网，在搜索框中输入关键词
(async () => { 
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {width:1000, height:1000},
    args: ['--start-maximized']
  })
  let pages = await browser.pages();
  let page = pages[0];
  await page.goto('https://www.baidu.com/')
  pages = await browser.pages();
  await page.type('#kw', '服装')
  await page.click('#su')
  openWeb(page)
}
)()

// 打开搜索结果页面（在主函数里循环执行）
async function openWeb(page){
  await page.waitForTimeout(3000)
  let frame = await page.mainFrame()
  let bodyHandle = await frame.$('html');
  let html = await frame.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose(); 
  const $ = cheerio.load(html)
  // let stop = true
  $("#container #content_left .result h3 a").each(function(index, element){
    const item = $(element);
    // if(stop){
      try {
        // console.log(item.text())
        // console.log(item.attr("href"))
        fs.appendFileSync("./docs/服装.txt", item.text() + os.EOL + item.attr("href") + os.EOL)
      } catch (error) {
        console.log(error)
      }
    // }
    // stop = false
  })
  await page.click('.n:last-child')
  openWeb(page)
}

