docker应用

教程
    https://www.runoob.com/docker/docker-tutorial.html
    https://docs.docker.com/

linux安装：
    curl -sSL https://get.daocloud.io/docker | sh

win10安装：
    电脑 -》 右键 -》属性 -》控制面板主页 -》程序 -》启用或关闭windows功能 -》Hyper-V 

    https://hub.docker.com/  下载安装docker-desktop

    镜像加速 https://registry.docker-cn.com


clone 下载获取
    git clone https://github.com/docker/doodle.git

build 制作
    cd doodle\cheers2019 

    docker build -t dyy8897/cheers2019 

run 运行
    docker run -it --rm dyy8897/cheers2019

ship 上传保存
    docker login 
    docker push dyy8897/cheers2019

docker命令
    https://www.runoob.com/docker/docker-command-manual.html

docker安装使用ubuntu
    在docker desktop的settings里面，设置Resources下的file sharing，增加c:\dockerShare目录

    docker run --name XX -it -p 3000:3000 -p 8888:8888 -v c:\dockerShare:/dockerShare  ubuntu:18.04 /bin/bash

    更新阿里云的apt源镜像
    https://www.jianshu.com/p/16502ed02e29

    cd /etc/apt
    cp sources.list sources.list.bak
    rm sources.list
    ln -s /dockerShare/sources.list sources.list

    apt update
    apt upgrade
    apt install curl

    安装meteor
    curl https://install.meteor.com/ | sh

    useradd -d  /home/hitb -m hitb -G root
    su hitb
    cd /dockerShare
    meteor create myapp
    cd myapp
    meteor

    exit

    docker ps -a
    docker start XX
    docker attach xx

    安装jupyter
        安装anaconda
        jupyter lab --allow-root --ip '*' 
        修改jupyter_notebook_config.py中的
            c.NotebookApp.ip = '*'
           

    https://github.com/jupityter/docker-stacks
    https://jupyter-docker-stacks.readthedocs.io/en/latest/index.html

    docker run -p 8888:8888 jupyter/scipy-notebook