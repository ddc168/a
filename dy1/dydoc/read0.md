第一步：买一台电脑（高配置，cpu-显卡gpu-内存-固态硬盘-主板多接口）
    预算8000元以上，否则使用时运行等待时间过长，会兴趣大减，严重影响学习效率。

第二步：windows正常使用（办公、多媒体开发）
    U盘启动安装win10
    安装wpsOffice办公软件
    安装图像、视频、音频的编辑软件

第三步：linux使用（win10-linux，docker-linux）
    1、win10安装linux（本机练习）：
        桌面 -》 右键 -》 显示设置 -》 主页 -》 更新和安全 -》 开发者选项 -》 开发人员模式

        电脑 -》 右键 -》属性 -》控制面板主页 -》程序 -》启用或关闭windows功能 -》适用于windows的linux子系统

        桌面下菜单栏 -》 microsoft store -》linux

        更新阿里云的apt源镜像
        https://www.jianshu.com/p/16502ed02e29

        https://www.runoob.com/linux/linux-tutorial.html
        https://www.runoob.com/linux/linux-comm-apt.html

    2、win10安装docker（远程服务器练习）：
        电脑 -》 右键 -》属性 -》控制面板主页 -》程序 -》启用或关闭windows功能 -》Hyper-V 

        https://hub.docker.com/  下载安装docker-desktop

        镜像加速 https://registry.docker-cn.com

        https://www.runoob.com/docker/docker-tutorial.html
        https://docs.docker.com/
        https://www.runoob.com/docker/docker-command-manual.html

    3、docker安装使用ubuntu
        在docker desktop的settings里面，设置Resources下的file sharing，增加c:\dockerShare目录

        docker run --name XX -it -p 21:21 -p 22:22 -p 80:80 -p 3000:3000 -p 3001:3001 -p 4000:4000 -p 5000:5000 -p 5432:5432 -p 8000:8000 -p 8888:8888 -p 27017:27017 -v c:\dockerShare:/dockerShare  ubuntu:18.04 /bin/bash

        更新阿里云的apt源镜像
        https://www.jianshu.com/p/16502ed02e29

        cd /etc/apt
        cp sources.list sources.list.bak
        rm sources.list
        ln -s /dockerShare/sources.list sources.list

        apt update
        apt upgrade
        apt install curl  wget
        
        passwd

        exit

        docker ps -a
        docker start XX
        docker attach xx

    4、ubuntu安装linux宝塔：
        https://www.bt.cn/

        wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && bash install.sh

        时区选择：第一个是6 Asia亚洲， 第二个是70 shanghai上海

        记录下安装后提示的最后内容，在浏览器打开：        
            外网面板地址: http://222.130.243.73:8888/fc0260e8
            内网面板地址: http://127.0.0.1:8888/fc0260e8
            username: st8esxzj
            password: 07deb5cc
        
        bt start
    
    5、ssh远程登陆
        安装ssh服务
            apt install openssh-server
        
        启动ssh服务
            /etc/init.d/ssh start

            ps -e|grep ssh

            cp /etc/ssh/sshd_config sshd_config.bak
            cp /etc/ssh/sshd_config /dockerShare/sshd_config
            rm /etc/ssh/sshd_config
            配置文件中增加一句root登录允许 PermitRootLogin yes
            ln -s /dockerShare/sshd_config /etc/ssh/sshd_config

            /etc/init.d/ssh restart


编程工具（git，vscode，jupyter，vi）
    git使用：
        https://www.runoob.com/git/git-tutorial.html

        .gitignore文件
            https://www.jianshu.com/p/74bd0ceb6182
            https://www.jianshu.com/p/699ed86028c2
        
        https://github.com/  github网站  
        
        https://coding.net/

编程语言（html，css，js，python）
    安装jupyter
        安装anaconda
        jupyter lab --allow-root --ip '*' 
        修改jupyter_notebook_config.py中的
            c.NotebookApp.ip = '*'

编程框架（meteor，flask，phoenix）
    安装meteor
        curl https://install.meteor.com/ | sh

        useradd -d  /home/hitb -m hitb -G root
        su hitb
        cd /dockerShare
        meteor create myapp
        cd myapp
        meteor

编程类库（puppeteer，pandas）




