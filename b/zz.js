const re = require("re")
const fs = require("fs")
const os = require("os")
// const f = fs.readFileSync('./p1.csv').toString();
const f = fs.readFileSync('./p1.csv').toString().split('\r\n');
for (i in f){
s = f[i].match(/(.*)(条评价)(.*￥)(\d*)(.*)(\d*英寸)(.*电脑\()(.*)(\).*)[1]/)
if(s){
    d = s[8].match(/(.*)(\))/)
    if(d){
        s[8] = d[1]
    }
    console.log(s[1],s[4],s[8])      
    fs.appendFileSync("./zz.csv", s[1]+ ","+ s[4]+ "," + 
    s[8].replace(/ /g, ",") + os.EOL + os.EOL)
}}
