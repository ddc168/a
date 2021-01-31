const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { Console } = require('console');
let p = 0;
fs.appendFileSync("./p1.csv",'author,title,content'+os.EOL+os.EOL);
fs.appendFileSync("./p2.csv",'author,title,content'+os.EOL+os.EOL);
(async()=>{
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width:1000,height:1000},
        args: ['--start-maximized']
    })
    let pages = await browser.pages();
    let page = pages[0];
    await page.goto('https://tieba.baidu.com/f?ie=utf-8&kw=%E5%8C%97%E4%BA%AC%E6%9C%8D%E8%A3%85%E5%AD%A6%E9%99%A2&fr=search')
    openWeb(page)
})()
async function openWeb(page){
    await page.waitForTimeout(3000)
    let frame = await page.mainFrame()
    let bodyHandle = await frame.$('html');
    let html = await frame.evaluate(body => body.innerHTML,bodyHandle);
    await bodyHandle.dispose();
    const $ = cheerio.load(html)
    $('.j_thread_list.clearfix').each(
        function(index,element){
            const item = $(element);
            let latest, author, title, content, url
            latest = item.find(".threadlist_rep_num.center_text").text().replace(/,/g, ";").replace(/\s+/g, " ");
            author = item.find(".tb_icon_author").text().replace(/,/g, ";").replace(/\s+/g, " ");
            title = item.find(".j_th_tit ").text().replace(/,/g, ";").replace(/\s+/g, " ");
            content = item.find(".threadlist_abs.threadlist_abs_onlyline").text().replace(/,/g, ";").replace(/\s+/g, " ");
            url = item.find(".threadlist_title.pull_left.j_th_tit a").attr("href");
            try{
                if(latest=="0"){
                    fs.appendFileSync("./p1.csv",author + ',' + title + ',' + content + os.EOL + os.EOL)
                    fetch('https://tieba.baidu.com/' + url).then(
                        res => res.textConverted()).then(data => saveWeb(data))
                }
            }catch (error) {
                console.log(error)}
        }
    )
    await page.click('.next.pagination-item')
    p = p+1
    console.log(p +'page'+ os.EOL)
    openWeb(page)
}
function saveWeb(html){
    const $ = cheerio.load(html)
    let title = $(".core_title_txt").text().replace(/,/g, ";")
    let author = $(".p_author_name.j_user_card").text().replace(/,/g, ";")
    let content = $(".d_post_content.j_d_post_content. clearfix").text().replace(/,/g, ";")
    fs.appendFileSync("./p2.csv", author + ',' + title + ',' + content + os.EOL + os.EOL)
  }