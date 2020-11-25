// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:3001';
// const dbName = 'meteor';
// export const client = new MongoClient(url);

// 搜索页面上的条目
export const Site = new Mongo.Collection("site");
// 搜索页面的配置
export const SiteConfig = new Mongo.Collection("siteConfig");
export const Slink = new Mongo.Collection("slink");
export const Spaper = new Mongo.Collection("spaper");
export const Sforum = new Mongo.Collection("sforum");
export const Snews = new Mongo.Collection("snews");
// 搜索条目对应的网页
export const Page = new Mongo.Collection("page");

export const P1 = new Mongo.Collection("p1");
export const P2 = new Mongo.Collection("p2");
export const P3 = new Mongo.Collection("p3");