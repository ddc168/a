import numpy as np
import pandas as pd
import jieba 

#读取csv数据文件
df = pd.read_csv('C:/dockerShare/git/a/paChong/docs/p1.csv')

# 读取txt大文本
data = ''
with open("C:/dockerShare/git/a/paChong/docs/啊.csv","r", encoding='utf-8') as f: 
    for line in f.readlines(): 
        data = data + line
        
df_txt = pd.DataFrame([['chapter','content']])       
df_1 = data.split("\n")
for i in range(0, len(df_1)-1, 2):
    df_txt.loc[i] = {'chapter': df_1[i],'content': df_1[i+1]}

# df_txt = pd.DataFrame([data_k, data_v])