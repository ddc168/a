# -*- coding: utf-8 -*-
"""
Created on Mon Jan 25 15:02:02 2021

@author: ddc
"""

# -*- coding: utf-8 -*-
"""
Created on Mon Jan 18 15:09:04 2021

@author: ddc
"""
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import jieba 
import re
import sklearn
import seaborn as sns
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier


from matplotlib.font_manager import FontProperties
myfont=FontProperties(fname=r'C:\Windows\Fonts\simhei.ttf',size=14)
sns.set(font=myfont.get_name())



df_1 = pd.read_csv('C:/git/a/b/p1.csv',error_bad_lines=False)
del df_1['d']
df_2 = df_1['a']
df_a1=df_1['b']

#定义一个函数，用第一个字段替换第二个字段
def reduce_1(c1):
    c1 = re.match(r'.*\+',c1, flags=0)
    if c1:
        c2=c1.group(0)
        c3= re.match(r'.*万',c2)
        if c3:
            c4=c3.group(0)[:-1]
            c=float(c4[1:])*10000
        else: 
            c=int(c2[:-1])
    else:
         c = 0   
    return c
#因为作者author和来源source这2个字段没有分开，要将发表时间date从第4个字段移动到第5个字段
df_3 = df_2.apply(lambda x:  \
    reduce_1(x))

#df_4 = df_3[df_3!=去看二手 11]
df_4=df_3.to_frame()

shop = df_1[df_1.columns[2]].value_counts()
df_1['d']=df_3

def reduce_2(d1):
    d1 = re.match(r'(?: ￥)(.*)',d1.split('.',1)[0])
    if d1:
        d = float(d1.group(1))
    else:
        d = 0
    return d
df_a2 = df_a1.apply(lambda x:  \
    reduce_2(x))

df_1['f']=df_a2

x1 = df_1.groupby(['c']).agg({'d':'sum','f':'mean'})

df_11 = x1[x1['d']>100000]
df_11['d']=df_11['d']/100000

x2 = df_11.index.tolist()
df_11['a']=x2


def reduce_3(x):
    x = jieba.lcut(x[1:])
    return x[0]
df_12 = df_11['a'].apply(lambda x:  \
    reduce_3(x))

shop_1 = df_1['c'].apply(lambda x:  \
    reduce_3(x))


df_1['g'] =  shop_1


df_12 = df_11['a']

df_11['b'] = df_12


plt.figure(figsize=(15, 10))
plt.bar(df_1['g'],df_1['f'])


plt.figure(figsize=(15, 10))
plt.pie(df_1['f'])



#plt.figure(figsize=(15, 10))
plt.plot(df_1['g'],df_1['f'])


plt.scatter(df_11['a'],df_11['d'])
X = df_11[['d','f']]
y = df_11['a']

plt.figure(figsize=(15, 10))
plt.scatter(df_11['a'],df_11['d'])


plt.figure(figsize=(15, 10))
plt.hist(df_11['d'])

plt.plot(df_11.head()['a'],df_11.head()['d'],label = 'noraml')
plt.legend(['faster453'])

plt.figure(figsize=(15, 10))
plt.boxplot(df_11['d'])

plt.figure(figsize=(15, 10))
plt.hist(df_1['f'])
plt.grid(True, color='g', linestyle='--', linewidth='2')

plt.show()

plt.subplot(221)
plt.scatter(df_1['g'],df_1['f'])
plt.subplot(222)
plt.hist(df_11['d'])
plt.subplot(223)
plt.boxplot(df_11['d'])
plt.subplot(224)
plt.hist(df_1['f'])

fig1 = plt.figure()
ax1 = fig1.add_subplot(111)
ax1.hist(df_1['f'])
fig2 = plt.figure()
ax2 = fig2.add_subplot(111)
ax2.hist(df_11['d'])


###训练数据###
from sklearn import tree
clf = tree.DecisionTreeClassifier()
clf = clf.fit(X,y)
Y = clf.predict(X)


from sklearn import linear_model
reg = linear_model.LinearRegression()
reg.fit (df_1[['d','f']], df_1['f'])
reg.coef_



from sklearn import svm
X = df_1[['d','f']]
y = df_1['g']
clf = svm.SVC(gamma='scale')
clf.fit(X, y)  


from sklearn.neighbors import NearestNeighbors
import numpy as np
X = np.array(df_1[['d','f']])
nbrs = NearestNeighbors(n_neighbors=2, algorithm='ball_tree').fit(X)
distances, indices = nbrs.kneighbors(X)
indices   
distances



from sklearn import datasets
iris = datasets.load_iris()
from sklearn.naive_bayes import GaussianNB
gnb = GaussianNB()
y_pred = gnb.fit(df_1[['d','f']], df_1['g'])


from sklearn import tree
X = df_1[['d','f']]
Y = df_1['g']
clf = tree.DecisionTreeClassifier()
clf = clf.fit(X, Y)

