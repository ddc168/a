第一，云服务器上常用的linux版本的使用：

阿里云开源镜像站：http://mirrors.aliyun.com/

ubuntu:14.04代号Trusty Tahr (可靠的塔尔羊)
ubuntu:16.04代号Xenial Xerus (好客的非洲地松鼠)

ubuntu:18.04    代号Bionic Beaver（仿生海狸）
    更新阿里云的apt源镜像    https://www.jianshu.com/p/16502ed02e29

    deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse

    deb https://mirrors.tuna.tsinghua.edu.cn/CRAN/bin/linux/ubuntu bionic-cran40/
    deb http://archive.ubuntu.com/ubuntu/ trusty main universe restricted multiverse


ubuntu:20.04    代号Focal Fossa（中心的马岛獴）
    更新阿里云的apt源镜像    https://www.cnblogs.com/leeyazhou/p/12976814.html

    deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse



centos:7
    https://developer.aliyun.com/mirror/centos?spm=a2c6h.13651102.0.0.3e221b11lbWezv
    http://mirrors.aliyun.com/centos/7

    备份源文件
        mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
    下载新的源文件
        curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
    
    运行 yum makecache 生成缓存


centos:8
    http://mirrors.aliyun.com/centos/8

    下载新的源文件
        curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-8.repo


第二，简单好用的服务器面板    https://www.bt.cn/
    
ubuntu安装宝塔Bt
    wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && bash install.sh 2de292

    修改安全入口：  123456
    修改面板用户：  
    修改面板密码：

centos安装宝塔Bt
    wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh 2de292

    yum install initscripts

centos启动ssh服务
    查看SSH是否安装
        rpm -qa | grep ssh
    安装openssh-server
        yum install -y openssh-server
    启动服务
        service sshd start 
    查看是否启动22端口
        netstat -antp | grep sshd 
    设置服务为开机启动
        chkconfig sshd on 

第三，数据分析要使用mongodb，postgresql，python，R

ubuntu安装mongodb
    apt-get install mongodb

    创建/data/db/目录

    nohup mongod &

    https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

        wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -

    ubuntu18.04
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

    ubuntu20.04
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

    apt update

    apt install -y mongodb-org

ubuntu安装postgresql
    https://www.postgresql.org/download/linux/ubuntu/

    sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

    apt update

    apt -y install postgresql

centos安装postgresql
    https://www.postgresql.org/download/linux/redhat/


第四，爬虫获取数据
    import { P2 } from '../lib/db';
    const puppeteer = require('puppeteer');
    const cheerio = require('cheerio');

    // (async () => { 
    export  async function p2() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width:1400, height:1200},
        args: ['--start-maximized']
    })
    let pages = await browser.pages();
    let page = pages[0];
    await page.goto('https://www.cnki.net/')
    await page.waitFor(10000)
    openWeb(page)
    }
    // )()

    async function openWeb(page){
    await page.waitFor(3000)
    let frame = await page.mainFrame()
    let bodyHandle = await frame.$('html');
    let html = await frame.evaluate(body => body.innerHTML, bodyHandle);
    await bodyHandle.dispose(); 
    saveWeb(html)
    openWeb(page)
    }

    function saveWeb(html){
    const $ = cheerio.load(html)
    $("#briefBox #gridTable table tbody tr").each(function(index, element){
      const item = $(element);
      seq = item.find(".seq").text();
      link = item.find(".name a").attr("href")
      name = item.find(".name a").text()
      author = item.find(".author a").text();
      source = item.find(".source a").text();
      date = item.find(".date").text();
      data = item.find(".data").text();
      quote = item.find(".quote").text();
      download = item.find(".download").text();
      P2.insert({seq:seq, link:link, name:name, author:author, source:source, 
        date:date, data:data, quote:quote, download:download})
      console.log(seq)
    })
    }

第五，转换csv文件
    import { P2 } from '../lib/db';
    const fs = require("fs")
    const os = require("os")
    const readline = require('line-read')
        
    export function p3(){
        P2.find({},{sort: {$seq:1}}).forEach(e => {
            fs.appendFileSync("c:/git/a/puppeteer/p3.txt", e.seq + e.link + e.name + 
            e.author + e.source + e.date + e.data + e.quote + e.download + os.EOL)
        });
        
        readline.readLineFromFile("c:/git/a/puppeteer/p3.txt").join(function(xs) {
            fs.writeFileSync("c:/git/a/puppeteer/p1.csv", xs)
        });
    }

第六，使用数据库和python、r处理分析数据

