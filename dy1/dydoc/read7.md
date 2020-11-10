docker应用

教程
    https://www.runoob.com/docker/docker-tutorial.html
    https://docs.docker.com/

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
