import { Meteor } from 'meteor/meteor';
// 使用无头浏览器，从搜索引擎、论文库平台、知识平台网站上搜索主题词，获取网页条目链接
import { pupp, setWeb, getWeb, searchWeb, getPage, getHost } from './data_page';
// 使用fetch，自动获取通过上面搜索保存的网页条目链接的详细页
import { getWebSite } from './data_site';
// 使用fetch，自动获取网站内容
// import { fetchWebSite } from './data_fetch';

Meteor.startup(() => {
  console.log("dyme is startUp!")
  pupp()
});

Meteor.methods({
  // data_page模块中的函数 
  'setWeb'(a) {
    setWeb(a)
  },
  'getWeb'(a) {
  	getWeb(a)
  },
  'searchWeb'(a) {
    searchWeb(a)
  },
  'getPage'(a) {
  	getPage(a)
  },
  'getHost'(a) {
  	getHost(a)
  }
});
