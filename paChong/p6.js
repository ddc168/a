// 打开拉钩网下载的职位信息，用正则表达式做拆分、查找、替换处理
const fs = require('fs');
const os = require('os');
const f = fs.readFileSync('./docs/zp1.txt').toString().split('\r\n');
const match_1 = new RegExp(/(规模)|(公司主页)|(职位描述)|(工作地址)/);
const match_2 = new RegExp(/丰台区/)
let s, r
// 拆分字段split
// for(i in f){
//     s = f[i].replace(/,/g, ";").split(match_1)
//     r = s.filter(n => n)
//     fs.appendFileSync("./docs/zp6.csv", r + os.EOL)
// }

// 查找关键词search，返回关键词在文本中的位置数字
// for(i in f){i
//     s = f[i].search(/丰台区/)
//     if(s > 0){
//         console.log(f[i]+'\n')
//         console.log(s+'\n')
//     }
// }

// 查找关键词match或exec，返回结果列表
for(i in f){i
    s = f[i].match(/丰台区/)
    // s = match_2.exec(f[i])
    if(s){
        console.log(s)      
    }
}
// 替换关键词replace

process.exit()
