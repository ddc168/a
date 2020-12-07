import numpy as np
import pandas as pd
import jieba 
import re

#读取csv数据文件
df_1 = pd.read_csv('C:/dockerShare/git/a/paChong/docs/zp6.csv',error_bad_lines=False)

# 读取txt大文本
#data = ''
#with open("C:/dockerShare/git/a/paChong/docs/医院.txt","r", encoding='utf-8') as f: 
#    for line in f.readlines(): 
#        data = data + line
#
#df_2 = pd.DataFrame(data.split("\n"))

# 删除不需要的字段
del df_1['规模']
del df_1['公司主页']
del df_1['职位描述']
del df_1['工作地址']

# 查找字段中包含关键词
df_2 = df_1.loc[(df_1['dz'].str.contains('朝阳区'))]
# 使用正则表达式
df_2 = df_1.loc[(df_1['dz'].str.contains('朝阳区 | 海淀区'))]
# 职位要求中包含“实习 | 学习”
df_2 = df_1.loc[(df_1['zw'].str.contains('实习 | 学习'))]
# 岗位要求中包含“数据”
df_2 = df_1.loc[(df_1['gw'].str.contains('数据'))]
df_3 = df_2.loc[(df_2['gw'].str.contains('服装'))]

# 把处理结果写入csv文件
df_3.to_csv('C:/dockerShare/git/a/paChong/docs/zpp6.csv')