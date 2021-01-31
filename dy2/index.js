// 自动打开百度网，手动搜索页面，自动保存医院的名称和网址
// 注意修改保存文件名，避免错误添加到其他文件中
const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const matcht = new RegExp(/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i);


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
  openWeb(page, browser)
}
)()

// 打开搜索结果页面（在主函数里循环执行）
async function openWeb(page, browser){
  await page.waitForTimeout(3000)
  let frame = await page.mainFrame()
  let bodyHandle = await frame.$('html');
  let html = await frame.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose(); 
  const $ = cheerio.load(html)
  let new_page = await browser.newPage();
  $("#container #content_left .result h3 a").each(async function(index, element){
    const url = $(element).attr("href")
    try {
      await new_page.goto(url)
      let web_url = matcht.exec(new_page.url())
      let web_title = await new_page.title()
      fs.appendFileSync("./x6.txt", web_title + ',' + web_url[1] + web_url[2] + os.EOL)
    } catch (error) {
      console.log(error)
    }   
  })
  await page.waitForTimeout(10000)
  try {
    // let pages = await browser.pages();
    // let page = pages[0];
    await page.click('.n:last-child')
    await page.waitForTimeout(3000)
    openWeb(page, browser)
  } catch (error) {
    console.log(error)
    await browser.close()
  }
}

