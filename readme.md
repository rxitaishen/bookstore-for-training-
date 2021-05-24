# 这只是我用来加快学习前端的一个小项目，打算今天完成（5.23）

项目用到的知识笔记都会在这里更新

## 如何开始一个项目

创建文件夹，

创建app.js，

新建models文件夹（用来存放mongo的数据），

git bash here，

输入npm init用来初始化项目（提供了一个package.json，没有他js都运行不起来，当然好像可以在vs里的终端运行）

会让你输入一些信息，当然可有可无，我是新手，基本回车都跳过了。

可以看到package.json已经创建起来了

当然你可以修改这个json文件来安装你需要的一些依赖，具体操作就是在json文件里写"

```
dependencies": {
  "body-parser": "*",
  "express": "*",
  "mongoose": "^5.12.10"
 },
```

原来的json文件:

```
{
  "name": "bookstore",
  "version": "1.0.0",
  "description": "Train project",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

插入后的json文件

```
{
  "name": "bookstore",
  "version": "1.0.0",
  "description": "Train project",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "body-parser": "*",
    "express": "*",
    "mongoose": "^5.12.10"
  },
  "author": "",
  "license": "ISC"
}
```

回到git bash 输入npm init安装这些依赖（‘dependence’）我安装的是express框架（本地的，有全局安装，这个再说吧，我之前安装过全局的）、body-parser、mongoose（一个让node链上mongodb的模块）

输入git init ，这个文件夹已经是项目仓库了，然后按照这个来提交到github上的远程仓库，具体的自己改。

```
git add runoob-test.txt 
git commit -m "添加到远程"

git remote add origin https://github.com/AlwaysbeFun/VSCode_Git_Test.git 
git push -u origin master  //提交到你的仓库
```

这样一切都好了。

## 使用MongoDB

```
show dbs(不用管)
use bookstore（文件夹名）（指定数据库）
show collections(这里没有返回值，因为我没有数据集)
db.createCollection('books')（存放书的名字）
db.createCollection('genres')（存放书的模式）
db.genres(数据集名).insert({name:'Suspense'}) （书类型一的名字是“悬疑类”）

```

## node链接到MongoDB（使用mongoose）

先创建schema（模式）对象，

在通过schema来创建model

model代表的是数据库中的集合，通过Model才能对数据库进行操作

mongoose.model(modelName, schema) 

modelName 就是要映射的集合名 mongoose会自动将集合名变成复数

我们在上面的数据库操作中已经创建了genres集合和books集合

所以这里modelname写genre也行（好像对大小写不是敏感

[详情见这个博客（mongoose的使用介绍）]:https://blog.csdn.net/weixin_39200308/article/details/90232719

## 回调函数和res

## 其他

- **module.exports** 在我们自己写模块的时候，需要在模块最后写好模块接口，声明这个模块**对外暴露什么内容**，**module.exports** 提供了**暴露接口**的方法。

  node里自己的**exports**事实上是对它的一个引用。

  ```
  module.exports.getGenre(函数名) = function({...}) （函数内容）
  ```

- **callback函数** （在一个函数中调用另外一个函数就是callback）

- app.js控制路由，就是访问到哪个URL下面执行什么操作。model里的genres.js控制书籍的类型。books.js结构与genres相同

- 数据传输是我们在敲代码时，经常遇到的一个场景,前后端交互。给数据一个统一的格式有利于我们编写和解析数据。

  json，是一种数据格式，在与后端的数据交互中有较为广泛的应用。

  res.json()和res.send()返回值相同

- JS不会死等时间结束再跳出函数：

  ```
  console.log(a)
  timer(3000, function (x) {
      console.log(x)
  })
  ```

  定时三秒，完成后回头调用function函数，函数都不用命名了，直接叫匿名函数

  

  

