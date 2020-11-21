# -*- coding: utf-8 -*-
"""
Created on Wed Nov 18 16:31:12 2020

@author: ddc
"""

import jieba
 
string = "李小福是创新办主任也是云计算方面的专家"
 
# 精确模式分词
cut_result = jieba.cut(string)
print("===" * 20)
print("/".join(cut_result))
 
# 创新办没有识别出来
# 用自定义词典来定义创新办
# 创新办 3 i
jieba.load_userdict("./userdict.txt")
cut_result = jieba.cut(string)
print("===" * 20)
# 已经识别出来了
print("/".join(cut_result))
print("===" * 20)

# 搜索模式
print(jieba.lcut_for_search(string))
 
