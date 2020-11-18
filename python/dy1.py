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


#去除重复数据行
df.drop_duplicates(keep='first', inplace=True)

#从第一个字段拆分索引数字，然后删除第一列（链接地址不用分析）
df_1 = df[[df.columns[0]]]
df_2 = df_1.join(df_1[df_1.columns[0]].str.split('/',expand=True))

del df[df.columns[0]]

#字段归类，方便做数据清理
#'name'', author'', 'source'', 'date'', ' data'',''quote'', ''download''

df_qikan = df.loc[df[df.columns[4]].str.contains('期刊')]
df_baozhi = df.loc[df[df.columns[4]].str.contains('报纸')]
df_jikan = df.loc[df[df.columns[4]].str.contains('辑刊')]
df_huiyi = df.loc[df[df.columns[4]].str.contains('会议')]
df_biaozhun = df.loc[df[df.columns[4]].str.contains('标准')]

df_shuoshi = df.loc[df[df.columns[5]].str.contains('硕士')]
df_boshi = df.loc[df[df.columns[5]].str.contains('博士')]
df_qikan_6 = df.loc[df[df.columns[5]].str.contains('期刊')]

df_qikan_7 = df.loc[df[df.columns[6]].str.contains('期刊')]
df_huiyi_7 = df.loc[df[df.columns[6]].str.contains('会议')]

df_qikan_8 = df.loc[df[df.columns[7]].str.contains('期刊')]
df_huiyi_9 = df.loc[df[df.columns[8]].str.contains('会议')]

#各分类加起来应该等于总数
len(df_qikan)+len(df_baozhi)+len(df_jikan)+len(df_huiyi) \
+len(df_biaozhun)+len(df_shuoshi)+len(df_boshi) \
+len(df_qikan_6)+len(df_qikan_7)+len(df_qikan_8)+len(df_huiyi_7)+len(df_huiyi_9)

#先清理数量最多的期刊
df_qikan.describe()
df_qikan.count()
df_qikan[df_qikan.columns[7]].value_counts()

#定义一个函数，用第一个字段替换第二个字段
def reduce_1(c1,c2):
    return c1
#因为作者author和来源source这2个字段没有分开，要将发表时间date从第3个字段移动到第4个字段
df_qikan[df_qikan.columns[3]] = df_qikan.apply(lambda x:  \
    reduce_1(x[df_qikan.columns[2]],x[df_qikan.columns[3]]), axis=1)

#用jieba分词来拆分第2个字段，作者（多个）+来源
def reduce_2(c1):
    return jieba.lcut(c1)

df_qikan[df_qikan.columns[2]] = df_qikan.apply(lambda x:  \
    reduce_2(x[df_qikan.columns[1]]), axis=1)

#引用数quote和下载数download这5，6两列设置为空字符
df_qikan[df_qikan.columns[5]] = ''
df_qikan[df_qikan.columns[6]] = ''
#定义一个函数，用第一个字段 + 第二个字段
def reduce_3(c1,c2):
    return c1 + '/' + c2
#用后面的字段填充下载数download字段，然后再分割引用数字段
df_qikan[df_qikan.columns[6]] = df_qikan.apply(lambda x:  \
    reduce_3(x[df_qikan.columns[6]],x[df_qikan.columns[17]]), axis=1)





