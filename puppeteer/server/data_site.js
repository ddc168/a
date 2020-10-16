const cheerio = require('cheerio');
const fetch = require('node-fetch');

let web1, web2, web3, web4, web5

export async function getWebSite(a) {
    console.log(a)
    Site.remove({})
    web1 = a.web1
    web2 = a.web2
    web3 = a.web3
    web4 = a.web4
    web5 = a.web5
	fetch(web1)
    .then(res => res.text())
    .then(html => saveData(html))
}

function saveData(html){
    const $ = cheerio.load(html)
    let link, title, desc
    // const text = $('body').text().replace(/\s*/g,'')
    // console.log(text)
    $(web2).each(function(index, element){
      const item = $(element);
      link = $(element).attr("href")
      title = $(element).text()
      desc = $(element).text();
    //   console.log($(element).attr("href"))
      Site.insert({ link: link, title: title, desc: desc })
    })
  }