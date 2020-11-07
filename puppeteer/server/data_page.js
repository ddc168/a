import { Site, SiteConfig, Page, client } from '../lib/db';

// 浏览器网页采集
// 第一步：在平台网站上搜索，获取搜索条目的内容
// 第二步：依次获取搜索条目对应的网页，获取网页的内容
// 第三步：对搜索条目的内容和对应网页的内容，做NLP处理
// 第四步：对搜索条目的内容和对应网页的内容，做mongodb聚合分析
// 第五步：对搜索条目的内容和对应网页的内容，做其他算法/模型分析

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

// page是puppeteer打开的浏览器页面
// $是cherrio转换的类似jquery对象
let page, $

// 初始化搜索的页面配置参数
// web0搜索、web1网址、web2页面范围、web3链接地址、web4链接内容、web5下一页、web6搜索框、web7搜索按钮、web8网站名称
// 各个搜索网站的特性化的字段采集设置在saveWeb()函数中分别定义
let webSite = {
  web0: "知识图谱",
  web1: "https://www.baidu.com",
  web2: "#container #content_left .result",
  web3: "h3 a",
  web4: ".c-abstract",
  web5: '.n:last-child',
  web6: '#kw',
  web7: '#su',
  web8: "百度-搜索"
}
SiteConfig.upsert({_id: "webSite"},{"$set": webSite},true)
let {web0, web1, web2, web3, web4, web5, web6, web7, web8} = webSite


