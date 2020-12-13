// 自动打开京东商城网，手动搜索商品页面，自动保存商品的详细信息
// 注意修改保存文件名，避免错误添加到其他文件中
const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

// 浏览器打开京东商城网，在搜索框中输入关键词
(async () => { 
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {width:1000, height:1000},
    args: ['--start-maximized']
  })
  let pages = await browser.pages();
  let page = pages[0];
  await page.goto('https://www.jd.com/')
  pages = await browser.pages();
  await page.type('#search input', '汉服')
  await page.click('#search button')
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
  $("#J_container #J_main #J_goodsList li").each(function(index, element){
    const item = $(element);
    let name, price, commit, shop, url
    name = item.find(".p-name").text().replace(/,/g, ";").replace(/\s+/g, " ");
    price = item.find(".p-price").text().replace(/,/g, ";").replace(/\s+/g, " ");
    commit = item.find(".p-commit").text().replace(/,/g, ";").replace(/\s+/g, " ");
    shop = item.find(".p-shop").text().replace(/,/g, ";").replace(/\s+/g, " ");
    url = item.find(".p-img a").attr("href");
    if(url){
      try {
        console.log(name, price, commit, shop, url)
        fs.appendFileSync("./docs/京东-汉服1.csv", name + ',' + price + ',' + 
          commit + ',' + shop + ',' + url + os.EOL)
        fetch('https:' + url).then(
          res => res.textConverted()).then(data => saveWeb(data))
      } catch (error) {
        console.log(error)
      }
    }
    // stop = false
  })
  await page.click('#J_main #J_bottomPage .pn-next')
  openWeb(page)
}

// 保存商品详细页面清洗后的网页内容到txt文件
function saveWeb(html){
  const $ = cheerio.load(html)
  let content = $(".detail .p-parameter").text().replace(/,/g, ";")
  fs.appendFileSync("./docs/京东-汉服.txt", content)
}