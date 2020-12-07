// 打开拉钩网下载的职位信息，用正则表达式做拆分字段处理
const fs = require('fs');
const os = require('os');
const f = fs.readFileSync('./docs/zp1.txt').toString().split('\r\n');
const matcht = new RegExp(/(规模)|(公司主页)|(职位描述)|(工作地址)/);
let s, r
for(i in f){
    s = f[i].replace(/,/g, ";").split(matcht)
    r = s.filter(n => n)
    fs.appendFileSync("./docs/zp6.csv", r + os.EOL)
}
process.exit()
