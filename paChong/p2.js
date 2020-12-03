// 自动打开顶点小说网，手动搜索页面，自动保存章节列表的内容
// 注意修改保存文件名，避免错误添加到其他文件中
const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

// 浏览器打开知网
(async () => { 
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {width:1400, height:1200},
    args: ['--start-maximized']
  })
  let pages = await browser.pages();
  let page = pages[0];
  await page.goto('https://www.23us.com/')
  await page.waitForTimeout(3000)
  pages = await browser.pages();
  page = pages[1];
  openWeb(page)
}
)()

// 打开搜索结果页面（在主函数里循环执行）
async function openWeb(page){
  // console.log(page.url())
  let frame = await page.mainFrame()
  let bodyHandle = await frame.$('html');
  let html = await frame.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose(); 
  const $ = cheerio.load(html)
  // let stop = true
  // console.log($("#a_main #at").text())
  $("#a_main #at .L a").each(function(index, element){
    const item = $(element);
    // if(stop){
      try {
        console.log(item.text())
        // console.log(page.url() + item.attr("href"))
        fetch(page.url() + item.attr("href")).then(
          res => res.textConverted()).then(data => saveWeb(data))
      } catch (error) {
        console.log(error)
      }
    // }
    // stop = false
  })
}

// 保存《知网列表详细页面》清洗后的网页内容到csv文件
function saveWeb(html){
  const $ = cheerio.load(html)
  let content = $("#amain h1").text() + os.EOL + $("#contents").text() + os.EOL
  fs.appendFileSync("./docs/xx.txt", content)
}
