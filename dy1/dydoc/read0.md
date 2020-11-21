第一步：买一台电脑（高配置，cpu-显卡gpu-内存-固态硬盘-主板多接口）
    预算8000元以上，否则使用时运行等待时间过长，会兴趣大减，严重影响学习效率。
    推荐华为笔记本。

第二步：windows正常使用（办公、多媒体开发）
    U盘启动安装win10
    安装wpsOffice办公软件
    安装图像、视频、音频的编辑软件（photoshop，flash等）

第三步：linux使用（win10-linux，docker-linux）
    1、win10安装linux（本机练习）：
        桌面 -》 右键 -》 显示设置 -》 主页 -》 更新和安全 -》 开发者选项 -》 开发人员模式

        电脑 -》 右键 -》属性 -》控制面板主页 -》程序 -》启用或关闭windows功能 -》适用于windows的linux子系统

        桌面下菜单栏 -》 microsoft store -》linux

        更新阿里云的apt源镜像
            https://www.jianshu.com/p/16502ed02e29

        使用教程
            https://www.runoob.com/linux/linux-tutorial.html
            https://www.runoob.com/linux/linux-comm-apt.html

    2、win10安装docker（远程服务器练习）：
        电脑 -》 右键 -》属性 -》控制面板主页 -》程序 -》启用或关闭windows功能 -》Hyper-V 

        下载安装docker-desktop
            https://hub.docker.com/  

        镜像加速，在docker dashBoard上面设置
            https://registry.docker-cn.com

        使用教程
            https://www.runoob.com/docker/docker-tutorial.html
            https://docs.docker.com/
            https://www.runoob.com/docker/docker-command-manual.html

    3、docker安装使用ubuntu
        在docker desktop的settings里面，设置Resources下的file sharing，增加c:\dockerShare目录

        docker run --name XX -it --privileged=true -p 21:21 -p 22:22 -p 80:80 -p 3000:3000 -p 3001:3001 -p 4000:4000 -p 5000:5000 -p 5432:5432 -p 8000:8000 -p 8888:8888 -p 8889:8889 -p 27017:27017 -v c:\dockerShare:/dockerShare  ubuntu:18.04 /bin/bash

        更新阿里云的apt源镜像
        https://www.jianshu.com/p/16502ed02e29

        cd /etc/apt
        cp sources.list sources.list.bak
        rm sources.list
        ln -s /dockerShare/sources.list sources.list

        apt update
        apt upgrade
        apt install curl  wget  git
        
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
            username: hitb
            password: hitb123456
        
        bt start
    
    5、ssh远程登陆
        安装ssh服务
            apt install openssh-server
        
        启动ssh服务
            /etc/init.d/ssh start

            ps -e|grep ssh

            在/etc/ssh/sshd_config配置文件中增加一句root登录允许 
                PermitRootLogin yes

            /etc/init.d/ssh restart

        ssh命令行登录
            ssh root@127.0.0.1

    6、增加非root用户，用于开发时用
        useradd -d  /home/hitb -m hitb -G root

        su hitb

        exit

第四步：编程工具（git，vscode，jupyter）
    git使用：
        在dockerShare目录下创建git目录，作为开发工作目录

        https://www.runoob.com/git/git-tutorial.html

        .gitignore文件
            https://www.jianshu.com/p/74bd0ceb6182
            https://www.jianshu.com/p/699ed86028c2
        
        https://github.com/  github网站  
        
        https://coding.net/

    vscode使用（本机开发）：
        在win10上安装vscode
        打开/dockerShare/git目录
        
    jupyter使用（远程开发）
        在ubuntu上安装anaconda
            https://www.anaconda.com/

        增加快捷链接
            ln -s ~/anaconda3/bin/conda  /usr/bin/
            ln -s ~/anaconda3/bin/pip  /usr/bin/
            ln -s ~/anaconda3/bin/jupyter  /usr/bin/
            ln -s ~/anaconda3/bin/python  /usr/bin/

        初始化：
            jupyter notebook --generate-config
            jupyter notebook password

        修改jupyter_notebook_config.py中的
            c.NotebookApp.ip = '*'
            c.NotebookApp.allow_root = True

        jupyter上可以支持的语言核心的列表：
            jupyter kernelspec list
        
        启动：--allow-root --ip '*' --port 4000
            jupyter lab 

        后台运行：
            nohup jupyter lab &

    增加镜像站点：
        conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge  

        conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/  

        conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/  

        conda config --set show_channel_urls yes 

第五步：编程语言（html，css，js，python，c和c++，R，SQL）
    https://www.runoob.com/
    https://www.w3cschool.cn/
    https://www.w3school.com.cn/
    http://c.biancheng.net/

    jupyter上增加c的支持：
        pip install jupyter-c-kernel

        install_c_kernel

    nodejs安装：
        curl -sL https://deb.nodesource.com/setup_15.x | bash -

        apt install -y nodejs

        npm config set registry https://registry.npm.taobao.org

    jupyter上增加js的支持：(这里有错误，zeromq的安装有问题)
        apt install -y libtool pkg-config build-essential autoconf automake uuid-dev 

        http://download.zeromq.org/  源码下载并安装zeromq
            ./configure
            make
            make install

        npm install -g ijavascript --unsafe-perm=true --allow-root

        ijsinstall

    R安装：
        /etc/apt/sources.list文件中添加
        deb https://mirrors.tuna.tsinghua.edu.cn/CRAN/bin/linux/ubuntu bionic-cran40/

        添加密钥
        apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9

        gpg --keyserver keyserver.ubuntu.com --recv-key E298A3A825C0D65DFD57CBB651716619E084DAB9

        apt install r-base
        apt install r-base-dev

    jupyter上增加R支持
        在R环境下执行
            install.packages(c('repr', 'IRdisplay', 'evaluate', 'crayon', 'pbdZMQ', 'devtools', 'uuid', 'digest'))

            Sys.setenv(R_INSTALL_STAGED = FALSE)

            devtools::install_github('IRkernel/IRkernel')

            options(download.file.method = "wget")

            IRkernel::installspec()


第六步：编程框架（meteor，flask，phoenix）
    安装meteor
        curl https://install.meteor.com/ | sh

        su hitb
        cd /dockerShare/git
        meteor create myapp
        cd myapp
        meteor

第七步：编程类库（puppeteer，pandas）

    https://zhaoqize.github.io/puppeteer-api-zh_CN/#/

    https://www.pypandas.cn/docs/


第八步：软件需求-业务理解
    1、网上收集数据
    2、转换为csv文件
    3、导入数据表：mongo的collection，pg的table，python的pandas，R的dataframe
    4、数据清理，文字处理
    5、分类、回归
    6、生成规则，应用规则


第九步：实际项目经验
    docker start u18
    docker attach u18
    bt start
    cd /dockerShare
    nohup jupyter lab &
    cd myapp
    su hitb
    meteor
    打开浏览器，分屏打开8888，8889，3000

第十步：其他系统软件
ubuntu安装mongodb
    https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

        wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -

    ubuntu18.04
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

    ubuntu20.04
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

    apt update

    apt install -y mongodb-org

    创建/data/db/目录

    nohup mongod &

    mongo

ubuntu安装postgresql
    https://www.postgresql.org/download/linux/ubuntu/

    sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

    apt update

    apt -y install postgresql

    psql


