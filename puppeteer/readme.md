# 项目思路
  第一步：采集数据
  第二步：生成框架（HL7、OpenEHR、DRGs）
  第三步：在框架的基础上，产生式规则（DRGs）、语义网络、算法/模型

# 项目应用
  1、RSS订阅：全网采集，微信小程序客户端，客户定制搜索，每日更新推送
    卖点：更加个性化（小众）、智能化（语义理解）
  2、同人小说：网络小说采集，场景人物分解，微信小程序客户端，
    卖点：客户定制剧情
  3、MUD游戏：网络小说采集，场景人物分解，微信小程序客户端，
    卖点：客户定制穿越

# 项目发布
  meteor build ../build
  (cd programs/server && npm install)
  MONGO_URL='mongodb://localhost:27017/meteor'
  ROOT_URL='http://127.0.0.1'
  PORT='3000'
  (node main.js)

# puppeteer文档
  https://www.jianshu.com/p/f0451ffce323
  https://www.jianshu.com/p/aa2159356fbd
    // 清空输入框的值，并且输入新的值
    await page.$eval('#input_02',input => input.value='清空原来的值，输入新的' );

# 国内外的对标项目
  Freebase
  Wikidata
  DBpedia
  YAGO
  IMDB
  MusicBrainz

# 医疗知识库
  UMLS
  SNOMED
  MeSH
  Gene Ontology
  Drug-Bank
  PDD graph：EHR中提取的医学知识
  MIMIC-III：重症监护病房病历
  i2b2：医疗领域综合数据集
  UCI:糖尿病患者记录


# 实体的发现与分析-展示
  主题的搜索结果的来源网站的汇总与分析（公司、医院、健康网站）
  主题的搜索结果的再分类（子主题）
  主题的相关搜索结果（出版文献）的年度-数量分析
  领域的数据集（ICD、UMLS）

# 关系的发现与分析-展示

# 事件的发现与分析-展示


