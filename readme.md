# nodejs小项目

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

modelName 就是要**映射的集合名** mongoose会**自动**将集合名变**成复数**

`var whatever = mongoose.model(modelName, schema)//实例化model` 

我们在上面的数据库操作中已经创建了genres集合和books集合

所以这里modelname写genre也行，对genres这个数据集进行操作（好像对大小写不是敏感)



[详情见这个博客（mongoose的使用介绍）]:https://blog.csdn.net/weixin_39200308/article/details/90232719

[Mongoose快速入门]:https://blog.csdn.net/weixin_45828332/article/details/114120710

## 回调函数和res

JS不会死等时间结束再跳出函数：

```
console.log(a)
timer(3000, function (x) {
    console.log(x)
})
```

定时三秒，完成后回头调用function函数，函数都不用命名了，直接叫匿名函数。

先执行完主体再执行回调函数里的内容。

### express中间件（middleware）

Express是一个自身功能极简单，完全由`路由`和`中间件`构成的web开发框架，从本质上说，一个Express应用是在调用各种中间件

`中间件(middleware)`是一个函数,他可以访问请求对象（request object(req)）,响应对象（response object(res)）和web应用中处于请求-响应循环

Express可以使用如下几种中间件：

```
- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件
```

app=new express()这个叫中间件

在回调函数里整个像这样的：

`function（req,res,next)`

其中next还要在函数里指明next()来执行同一个函数体内的下一个函数，还有一个nextrouter，这个是直接跳转到下一个路由了，通常在if语句里见到

没有中间件的话我猜是只执行最先看到的同名路由（路由可以有好几个同名的）

如何你不想要终止`请求-响应循环`,总是记得通过`next()`传递request对象

------

如果你想要在中间件栈中跳过剩余中间件，调用next('route')方法将控制权交给下一个路由

### Next（）的作用

next函数主要负责将控制权交给下一个中间件，如果当前中间件没有终结请求，并且next没有被调用，那么请求将被挂起，后边定义的中间件将得不到被执行的机会。next()的作用就是通过放行允许程序执行多个中间件。

next函数主要是用来确保所有注册的中间件被一个接一个的执行

但如果我们定义的中间件终结了本次请求，那就不应该再调用next函数，否则就可能会出问题，我们来看段代码：https://blog.csdn.net/weixin_44311876/article/details/89920317

### ejs渲染（会在后续加入）

怎么说呢，我第一次接触到一直不知道这个ejs渲染了html跟没渲染的有差别吗，后来我才明白了ejs的用途

ejs是node的后端与html的前端之间的桥梁

当然使用的时候要用app.set设置一些东西（这些等下次我把作业传回来再说）

如：

前端:<%=model  > 

后端:res.render(什么什么什么什么)

注意，render的message那里一定要包涵所有在ejs里面有的字段，如果没有完全包涵所有ejs里有的字段，会报错某某字段没有定义。

res.render和res.send一样会终止代码的运行【不应该说终止代码的运行，因为我没有next了，注意看上面介绍next的博客

```
app.get("/input",(req,res)=>{
    //res.send("input success.")
    //res.render(__dirname+"/views/resp.ejs", {message:name1+",您好！欢迎您的到来。"})
    res.render(__dirname+"/views/resp.ejs", {message1:[{name:"wang",age:22},{name:"zhang",age:23}]})
})

//ejs文件中
<%=message1[0].name %><br>
<%=message1[1].name %><br>
```



### express app详录

### res详录

**Request 对象** - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：

1. req.app：当callback为外部文件时，用req.app访问express的实例

2. req.baseUrl：获取路由当前安装的URL路径

3. req.body / req.cookies：获得「请求主体」/ Cookies

   ```js
   // POST user[name]=tobi&user[email]=tobi@learnboost.com
   req.body.user.name
   // => "tobi"
   
   req.body.user.email
   // => "tobi@learnboost.com"
   
   // POST { "name": "tobi" }
   req.body.name
   // => "tobi"
   ```

4. req.fresh / req.stale：判断请求是否还「新鲜」

5. req.hostname / req.ip：获取主机名和IP地址

6. req.originalUrl：获取原始请求URL

7. req.params：获取路由的parameters

8. req.path：获取请求路径

9. req.protocol：获取协议类型

10. req.query：获取URL的查询参数串

11. req.route：获取当前匹配的路由

12. req.subdomains：获取子域名

13. req.accepts()：检查可接受的请求的文档类型

14. req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码

15. req.get()：获取指定的HTTP请求头

16. req.is()：判断请求头Content-Type的MIME类型

**Response 对象** - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

1. res.app：同req.app一样
2. res.append()：追加指定HTTP头
3. res.set()在res.append()后将重置之前设置的头
4. res.cookie(name，value [，option])：设置Cookie
5. opition: domain / expires / httpOnly / maxAge / path / secure / signed
6. res.clearCookie()：清除Cookie
7. res.download()：传送指定路径的文件
8. res.get()：返回指定的HTTP头
9. res.json()：传送JSON响应
10. res.jsonp()：传送JSONP响应
11. res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
12. res.redirect()：设置响应的Location HTTP头，并且设置状态码302
13. res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
14. res.send()：传送HTTP响应
15. res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
16. res.set()：设置HTTP头，传入object可以一次设置多个头
17. res.status()：设置HTTP状态码
18. res.type()：设置Content-Type的MIME类型



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

  定时三秒，完成后回头调用function函数，函数都不用命名了，直接叫匿名函数。

  先执行完主体再执行回调函数里的内容。

- ```
  //定义model对象来针对modelname集合进行操作 实例化了一个mongoose的model来对数据集进行操作
  var book = module.exports = mongoose.model('Book', bookSchema) //这样就可以对数据库Book中的document进行增删改查了
  
  
  //addBook定义
  module.exports.addBook = function(book, callback){
      Book.create(book, callback);
  }
  
  
  // Add Book
  app.post('/api/books',function(req, res){
      //之前定义的getgenres是一个函数，里面有callback，这里的function就是一个callback函数
      var book  = req.body;
      //book是req.body的实例化对象，好像是一个字典，function(err, book)是addBook定义中的callback函数
      Book.addBook(book,function(err, book){
          if(err){
              throw err;
          }
          res.json(book);
      })
  })
  ```

  

