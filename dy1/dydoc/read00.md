云服务器上常用的linux版本的使用：

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


简单好用的服务器面板    https://www.bt.cn/
    
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
