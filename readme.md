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