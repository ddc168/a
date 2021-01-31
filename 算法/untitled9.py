#导入数据
import pandas as pd
data = pd.read_csv('./train.csv')
data.drop(['Cabin','Name','Ticket','PassengerId']
          ,inplace=True
          ,axis=1
         )
data['Age'] = data['Age'].fillna(data['Age'].mean())
data = data.dropna(axis=0)
data['Sex'] = (data['Sex'] == 'male').astype('int')
data['Embarked'] = data['Embarked'].map({'S':0,'C':1,'Q':2})
X = data.iloc[:,data.columns != "Survived"]
y = data.iloc[:,data.columns == "Survived"]
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
Xtrain,Xtest,Ytrain,Ytest = train_test_split(X,y,test_size=0.3)
clf = DecisionTreeClassifier()
#2.传入训练集训练模型
clf = clf.fit(Xtrain, Ytrain)
#3.传入测试集评价模型
score_ = clf.score(Xtest, Ytest)
score = cross_val_score(clf,X,y,cv=10).mean() #交叉验证集准确度
print('测试集准确度:{}\n交叉验证集准确度:{}'.format(score_,score))
import pydotplus  # 可视化
dot_data = tree.export_graphviz(clf, out_file=None,
                                filled=True, rounded=True,
                                special_characters=True)
graph = pydotplus.graph_from_dot_data(dot_data)
graph.get_nodes()[7].set_fillcolor("#FFF2DD")
graph.write_png("graph.png")
from IPython.display import Image
Image(graph.create_png())