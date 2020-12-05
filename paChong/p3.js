// 自动打开拉钩网，手动搜索页面，自动保存招聘的内容
// 注意修改保存文件名，避免错误添加到其他文件中
const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

// 浏览器打开拉钩网，手动选择招聘地区，输入关键词
(async () => { 
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {width:1400, height:1200},
    args: ['--start-maximized']
  })
  let pages = await browser.pages();
  let page = pages[0];
  await page.goto('https://www.lagou.com/')
  await page.waitForTimeout(10000)
  pages = await browser.pages();
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
  $("#s_position_list li a.position_link").each(function(index, element){
    const item = $(element);
    // if(stop){
      try {
        console.log(item.text().replace(/\s+/g, " "))
        // console.log(item.attr("href"))
        fetch(item.attr("href")).then(
          res => res.textConverted()).then(data => saveWeb(data))
      } catch (error) {
        console.log(error)
      }
    // }
    // stop = false
  })
  await page.click('#main_container .pager_next ')
  openWeb(page)
}

// 保存《拉钩网招聘职位详细页面》清洗后的网页内容到txt文件
function saveWeb(html){
  const $ = cheerio.load(html)
  let content = $(".job_company").text().replace(/,/g, ";").replace(/\s+/g, " ") + '    ' + 
    $(".job_detail").text().replace(/,/g, ";").replace(/\s+/g, " ") + os.EOL + os.EOL
  fs.appendFileSync("./docs/x3.txt", content)
}
