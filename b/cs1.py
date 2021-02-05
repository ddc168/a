# -*- coding: utf-8 -*-
"""
Created on Thu Feb  4 15:22:10 2021

@author: ddc
"""

import numpy as np
import pandas as pd
data = pd.read_csv(r'C:\git\a\b\poi.csv',encoding='utf-8')
data.head()
data['typ1'].unique()
typ1 = data.groupby('typ1')['typ1'].count()
typ1
typ2 = data['typ2'].value_counts()
typ2
from pyecharts.charts import Bar

attr = list(typ2.index)[:10]
v1 = list(typ2)[:10]
bar = Bar()
bar.add_xaxis(attr)
bar.add_yaxis('',v1)
bar.render()


import folium


m = folium.Map(location=[45.5236, -122.6750])
m

m = folium.Map(location=[28.12, 112.59])
m
m.save('f1.html')
data.head()


df1 = data[data['typ1'] == '餐饮服务']
df1['typ1'].unique()

from folium import plugins
heatmap1 = folium.Map(location=[28.12, 112.59], zoom_start=11)
heatmap1.add_child(plugins.HeatMap([[row["lat"],row["lon"]] for name, row in df1.iterrows()]))
heatmap1

for name, row in df1.iterrows():
    print(row['lat'])

df2 = data[data['typ1'] == '风景名胜']
df2.head()


from folium import plugins
heatmap2 = folium.Map(location=[28.12, 112.59], zoom_start=11)
heatmap2.add_child(plugins.HeatMap([[row["lat"],row["lon"]] for name, row in df2.iterrows()]))
heatmap2
