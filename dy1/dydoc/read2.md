jupyter上的多用户支持（管理中心）
    https://jupyterhub.readthedocs.io/en/stable/


增加镜像站点：
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge  
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/  
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/  
    conda config --set show_channel_urls yes 

安装jupyterhub
    conda install -c conda-forge jupyterhub
    pip3 install jupyterhub notebook -i https://pypi.douban.com/simple/
    jupyterhub -h

    npm install -g configurable-http-proxy
    configurable-http-proxy -h

生成配置文件
    jupyterhub --generate-config -f /etc/jupyterhub/jupyterhub_config.py