// 服务器启动时，打开一个无头浏览器chrome，返回page，默认是百度网站
export async function pupp(){
  const browser = await puppeteer.launch({
    headless: false
    // args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  page = await browser.newPage()
  await page.setViewport({width: 1000, height:1000})
  await page.goto(web1)
  await page.type(web6, web0)
  await page.click(web7)
}

// 在打开的浏览器page上切换要执行搜索的网站
// 打开web1页面，在web6填入web0搜索，点击web7搜索按钮，返回web2、3、4清洗后的页面内容，web5是翻页
export async function setWeb(web){
  switch(web){
  case "百度-搜索":
    web1 = "https://www.baidu.com"
    web2 = "#container #content_left .result"
    web3 = "h3 a"
    web4 = ".c-abstract"
    web5 = '.n:last-child'
    web6 = '#kw'
    web7 = '#su'
    web8 = "百度-搜索"
  break;
  case "必应-搜索":
    web1 = "https://cn.bing.com"
    web2 = "#b_content #b_results li"
    web3 = "h2 a"
    web4 = ".b_caption p"
    web5 = '.sb_pagN.sb_pagN_bp.b_widePag.sb_bp'
    web6 = '#sb_form_q'
    web7 = '#sb_form_go'
    web8 = "必应-搜索"
  break;
  case "搜狗-搜索":
    web1 = "https://www.sogou.com"
    web2 = ".results .vrwrap"
    web3 = ".vrTitle a"
    web4 = ".img-text"
    web5 = '#sogou_next'
    web6 = '#query'
    web7 = '#stb'
    web8 = "搜狗-搜索"
  break;
  case "360-搜索":
    web1 = "https://www.so.com"
    web2 = ".result li"
    web3 = "h3 a"
    web4 = "p.res-desc"
    web5 = '#snext'
    web6 = '#input'
    web7 = '#search-button'
    web8 = "360-搜索"
  break;
  case "维普-论文":
    web1 = "http://www.cqvip.com"
    web2 = "ul.prolist li"
    web3 = "a"
    web4 = ".info"
    web5 = '.pagenum li:last-child a'
    web6 = '.f_input.cqvip-input-focusdisappear'
    web7 = '.f_button'
    web8 = "维普-论文"
  break;
  case "万方-论文":
    web1 = "http://www.wanfangdata.com.cn"
    web2 = ".ResultBlock .ResultList "
    web3 = ".title a"
    web4 = ".summary"
    web5 = '.laypage_next'
    web6 = '#keyWords'
    web7 = '.pubsearchBtn input'
    web8 = "万方-论文"
  break;
  case "知网-论文":
    web1 = "https://www.cnki.net"
    web2 = "#Form1 iframe#iframeResult html body form#ctl00 table table.GridTableContent tr"
    web3 = "a.fz14"
    web4 = ".author_flag"
    web5 = 'a'
    web6 = '#txt_SearchText'
    web7 = '.search-btn'
    web8 = "知网-论文"
  break;
  // 知乎需要先用户登录
  case "知乎-论坛":
    web1 = "https://www.zhihu.com"
    web2 = "#b_content #b_results li"
    web3 = "h2 a"
    web4 = ".b_caption p"
    web5 = '.laypage_next'
    web6 = '#Popover1-toggle'
    web7 = '.Input-after button'
    web8 = "知乎-论坛"
  break;
  // 简书是打开新页面了
  case "简书-文章":
    web1 = "https://www.jianshu.com"
    web2 = "#b_content #b_results li"
    web3 = "h2 a"
    web4 = ".b_caption p"
    web5 = '.laypage_next'
    web6 = '.search-input'
    web7 = '.search-btn'
    web8 = "简书-文章"
  break;
  case "贴吧-论坛":
    web1 = "https://tieba.baidu.com"
    web2 = "#content_wrap #thread_list li"
    web3 = "a"
    web4 = ".threadlist_detail"
    web5 = '#frs_list_pager .next.pagination-item '
    web6 = '#wd1'
    web7 = '.search_btn.search_btn_enter_ba.j_enter_ba'
    // web7 = '.search_btn.j_search_post'
    web8 = "贴吧-论坛"
  break;
  default:
  }
  SiteConfig.update({_id: "webSite"},{"$set": 
    {web0: web0, web1: web1, web2: web2, web3: web3, web4: web4, web5: web5, web6: web6, web7: web7, web8: web8}
  })
  await page.goto(web1)
  // 万方有个浮动窗口，需要先关闭
  try {
    if(web == "万方-论文"){ await page.click("#pop-ad-topic img.adPopupBtn") }
  } catch (error) {}

  await page.type(web6, web0)
  await page.click(web7)
  await page.waitFor(3000)
  // 必应的搜索按钮有时候会失效，需要多试几次
  if(web == "必应-搜索" && page.url() == "https://cn.bing.com/"){ 
    await setWeb(web) 
  } else {
    getWeb(0)
  }
}

// 在已经打开的page上，执行新的搜索
export async function searchWeb(word){
  if(web8 == "搜狗-搜索"){
    web6 = '#upquery'
    web7 = '#searchBtn'
  }
  console.log(web0)
  web0 = word
  SiteConfig.update({_id: "webSite"}, { $set: { web0: web0 } });
  await page.$eval(web6,input => input.value="" );
  await page.type(web6, web0)
  if(web8 == "搜狗-搜索"){
    await page.waitFor(3000)
  }
  await page.click(web7)
  await page.waitFor(3000)
  getWeb(0)
}

// 获取、清洗、返回网页内容
// n是向后翻页数，0是当前页，1是下一页
// n>0时不采集当前页，也就是跳过i=0页
export async function getWeb(n){
  let frame, bodyHandle, html
  for (var i=0; i<=n; i++) {
    if(i > 0){
      await page.click(web5)
      await page.waitFor(3000)
    } else if(n > 0) { 
      continue 
    }
    frame = await page.mainFrame()
    bodyHandle = await frame.$('html');
    html = await frame.evaluate(body => body.innerHTML, bodyHandle);
    await bodyHandle.dispose(); 
    saveWeb(html)
  }
}

// 保存清洗后的网页内容到mongodb数据库
function saveWeb(html){
  const $ = cheerio.load(html)
  let link, title, desc, host = ""
  // const text = $("#body").text().replace(/\s*/g,'')
  // console.log(text)
  $(web2).each(function(index, element){
    const item = $(element);
    link = item.find(web3).attr("href")
    title = item.find(web3).text()
    desc = item.find(web4).text();
    const matcht = new RegExp(/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i)
    const result = matcht.exec(link)
    try {
      host = result[1] + result[2]
    } catch (error) {
      link = web1 + link
    }
    if(title && title != ""){
      Site.insert({ link: link, title: title, desc: desc, host:host })
    }
  })
}

// 下载搜索条目对应的网页到mongodb数据库
export function getPage(a) {
  Site.find({}).forEach(e => {
    savePage(e)
  });
}

async function savePage(e) {
  try {
    const res = await fetch(e.link);
    const html = await res.text();
    const $ = cheerio.load(html)
    const desc = $('body').text().replace(/\s*/g,'')
    Page.insert({_id: e._id, title: e.title, link: e.link, desc: desc })
  } catch (error) {
    console.log(error)
  }
}

export function getHost(a){
  console.log(a)
}
