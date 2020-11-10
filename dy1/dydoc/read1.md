jupyter上的多语言核心支持（分析中心）

jupyter的初始化命令：
    ~/anaconda3/bin/jupyter notebook
    ~/anaconda3/bin/jupyter notebook --generate-config
    ~/anaconda3/bin/jupyter notebook password

    ~/anaconda3/bin/jupyter lab

创建文件链接到/usr/bin/目录下，相当于windows系统的注册表
    sudo ln -s ~/anaconda3/bin/jupyter  /usr/bin/
    sudo ln -s ~/anaconda3/bin/conda  /usr/bin/
    sudo ln -s ~/anaconda3/bin/pip  /usr/bin/

jupyter上可以支持的语言核心的列表：
    jupyter kernelspec list

淘宝镜像设置：
    npm config set registry https://registry.npm.taobao.org

jupyter上增加js的支持：
    sudo npm install -g ijavascript --unsafe-perm=true --allow-root
    ijsinstall

查看ubuntu的版本号：
    lsb_release -a

安装R
    sudo vi /etc/apt/sources.list
    # 把下面这句添加到文件最后一行
    deb https://mirrors.tuna.tsinghua.edu.cn/CRAN/bin/linux/ubuntu bionic-cran40/

    sudo apt update && sudo apt upgrade
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
    gpg --keyserver keyserver.ubuntu.com --recv-key E298A3A825C0D65DFD57CBB651716619E084DAB9

    sudo apt install r-base
    sudo apt install r-base-dev

    sudo apt install curl
    sudo apt install gfortran
    sudo apt install build-essential 
    sudo apt install libxt-dev 
    sudo apt install libcurl4-openssl-dev
    sudo apt install libxml++2.6-dev
    sudo apt install libssl-dev

jupyter上增加R支持
    install.packages(c('repr', 'IRdisplay', 'evaluate', 'crayon', 'pbdZMQ', 'devtools', 'uuid', 'digest'))

    Sys.setenv(R_INSTALL_STAGED = FALSE)

    devtools::install_github('IRkernel/IRkernel')

    options(download.file.method = "wget")

    IRkernel::installspec()

jupyter上增加c++的支持：
    conda install xeus-cling -c conda-forge

jupyter上增加c的支持：
    pip install jupyter-c-kernel
    install_c_kernel