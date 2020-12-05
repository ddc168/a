import numpy as np
import pandas as pd
import jieba 

#读取csv数据文件
df_1 = pd.read_csv('C:/dockerShare/git/a/paChong/docs/p1.csv')

# 读取txt大文本
data = ''
with open("C:/dockerShare/git/a/paChong/docs/医院.txt","r", encoding='utf-8') as f: 
    for line in f.readlines(): 
        data = data + line

df_2 = pd.DataFrame(data.split("\n"))

