// 自动打开p4.js从百度网搜索下载的链接地址，在puppeteer打开页面，自动保存医院的名称和网址
// 注意修改保存文件名，避免错误添加到其他文件中
const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');
const f = fs.readFileSync('./docs/x4.txt').toString().split('\r\n');
const matcht = new RegExp(/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i);

// 读取百度网搜索结果，在浏览器中循环打开网址，保存真正的网址
(async () => { 
  const browser = await puppeteer.launch({
    // headless: false,
    // defaultViewport: {width:1000, height:1000},
    // args: ['--start-maximized']
  })
  let pages = await browser.pages();
  let page = pages[0];
  let s, x, t
  for(i in f){
    s = f[i].split('    ')
    // console.log(s[1])
    if(s[1]){
      try {
        await page.goto(s[1])
        x = matcht.exec(page.url())
        await page.goto(x[1]+x[2])
        t = await page.title()
        console.log(t)
        console.log(x[1]+x[2])
        fs.appendFileSync("./docs/x6.txt", t + '    ' +x[1]+x[2] + os.EOL)        
      } catch (error) {
        console.log(error)
      }
    }
  }
}
)()
