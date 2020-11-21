# -*- coding: utf-8 -*-
"""
Created on Wed Nov 18 16:43:06 2020

@author: ddc
"""

import pandas as pd
import jieba
import nltk

df = pd.read_pickle('./df.pkl')

#f1 = open("./f1.txt", "w", encoding='utf-8')
#for i in df[df.columns[1]]:
#    f1.write(i)
#f1.close()

#用于扩展jieba的用户字典
s = ''
for i in df[df.columns[1]]:
    s = s + '/' + i.strip()
ss = " ".join(jieba.cut(s))


#文字出现频率统计
tokens = ss.split()
freq = nltk.FreqDist(tokens)
freq.plot(20, cumulative=False)

keys = []
vals = []
for key,val in freq.items():
    keys.append(key)
    vals.append(val)
df_1 = pd.DataFrame({'key': keys, 'val':vals})

