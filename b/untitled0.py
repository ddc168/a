# -*- coding: utf-8 -*-
"""
Created on Thu Jan 28 14:54:56 2021

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

df_1=pd.read_csv(r'C:/git/a/b/p3-1.csv',error_bad_lines=False,\
                 header=None,names=['销量','价格','厂家','d','e','f','g'])
#data.to_csv('C:/git/a/b/p1-2.csv',index=False)

#df_1 = pd.read_csv('C:/git/a/b/p1-2.csv',error_bad_lines=False)
del df_1['d']
df_1['内容'] = df_1['e']
del df_1['e']
xl = df_1['销量']
def reduce_xl(x):
    x = re.sub(' 去看二手',' ',x)
    x = re.match(r'(.*)(\d)(.*)(\+)',x)
    if x: 
        x = re.sub(' ','',x.group(0))
        if(re.match(r'.*万',x[:-1])):
            x=re.match(r'.*万',x[:-1]).group(0)[:-1]
            x = float(x)*10000
        else:
            x = float(x[:-1])
        return x
    else:
        return 0
xl = xl.apply(lambda x:  reduce_xl(x))


jg = df_1['价格']
def reduce_jg(x):
    if (x!=0):
        x = re.sub(' ￥','',x)
        x = re.sub('.00','',x)
    else:
        x = 0
    return float(x)
jg = jg.apply(lambda x:  reduce_jg(x))


cj = df_1['厂家']
def reduce_cj(x):
    x=jieba.lcut(x[1:])
    if x:
        return x[0]
    else:
        return ' '
cj = cj.apply(lambda x:  reduce_cj(x))



nr = df_1['内容']
def reduce_nr(x):
    x = re.sub(r' +',' ',x)
    x = re.sub(r'【.+】','',x)
    x = re.split(r' ',x[1:])
    g5 = ''
    hz = ''
    mah = ''
    w = ''
    gb = ''
    for i in x:
        G5 = re.search(r'5G',i)
        if G5:
            if g5 == '':
                g5 = i
        Hz = re.search(r'Hz',i)
        if Hz:
            hz = i
        mAh = re.search(r'mAh',i)
        if mAh :
            mah = i
        W = re.search(r'\d+W',i)
        if W :
            w = i
        GB = re.search(r'\d+GB',i)
        if GB :
            gb = i
    return [g5,hz,mah,w,gb]
nr_1 = nr.apply(lambda x:  reduce_nr(x))
df_2 = nr_1.to_frame()
df_2['g5'] = df_2['内容'].apply(lambda x: x[0]) 
df_2['hz'] = df_2['内容'].apply(lambda x: x[1]) 
df_2['mah'] = df_2['内容'].apply(lambda x: x[2]) 
df_2['w'] = df_2['内容'].apply(lambda x: x[3]) 
df_2['gb'] = df_2['内容'].apply(lambda x: x[4]) 
def reduce_df_21(x):
    if x == '':
        x = 0
    else:
        x = 1
    return x
s_g5 = df_2['g5'].apply(lambda x: reduce_df_21(x))
def reduce_df_22(x):
    x = re.search(r'(\d+)Hz',x)
    if x:
        x = float(x.group(0)[:-2])
    else:
        x = 0
    return x
s_hz = df_2['hz'].apply(lambda x: reduce_df_22(x))
def reduce_df_23(x):
    x = re.search(r'(\d+)mAh',x)
    if x:
        x = float(x.group(0)[:-3])
    else:
        x = 0
    return x
s_mah = df_2['mah'].apply(lambda x: reduce_df_23(x))
def reduce_df_24(x):
    x = re.search(r'(\d+)W',x)
    if x:
        x = float(x.group(0)[:-1])
    else:
        x = 0
    return x
s_w = df_2['w'].apply(lambda x: reduce_df_24(x))
def reduce_df_25(x):
    x = re.search(r'(\d+)',x)
    if x:
        x = float(x.group(0))
        if x>32:
            x = 0
    else:
        x = 0
    return x
s_gb = df_2['gb'].apply(lambda x: reduce_df_25(x))
data = pd.DataFrame({'gb':s_gb,'g5':s_g5,'hz':s_hz,'mah':s_mah,\
              'w':s_w,'jg':jg,'cj':cj,'xl':xl})
    
    
    
    
    

   

    




def reduce_f(x):
    x = re.sub(r'： ?',':',x)
    x = re.split(r' ',x)[1:]
    shop = ''
    name = ''
    pid = ''
    weight = ''
    made = ''
    cpu = ''
    nc = ''
    cc = ''
    cck = ''
    sxt = ''
    hxs = ''
    qxs = ''
    pmcc = ''
    fbl = ''
    pmbl = ''
    pmqszh = ''
    cdq = ''
    os = ''
    for i in x:
        Shop = re.search(r'品牌:(.*)',i)
        if Shop:
                shop = Shop.group(1)
        Name = re.search(r'商品名称:(.*)',i)
        if Name:
            name = Name.group(1)
        Pid = re.search(r'商品编号:(.*)',i)
        if Pid :
            pid = Pid.group(1)
        Weight = re.search(r'商品毛重:(.*)',i)
        if Weight :
            weight = Weight.group(1)
        Made = re.search(r'商品产地:(.*)',i)
        if Made :
            made = Made.group(1)
        Cpu = re.search(r'CPU型号:(.*)',i)
        if Cpu :
            cpu = Cpu.group(1)
        Nc = re.search(r'运行内存:(.*)',i)
        if Nc :
            nc = Nc.group(1)
        Cc = re.search(r'机身存储:(.*)',i)
        if Cc :
            cc = Cc.group(1)
        Cck = re.search(r'存储卡:(.*)',i)
        if Cck :
            cck = Cck.group(1)
        Sxt = re.search(r'摄像头数量:(.*)',i)
        if Sxt :
            sxt = Sxt.group(1)
        Hxs = re.search(r'后摄主摄像素:(.*)',i)
        if Hxs :
            hxs = Hxs.group(1)
        Qxs = re.search(r'前摄主摄像素:(.*)',i)
        if Qxs :
            qxs = Qxs.group(1)
        Pmcc = re.search(r'主屏幕尺寸（英寸）:(.*)',i)
        if Pmcc :
            pmcc = Pmcc.group(1)
        Fbl = re.search(r'分辨率:(.*)',i)
        if Fbl :
            fbl = Fbl.group(1)
        Pmbl = re.search(r'屏幕比例:(.*)',i)
        if Pmbl :
            pmbl = Pmbl.group(1)
        Pmqszh = re.search(r'屏幕前摄组合:(.*)',i)
        if Pmqszh :
            pmqszh = Pmqszh.group(1)
        Cdq = re.search(r'充电器:(.*)',i)
        if Cdq :
            cdq = Cdq.group(1)
        Os = re.search(r'操作系统:(.*)',i)
        if Os :
            os = Os.group(1)
    return [shop,name,pid,weight,made,cpu,nc,cc,cck,sxt,\
            hxs,qxs,pmcc,fbl,pmbl,pmqszh,cdq,os]
s_f = df_1['f'].apply(lambda x: reduce_f(x))
n = -1
df_3 = s_f.to_frame()
testList = ['shop','name','pid','weight','made','cpu','nc','cc','cck','sxt',\
              'hxs','qxs','pmcc','fbl','pmbl','pmqszh','cdq','os']
for i,x in enumerate(testList):
                  df_3[x] = s_f.apply(lambda x: x[i])



shop = df_3[df_3.columns[5]].value_counts()








#df_2 = nr_1.to_frame()
#df_2['g5'] = df_2['内容'].apply(lambda x: x[0]) 
#df_2['hz'] = df_2['内容'].apply(lambda x: x[1]) 
#df_2['mah'] = df_2['内容'].apply(lambda x: x[2]) 
#df_2['w'] = df_2['内容'].apply(lambda x: x[3]) 
#df_2['gb'] = df_2['内容'].apply(lambda x: x[4])

#data_1 = data[data['jg']<100000]
#data_1 = data[data['xl']<1500000]    
    
#plt.figure(figsize=(15, 10))
#plt.pie(data['xl'])
#
#plt.figure(figsize=(15, 10))
#plt.bar(data['cj'],data['jg'])
#
#plt.figure(figsize=(15, 10))
#plt.plot(data['xl'])
#
#plt.figure(figsize=(15, 10))
#plt.scatter(data_1['xl'],data_1['jg'])
#
#
#shop = data[data.columns[6]].value_counts()
#
#
#
#
#
#
#X = data_1[['jg','gb','g5','hz']]
#y = data_1['xl']
#X_train, X_test, y_train, y_test = \
# train_test_split( X, y, test_size=0.33, random_state=42)
#from sklearn import tree
#clf = tree.DecisionTreeClassifier()
#clf = clf.fit(X_train,y_train)
#score = clf.score(X_test,y_test)
#
#
# 
# 
#X = data_1[['jg','gb','g5','hz']]
#y = data_1['xl']
#X_train, X_test, y_train, y_test = \
# train_test_split( X, y, test_size=0.33, random_state=42)
#from sklearn.naive_bayes import GaussianNB
#gnb = GaussianNB()
#gnb = gnb.fit(X_train,y_train)
#score = gnb.score(X_test,y_test)
#
#
#
#
#
#
#X = data_1[['jg','w','gb','g5','hz']]
#y = data_1['xl']
#X_train, X_test, y_train, y_test = \
# train_test_split( X, y, test_size=0.33, random_state=42)
#from sklearn import linear_model
#reg = linear_model.LinearRegression()
#reg = reg.fit (X_train,y_train)
#score = reg.score(X_test,y_test)









##定义一个函数，用第一个字段替换第二个字段
#def reduce_1(c1):
#    c1 = re.match(r'.*\+',c1, flags=0)
#    if c1:
#        c2=c1.group(0)
#        c3= re.match(r'.*万',c2)
#        if c3:
#            c4=c3.group(0)[:-1]
#            c=float(c4[1:])*10000
#        else: 
#            c=int(c2[:-1])
#    else:
#         c = 0   
#    return c
##因为作者author和来源source这2个字段没有分开，要将发表时间date从第4个字段移动到第5个字段
#df_3 = df_2.apply(lambda x:  \
#    reduce_1(x))
#
##df_4 = df_3[df_3!=去看二手 11]
#df_4=df_3.to_frame()
#
#shop = df_1[df_1.columns[2]].value_counts()
#df_1['d']=df_3
#
#def reduce_2(d1):
#    d1 = re.match(r'(?: ￥)(.*)',d1.split('.',1)[0])
#    if d1:
#        d = float(d1.group(1))
#    else:
#        d = 0
#    return d
#df_a2 = df_a1.apply(lambda x:  \
#    reduce_2(x))
#
#df_1['f']=df_a2
#
#x1 = df_1.groupby(['c']).agg({'d':'sum','f':'mean'})
#
#df_11 = x1[x1['d']>100000]
#df_11['d']=df_11['d']/100000
#
#x2 = df_11.index.tolist()
#df_11['a']=x2
#
#
#def reduce_3(x):
#    x = jieba.lcut(x[1:])
#    return x[0]
#df_12 = df_11['a'].apply(lambda x:  \
#    reduce_3(x))
#
#shop_1 = df_1['c'].apply(lambda x:  \
#    reduce_3(x))
#
#
#df_1['g'] =  shop_1
#
#
#df_12 = df_11['a']
#
#df_11['b'] = df_12
#
#
#plt.figure(figsize=(15, 10))
#plt.bar(df_1['g'],df_1['f'])
#
#
#plt.figure(figsize=(15, 10))
#plt.pie(df_1['f'])
#
#
#
##plt.figure(figsize=(15, 10))
#plt.plot(df_1['g'],df_1['f'])
#
#
#plt.scatter(df_11['a'],df_11['d'])
#X = df_11[['d','f']]
#y = df_11['a']
#
#plt.figure(figsize=(15, 10))
#plt.scatter(df_11['a'],df_11['d'])
#
#
#plt.figure(figsize=(15, 10))
#plt.hist(df_11['d'])
#
#plt.plot(df_11.head()['a'],df_11.head()['d'],label = 'noraml')
#plt.legend(['faster453'])
#
#plt.figure(figsize=(15, 10))
#plt.boxplot(df_11['d'])
#
#plt.figure(figsize=(15, 10))
#plt.hist(df_1['f'])
#plt.grid(True, color='g', linestyle='--', linewidth='2')
#
#plt.show()
#
#plt.subplot(221)
#plt.scatter(df_1['g'],df_1['f'])
#plt.subplot(222)
#plt.hist(df_11['d'])
#plt.subplot(223)
#plt.boxplot(df_11['d'])
#plt.subplot(224)
#plt.hist(df_1['f'])
#
#fig1 = plt.figure()
#ax1 = fig1.add_subplot(111)
#ax1.hist(df_1['f'])
#fig2 = plt.figure()
#ax2 = fig2.add_subplot(111)
#ax2.hist(df_11['d'])
#
#
####训练数据###
#from sklearn import tree
#clf = tree.DecisionTreeClassifier()
#clf = clf.fit(X,y)
#Y = clf.predict(X)
#
#
#from sklearn import linear_model
#reg = linear_model.LinearRegression()
#reg.fit (df_1[['d','f']], df_1['f'])
#reg.coef_
#
#
#
#from sklearn import svm
#X = df_1[['d','f']]
#y = df_1['g']
#clf = svm.SVC(gamma='scale')
#clf.fit(X, y)  
#
#
#from sklearn.neighbors import NearestNeighbors
#import numpy as np
#X = np.array(df_1[['d','f']])
#nbrs = NearestNeighbors(n_neighbors=2, algorithm='ball_tree').fit(X)
#distances, indices = nbrs.kneighbors(X)
#indices   
#distances
#
#
#
#from sklearn import datasets
#iris = datasets.load_iris()
#from sklearn.naive_bayes import GaussianNB
#gnb = GaussianNB()
#y_pred = gnb.fit(df_1[['d','f']], df_1['g'])
#
#
#from sklearn import tree
#X = df_1[['d','f']]
#Y = df_1['g']
#clf = tree.DecisionTreeClassifier()
#clf = clf.fit(X, Y)
#
