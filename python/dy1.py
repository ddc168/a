import numpy as np
import pandas as pd
import jieba 


#s = pd.Series(['seq-link', 'name', 'author', 'source', 
#               'date', 'data', 'quote', 'download'])
#
#d = pd.DataFrame([['seq-link', 'name', 'author', 'source', 
#               'date', 'data', 'quote', 'download',
#               '1','2','3','4','5','6','7','8','9','10']])


#读取csv数据文件
df = pd.read_csv('c:/dockerShare/p2.csv')

df.shape
df.describe()
df.info()
df.head()
df.columns
df[df.columns[1]]
df[df.columns[1]].value_counts()


#去除重复数据行，空值替换为空字符
df.drop_duplicates(keep='first', inplace=True)
df.fillna('', inplace=True)

#从第一个字段拆分索引数字，然后替换第一列（链接地址不用分析）
df_1 = df[[df.columns[0]]]
df_2 = df_1.join(df_1[df_1.columns[0]].str.split('/',expand=True))

df[df.columns[0]] = df_2[df_2.columns[1]]

#字段归类，方便做数据清理
#'seq-link'，'name'', author'', 'source'', 'date'', ' data'',''quote'', ''download''

df_qikan = df.loc[df[df.columns[5]].str.contains('期刊')]
df_baozhi = df.loc[df[df.columns[5]].str.contains('报纸')]
df_jikan = df.loc[df[df.columns[5]].str.contains('辑刊')]
df_huiyi = df.loc[df[df.columns[5]].str.contains('会议')]
df_biaozhun = df.loc[df[df.columns[5]].str.contains('标准')]

df_shuoshi = df.loc[df[df.columns[6]].str.contains('硕士')]
df_boshi = df.loc[df[df.columns[6]].str.contains('博士')]

df_qikan_6 = df.loc[df[df.columns[6]].str.contains('期刊')]
df_qikan_7 = df.loc[df[df.columns[7]].str.contains('期刊')]
df_huiyi_7 = df.loc[df[df.columns[7]].str.contains('会议')]

df_qikan_8 = df.loc[df[df.columns[8]].str.contains('期刊')]
df_huiyi_9 = df.loc[df[df.columns[9]].str.contains('会议')]

#各分类加起来应该等于总数
len(df_qikan)+len(df_baozhi)+len(df_jikan)+len(df_huiyi) \
+len(df_biaozhun)+len(df_shuoshi)+len(df_boshi) \
+len(df_qikan_6)+len(df_qikan_7)+len(df_qikan_8)+len(df_huiyi_7)+len(df_huiyi_9)

#先清理数量最多的期刊
df_qikan.describe()
df_qikan.count()
df_qikan[df_qikan.columns[12]].value_counts()

#定义一个函数，用第一个字段替换第二个字段
def reduce_1(c1,c2):
    return c1
#因为作者author和来源source这2个字段没有分开，要将发表时间date从第4个字段移动到第5个字段
df_qikan[df_qikan.columns[4]] = df_qikan.apply(lambda x:  \
    reduce_1(x[df_qikan.columns[3]],x[df_qikan.columns[4]]), axis=1)

#用jieba分词来拆分第3个字段，作者（多个）+来源
def reduce_2(c1):
    return jieba.lcut(c1)

df_qikan[df_qikan.columns[3]] = df_qikan.apply(lambda x:  \
    reduce_2(x[df_qikan.columns[2]]), axis=1)

#引用数quote和下载数download这5，6两列设置为空字符
df_qikan[df_qikan.columns[6]] = ''
df_qikan[df_qikan.columns[7]] = ''

#定义一个函数，用最后10个字段都加起来
def reduce_3(c0, c1,c2,c3,c4,c5,c6,c7,c8,c9,c10): 
    c = c0 + ' ' + c1.replace(" ", "") + ' ' + c2.replace(" ", "") + ' ' \
 + c3.replace(" ", "") + ' ' + c4.replace(" ", "") + ' ' + c5.replace(" ", "") \
 + ' ' + c6.replace(" ", "") + ' ' + c7.replace(" ", "") + ' ' \
 + c8.replace(" ", "") + ' ' + c9.replace(" ", "") + ' ' + c10.replace(" ", "")
    return c.strip()


#用后面的字段填充下载数download字段
df_qikan[df_qikan.columns[7]] = df_qikan.apply(lambda x:  \
    reduce_3(x[df_qikan.columns[7]],x[df_qikan.columns[8]],x[df_qikan.columns[9]] \
    ,x[df_qikan.columns[10]],x[df_qikan.columns[11]],x[df_qikan.columns[12]] \
    ,x[df_qikan.columns[13]],x[df_qikan.columns[14]],x[df_qikan.columns[15]] \
    ,x[df_qikan.columns[16]],x[df_qikan.columns[17]]
    ), axis=1)

#删除无用的最后10个字段
for i in range(10):
    del df_qikan[df_qikan.columns[8]] 

#，然后再分割引用数字段quote和下载数字段download
def reduce_4(c):
    if len(c.split(' ')) > 1:
        return int(c.split(' ')[0])
    else:
        return 0
#引用数字段quote取首位的数字
df_qikan[df_qikan.columns[6]] = df_qikan.apply(lambda x:  \
    reduce_4(x[df_qikan.columns[7]]), axis=1)

def reduce_5(c):
    x = len(c.split(' '))
    s = c.split(' ')[x-1]
    if s:
        return int(s)
    else:
        return 0
#下载数字段quote取末尾的数字
df_qikan[df_qikan.columns[7]] = df_qikan.apply(lambda x:  \
    reduce_5(x[df_qikan.columns[7]]), axis=1)

#截取发表日期字段
def reduce_6(c):
    return c.strip()[0:10]
df_qikan[df_qikan.columns[4]] = df_qikan.apply(lambda x:  \
    reduce_6(x[df_qikan.columns[4]]), axis=1)


#最难的就是文章标题name，作者author，发表杂志来源source的这3个字段文字处理工作
#有3种处理方式，人工字典，统计学习，深度学习






