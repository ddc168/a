const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const args = process.argv;
console.log(args);

(async () => { 
  let $
  // https://item.jd.com/100017628668.html
  // https://item.jd.com/100017628668.html#product-detail
  await fetch('https://item.jd.com/100017628668.html#product-detail').then(
    res => res.textConverted()).then(data => 
      $ = cheerio.load(data)
    )
  let content = $('body .detail .ETab .tab-con').text().replace(/\s+/g, " ") + os.EOL
  console.log(content)
  fs.appendFileSync("./zp3.txt", content)
}
)()
