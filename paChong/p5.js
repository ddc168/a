// 自动打开p4.js从百度网搜索下载的链接地址，在puppeteer打开页面，自动保存医院的名称和网址
// 注意修改保存文件名，避免错误添加到其他文件中
const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const readline = require('line-read');

// 浏览器打开百度网，在搜索框中输入关键词
(async () => { 
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {width:1000, height:1000},
    args: ['--start-maximized']
  })
  let pages = await browser.pages();
  let page = pages[0];
  // for (i in readline.readLineFromFile("./docs/医院.txt").line){
  //   console.log(i)
  //   //   openWeb(page, url)
  // }
}
)()

// 打开搜索结果页面（在主函数里循环执行）
async function openWeb(page, url){
  await page.goto(url)
  await page.waitForTimeout(5000)
  let frame = await page.mainFrame()
  let bodyHandle = await frame.$('html');
  let html = await frame.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose(); 
  const $ = cheerio.load(html)
  try {
    console.log($.title())
    console.log($.href())
    fs.appendFileSync("./docs/x5.txt", $.title() + '    ' + $.href() + os.EOL + os.EOL)
  } catch (error) {
    console.log(error)
  }
}

