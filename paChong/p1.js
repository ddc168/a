// 自动打开中国知网，手动搜索页面，自动刷新页面，自动保存内容
// 刷新到30页后，会出现页面校验，需要手动填写通过
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
  await page.goto('https://www.cnki.net/')
  await page.waitForTimeout(10000)
  openWeb(page)
}
)()

// 打开搜索结果页面（在主函数里循环执行）
async function openWeb(page){
  console.log('在浏览器上点击下一页！--10秒后页面被抓取！')
  await page.waitForTimeout(10000)
  let frame = await page.mainFrame()
  let bodyHandle = await frame.$('html');
  let html = await frame.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose(); 
  try {
    saveWeb(html)
  } catch (error) {
    console.log(error)
    console.log('在浏览器上手动通过验证！--20秒后页面继续更新！')
    await page.waitForTimeout(20000)
  }
  try {
    await page.click("#briefBox #PageNext")
  } catch (error) {
    console.log(error)
    console.log('在浏览器上手动通过验证！--20秒后页面继续更新！')
    await page.waitForTimeout(20000)
  }
  openWeb(page)
}

// 保存《知网列表详细页面》清洗后的网页内容到csv文件
function saveWeb(html){
  const $ = cheerio.load(html)
  let seq, link, name, author, source, date, data
  let pages = "获取条目数："
  $("#briefBox #gridTable dl dd").each(function(index, element){
    const item = $(element);
    seq = item.find(".seq").text().replace(/,/g, ";").replace(/\s+/g, " ");
    link = item.find(".middle a").attr("href").replace(/,/g, ";").replace(/\s+/g, " ")
    name = item.find(".middle h6").text().replace(/,/g, ";").replace(/\s+/g, " ")
    author = item.find(".middle .authorinfo").text().replace(/,/g, ";").replace(/\s+/g, " ");
    source = item.find(".middle .baseinfo").text().replace(/,/g, ";").replace(/\s+/g, " ");
    date = item.find(".middle .keywords").text().replace(/,/g, ";").replace(/\s+/g, " ");
    data = item.find(".middle .abstract").text().replace(/,/g, ";").replace(/\s+/g, " ");
    const matcht = new RegExp(/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i)
    const result = matcht.exec(link)
    pages = pages + '--' + seq
    // 循环写入csv文件
    fs.appendFileSync("./docs/电商-机器学习.csv", seq+ ","+ name+ "," + 
        author+ "," + source+ "," + date+ "," + data + os.EOL + os.EOL)
  })
  console.log(pages)
}

// 保存《知网列表简单页面》清洗后的网页内容到csv文件
// function saveWeb(html){
//   const $ = cheerio.load(html)
//   let seq, link, name, author, source, date, data, quote, download = ""
//   $("#briefBox #gridTable table tbody tr").each(function(index, element){
//     const item = $(element);
//     seq = item.find(".seq").text();
//     link = item.find(".name a").attr("href")
//     name = item.find(".name a").text()
//     author = item.find(".author a").text();
//     source = item.find(".source a").text();
//     date = item.find(".date").text();
//     data = item.find(".data").text();
//     quote = item.find(".quote").text();
//     download = item.find(".download").text();
//     const matcht = new RegExp(/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i)
//     const result = matcht.exec(link)
//     console.log(seq)
      // 循环写入csv文件
      // fs.appendFileSync("./docs/drgs.csv", seq+ ","+ name+ "," + 
      // author+ "," + source+ "," + date+ "," + data + os.EOL + os.EOL)
//   })
// }
