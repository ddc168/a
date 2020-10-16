import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.data_page_info.onCreated(function onCreated() {
  this.webPage =  new ReactiveVar(1);
});

Template.data_page_info.helpers({
  // 选择批量下载页数
  webPage() {
    return Template.instance().webPage.get()
  },
  // 下面的变量取自前端mongo，与后台mongodb同步
  // 当前采集的网站的配置参数，
  webConfig() {
    return SiteConfig.findOne({_id: "webSite"})
  },
  // 选择网站
  webSite() {
    let a = "百度"
    if(SiteConfig.findOne({_id: "webSite"}))(
      a = SiteConfig.findOne({_id: "webSite"}).web8
    )
    return a
  },
  // 采集到的网页内容
  sites() {
    return Site.find({}).fetch()
  },
  // 采集到的网页数量
  webItem() {
    return Site.find({}).count()
  },
  // 采集到的网站数量
  webHost() {
    return Site.find({}).count()
  },
  // 采集到的网站数量
  webLink() {
    return Slink.find({}).count()
  },
  // 采集到的网站数量
  webPaper() {
    return Spaper.find({}).count()
  },
  // 采集到的网站数量
  webForum() {
    return Sforum.find({}).count()
  },
  // 采集到的网站数量
  webNews() {
    return Snews.find({}).count()
  }
  
});
  
// server端函数：setWeb、searchWeb、getWeb
Template.data_page_info.events({
  // 在已配置好的网站列表中选择，打开网站，执行默认搜索
  'click .web_link'(event, instance) {
    Meteor.call('setWeb', event.target.text, (err, res) => {
      if (err) { alert(err); }
    });
  },

  // 在已经打开的网站上，执行搜索
  // 新的搜索将翻页数重置为1
  'click #searchWeb'(event, instance) {
    if($("#web").val() == ""){
      alert("搜索内容不能为空！")
    } else {
      instance.webPage.set(1)
      Meteor.call('searchWeb', $("#web").val(), (err, res) => {
        if (err) { alert(err); } 
      });
    }
  },

  // 获取搜索网页中的条目内容
  // 翻页数是累加的
  'click .getWeb'(event, instance) {
    let page = 0
    let n = instance.webPage.get()
    switch(event.target.text){
      case "后一页":
        page = 1
        instance.webPage.set(n + 1)
      break;
      case "后10页":
        page = 10
        instance.webPage.set(n + 10)
      break;
      case "后50页":
        page = 50
        instance.webPage.set(n + 50)
      break;
      case "后100页":
        page = 100
        instance.webPage.set(n + 100)
      break;
      default:
    }  
    Meteor.call('getWeb', page, (err, res) => {
      if (err) { alert(err); }
    });
  },

  // 下载搜索条目对应的网页
  'click #getPage'(event, instance) {
    Meteor.call('getPage', null, (err, res) => {
      if (err) { alert(err); }
    });
  },
});
