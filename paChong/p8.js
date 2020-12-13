// 自动打开淘宝商城网，手动搜索商品页面，自动保存商品的详细信息
// 注意修改保存文件名，避免错误添加到其他文件中
const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

// 浏览器打开淘宝商城网，在搜索框中输入关键词
(async () => { 
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {width:1000, height:1000},
    args: ['--start-maximized']
  })
  let pages = await browser.pages();
  let page = pages[0];
  await page.goto('https://www.taobao.com/')
  pages = await browser.pages();
  await page.waitForTimeout(30000)
  // 手动登录，然后输入商品搜索关键词
  // await page.type('#J_TSearchForm input', '汉服')
  // await page.click('#J_TSearchForm button')
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
  $("#main #mainsrp-itemlist .items div").each(function(index, element){
    const item = $(element);
    let name, price, commit, shop, url, location
    name = item.find(".J_ClickStat").text().replace(/,/g, ";").replace(/\s+/g, " ");
    price = item.find(".price").text().replace(/,/g, ";").replace(/\s+/g, " ");
    commit = item.find(".deal-cnt").text().replace(/,/g, ";").replace(/\s+/g, " ");
    shop = item.find(".shop").text().replace(/,/g, ";").replace(/\s+/g, " ");
    location = item.find(".location").text().replace(/,/g, ";").replace(/\s+/g, " ");
    url = item.find(".pic a").attr("href");
    if(url && name.length > 2){
      try {
        if(url.slice(0,2) == '//'){
          url = 'https:' + url
        }
        console.log(name, price, commit, shop, location, url)
        fs.appendFileSync("./docs/淘宝-汉服.csv", name + ',' + price + ',' + 
          commit + ',' + shop + ',' + location + ',' + url + os.EOL)
        // fetch(url).then(res => res.textConverted()).then(data => saveWeb(data))
      } catch (error) {
        console.log(error)
      }
    }
    // stop = false
  })
  await page.click('#mainsrp-pager .item.next a')
  openWeb(page)
}

// 保存商品详细页面清洗后的网页内容到txt文件
function saveWeb(html){
  const $ = cheerio.load(html)
  let content = $("#detail #attributes").text().replace(/,/g, ";")
  fs.appendFileSync("./docs/淘宝-汉服.txt", content)
}