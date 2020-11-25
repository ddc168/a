// 将mongodb数据库中保存的内容导出csv文件，供python分析使用

import { P2 } from '../lib/db';
const fs = require("fs")
const os = require("os")
const path = require("path")
const readline = require('line-read')
    
export function p2(){
    // csv文件的表头，与数据库中的字段名一致
    fs.appendFileSync("c:/dockerShare/p6.csv", "seq, name, author, source, date, data" + os.EOL)
    // 循环写入csv文件
    P2.find({},{sort: {$seq:1}}).forEach(e => {
        fs.appendFileSync("c:/dockerShare/p6.csv", e.seq+ ","+ e.name+ "," + 
        e.author+ "," + e.source+ "," + e.date+ "," + e.data+ "," + os.EOL)
    });

}