// import { Site, SiteConfig, Page, client } from './p1db';
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const MongoClient = require('mongodb').MongoClient;
// const Server = require('mongodb').Server
// const client = new MongoClient(new Server("localhost", 3001), {native_parser: true});
const client = new MongoClient('127.0.0.1:3001',{useNewUrlParser:true});

(async () => {
  await client.connect()
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {width:1400, height:1200},
    args: ['--start-maximized']
  })

  const pages = await browser.pages();
  const page = pages[0];
  
  await page.goto('https://www.cnki.net/')
  await page.type("#txt_SearchText", "北京服装学院")
  await page.keyboard.press("Enter")
  openWeb(page)
})()

// 打开搜索结果页面（在主函数里循环执行）
async function openWeb(page){
  await page.waitForTimeout(9000)
  let frame = await page.mainFrame()
  let bodyHandle = await frame.$('html');
  let html = await frame.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose(); 
  saveWeb(html)
  await page.click("body #gridTable #PageNext")
  let f = true
  if(f){
    openWeb(page)
  }
}

// 保存清洗后的网页内容到mongodb数据库
function saveWeb(html){
    const $ = cheerio.load(html)
    // const text = $("body").text().replace(/\s*/g,'')
    // console.log(text)
    let seq, link, name, author, source, date, data, quote, download = ""
    let content = []
    $("#gridTable .result-table-list tr").each(function(index, element){
      const item = $(element);
      seq = item.find(".seq").text();
      link = item.find(".name a").attr("href")
        name = item.find(".name a").text()
        author = item.find(".author a").text();
        source = item.find(".source a").text();
        date = item.find(".date").text();
        data = item.find(".data").text();
        quote = item.find(".quote").text();
        download = item.find(".download").text();
      const matcht = new RegExp(/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i)
      const result = matcht.exec(link)
      content.push({seq:seq, link:link, name:name, author:author, source:source, 
        date:date, data:data, quote:quote, download:download})
      console.log(seq, link, name, author, source,date,data,quote,download)
    })
    client.db("meteor").collection("p1").insertMany(content)
  }



// const doc1 = { "name": "basketball", "category": "sports", "quantity": 20, "reviews": [] };
// const doc2 = { "name": "football", "category": "sports", "quantity": 30, "reviews": [] };
// let content = [doc1, doc2]
// saveMongo(content)  
// function saveMongo(content){

//   client.db("meteor").collection("p1").insertMany(content)

// }