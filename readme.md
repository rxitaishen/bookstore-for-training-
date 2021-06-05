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

modelName 就是要**映射的集合名**（数据库中的） mongoose会**自动**将集合名变**成复数**

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

其中next还要在函数里指明next()来执行**同一个函数体内的下一个函数**，还有一个nextrouter，这个是直接跳转到下一个路由了，通常在if语句里见到

没有中间件的话我猜是只执行最先看到的同名路由（路由可以有好几个同名的）

如何你不想要终止`请求-响应循环`,总是记得通过`next()`传递request对象

------

如果你想要在中间件栈中跳过剩余中间件，调用next('route')方法将控制权交给下一个路由

### Next（）的作用

next函数主要负责将控制权交给下一个中间件，如果当前中间件没有终结请求，并且next没有被调用，那么请求将被挂起，后边定义的中间件将得不到被执行的机会。next()的作用就是通过放行允许程序执行多个中间件。

next函数主要是用来确保所有注册的中间件被一个接一个的执行

但如果我们定义的中间件终结了本次请求，那就不应该再调用next函数，否则就可能会出问题，我们来看段代码：https://blog.csdn.net/weixin_44311876/article/details/89920317

当前面的请求被回复之后，没有next的话还是会执行除了回应之外的代码。res.json最后调用的是res.send返回

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



------

# @AngularJS

## 初见

**ng-app** 指令定义一个 AngularJS 应用程序。

**ng-model** 指令把元素值（比如输入域的值）绑定到应用程序。

**ng-bind** 指令把应用程序数据绑定到 HTML 视图。

```html
<div ng-app="">
    <p>名字 : <input type="text" ng-model="name"></p>
    <h1>Hello {{name}}</h1>
    <p ng-bind="name"></p> //等同于<p>{{name}}</p>
</div>
```

**ng-app** 指令告诉 AngularJS，<div> 元素是 AngularJS **应用程序** 的"所有者"。

**ng-model** 指令把**输入域的值绑定到应用程序变量** **name**。有model一定会有{{}}。*写在标签定义里。***ng-model** 指令绑定输入域到控制器的属性，控制器由$scope操作

**ng-bind** 指令把应用程序变量 name 绑定到某个段落的 innerHTML。只是直接写在标签定义里面了，然而中间就不用写了。

[^注意]:一般来讲，就是app、ctrl、model这几个在用

```html
<div ng-app="" ng-init="firstName='John'">
 	<p>姓名为 <span ng-bind="firstName"></span></p> 
</div>
```

**ng-init** 指令初始化 AngularJS 应用程序变量。执行引号里的内容

以上这些ng开头的被称为指令，他们是angular送给html的新属性，angularjs通过被称为 **指令** 的新属性来扩展 HTML

你要是想让变量跟这些控件联系起来的话就用这些ng指令，只是单独展示的话，{{}}可以考虑一下哦。比如<input ng-model='name'>,input是个输入框，输入框中的值与ng-model变量name关联起来，如果改变了输入框内的文字，name也会被因为关联而改变

（scripe代码）**var myapp = angular.module('myApp',[])** 定义了模块名称，也就是定义了一个模块，当html中的ng-app后面跟的就是这个模块的名称，值得注意的是，一旦html中的ng-app跟了名称，ng-app会去找对应模块的执行代码，也就是这里的scripe代码。angular.module第一个参数是模块的名称，第二个参数是该模块所依赖的其他模块。

AngularJS 应用组成如下：

- View(视图), 即 HTML。
- Model(模型), 当前视图中可用的数据。
- Controller(控制器), 即 JavaScript 函数，可以添加或修改属性。

## 表达式

AngularJS 表达式写在双大括号内：**{{ expression }}**。

AngularJS 表达式把数据绑定到 HTML，这与 **ng-bind** 指令有异曲同工之妙。

AngularJS 将在表达式书写的位置"输出"数据。表达式可执行

**AngularJS 表达式** 很像 **JavaScript 表达式**：它们可以包含文字、运算符和变量。

​		与 JavaScript 表达式不同，AngularJS 表达式可以写在 HTML 中。

​		与 JavaScript 表达式不同，AngularJS 表达式不支持条件判断，循环及异常。

​		与 JavaScript 表达式不同，AngularJS 表达式支持过滤器。

实例 {{ 5 + 5 }} 或 {{ firstName + " " + lastName }}



## 应用

AngularJS **模块（Module）** 定义了 AngularJS 应用。

AngularJS **控制器（Controller）** 用于控制 AngularJS 应用。

**ng-app**指令指明了应用, **ng-controller** 指明了控制器。

```html
<div ng-app="myApp" ng-controller="myCtrl">
 
名: <input type="text" ng-model="firstName"><br>
姓: <input type="text" ng-model="lastName"><br>
<br>
姓名: {{firstName + " " + lastName}}
 
</div>
 
<script>
var app = angular.module('myApp', []); 
app.controller('myCtrl', function($scope) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
});
</script>
```

[^angular.module]:可以理解为引用名字为myapp的应用程序作为模块，第一个参数是模块的名称，第二个参数是依赖列表，也就是要引用到的其他模块

## 字典与数组

```html
//字典
<div ng-app="" ng-init="person={firstName:'John',lastName:'Doe'}">//数组为point=[2,3,5]
<p>姓为 {{ person.lastName }}</p>
</div>
```

## 指令

除了上面的ng-app\ng-init\ng-model等等之外，还有几个指令需要了解。

### *ng-model

`ng-model` 指令可以将输入域的值与 AngularJS 创建的变量绑定。也写在标签定义里面，通常是<input ng-model='name'>，可以简易理解为创建了一个name对象，可以被赋值和利用表达式调用

### *ng-repeat

**ng-repeat** 指令会重复一个 HTML 元素：

```
<div ng-app="" ng-init="names=['Jani','Hege','Kai']">
  <p>使用 ng-repeat 来循环数组</p>
  <ul>
    <li ng-repeat="x in names">
      {{ x }}
    </li>
  </ul>
</div>
```

<img src="C:\Users\11195\AppData\Roaming\Typora\typora-user-images\image-20210602112945617.png" alt="image-20210602112945617" style="zoom:50%;" />

**ng-repeat** 指令用在一个对象数组上：

```
<div ng-app="" ng-init="names=[
{name:'Jani',country:'Norway'},
{name:'Hege',country:'Sweden'},
{name:'Kai',country:'Denmark'}]">
 
<p>循环对象：</p>
<ul>
  <li ng-repeat="x    in names">
    {{ x.name + ', ' + x.country }}
  </li>
</ul>

</div>
```

<img src="C:\Users\11195\AppData\Roaming\Typora\typora-user-images\image-20210602113148327.png" alt="image-20210602113148327" style="zoom:50%;" />

## Scope

**scope 是一个 JavaScript 对象，带有属性和方法，这些属性和方法可以在视图和控制器中使用。**这些属性和方法在html中的ng-model（用于创建对象）中获取

~~是先有视图（html），再有控制器。先要在视图中有{{carname}}，才能在控制器中有$scope.carname，不然控制器获取不到carname这个变量，不知道赋值到哪，或者……两者相辅相成？~~不分先后只要对应起来就可以？

​	当在控制器中添加 **$scope** 对象时，视图 (HTML) 可以获取了这些属性。

​	视图中，你不需要添加 **$scope** 前缀, 只需要添加属性名即可，如： **{{carname}}**。

控制器中创建一个属性名 "carname"，对应了视图中使用 {{ }} 中的名称

[^小贴士]:ng-app\ng-contorller都会先在标签内声明，这里强烈建议去看一下这个博客，或许对ng-app\ng-contorller的理解有帮助  [ng-app与ng-app='myApp'的区别](https://www.cnblogs.com/echolun/p/8655986.html)

### *作用域

只要是自己所对应的ng-ctrl（应用），那个ng-ctrl容器里的所有就是她的作用域

### *根作用域

所有的应用都有一个 **$rootScope**，它可以作用在 **ng-app** 指令包含的所有 HTML 元素中。

**$rootScope** 可作用于整个应用中。是各个 controller 中 scope 的桥梁。用 rootscope 定义的值，可以在各个 controller 中使用。

创建控制器时，将 $rootScope 作为**参数传递**，可在应用中使用。如下面示例中控制器函数所示

### *示例

```
<div ng-app="myApp" ng-controller="myCtrl">

<h1>{{lastname}} 家族成员:</h1>

<ul>
    <li ng-repeat="x in names">{{x}} {{lastname}}</li>
</ul>

</div>

<script>
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $rootScope) {
    $scope.names = ["Emil", "Tobias", "Linus"];
    $rootScope.lastname = "Refsnes";
});
</script>
```

## 控制器

好像没什么好说的，她是 **JavaScript 对象**，由标准的 JavaScript **对象的构造函数** 创建。

AngularJS 应用程序被控制器控制。

**ng-controller** 指令定义了应用程序控制器。

[^小贴士]:要用控制器的话只要在index页上添加引用代码，之后其他的子页也都用上了。<script src="personController.js"></script>

## 服务

在 AngularJS 中，服务是一个函数或对象，可在你的 AngularJS 应用中使用。

AngularJS 内建了30 多个服务。

有个 **$location** 服务，它可以返回当前页面的 URL 地址。

```
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $location) {
    $scope.myUrl = $location.absUrl();
});
```

### *$http服务

**$http** 是 AngularJS 应用中最常用的服务。 服务向服务器发送请求，应用响应服务器传送过来的数据。

[^大贴士]:【http模拟浏览器发送请求->请求被后端的express接收到(app.js)，执行相应代码->更新数据库等一系列操作->后端express的res返回数据给angular的http服务->angular的http服务成功后（.success），会将获取到的数据捆绑至scope对象的属性中（自己设置的函数）->前端代码利用scope对象的属性来展示。】

```
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $http.get("welcome.htm").then(function (response) {
        $scope.myWelcome = response.data;
    });
});
```



[^小贴士]:控制器内那些美元符号的都叫做服务：


------



# @Express


首先，在 **wiki.js** 模块中创建一个维基路由。代码一开始导入 Express 应用对象，用它取得一个 `Router` 对象，然后用 `get()` 方法向其添加两个具体的路由。模块的最后导出该 `Router` 对象。

```
// wiki.js - 维基路由模块

const express = require('express');
const router = express.Router();

// 主页路由
router.get('/', (req, res) => {
  res.send('维基主页');
});

// “关于页面”路由
router.get('/about', (req, res) => {
  res.send('关于此维基');
});

module.exports = router;
```

**注：**上面的路由处理回调直接定义在了路由函数中。LocalLibrary 的回调将定义在单独的控制器模块中。

要在主应用中使用该路由模块，首先应 `require` 它（**wiki.js**），然后对 Express 应用对象调用 `use()`（指定路径‘/wiki’），即可将其添加到中间件处理路径。

```
const wiki = require('./wiki.js');
// ...
app.use('/wiki', wiki);
```

这时 `wiki` 模块中定义的两个路由就可以从 `/wiki/` 和 `/wiki/about/` 访问了。

### [路由函数](https://developer.mozilla.org/zh-CN/docs/learn/Server-side/Express_Nodejs/routes#路由函数)

上述模块定义了两个典型的路由函数。`Router.get()` 方法定义的 “about” 路由（下方重现的）仅响应 HTTP GET 请求。第一个参数是 URL 路径，第二个参数是一个回调，在收到带有路径的HTTP GET 请求将调用之。

```
router.get('/about', (req, res) => {
  res.send('关于此维基');
});
```

该回调有三个参数（通常命名为：`req`、`res`、`next`），分别是：HTTP 请求对象、HTTP 响应、中间件链中的下一个函数。

**注：**路由函数就是 [Express 中间件](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#Using_middleware)，这意味着它们必须（通过响应）结束请求，否则必须调用链中的 `next` 函数。上述示例使用`send()` 完成了请求，所以没有使用 `next` 参数（参数表中将其省略）。

上述路由函数只需要一个回调，可以根据需要指定任意数量的回调参数，或一个回调函数数组。每个函数都将加入中间件链，并且将按添加顺序调用（若有回调完成请求则中止当前周期）。

### [路由参数](https://developer.mozilla.org/zh-CN/docs/learn/Server-side/Express_Nodejs/routes#路由参数)

路径参数是命名的 URL 段，用于捕获在 URL 中的位置指定的值。命名段以冒号为前缀，然后是名称（例如 `/**:**your_parameter_name/`。捕获的值保存在 `req.params` 对象中，键即参数名（例如 `req.params.your_parameter_name`）。

举例说，一个包含用户和藏书信息的 URL：`http://localhost:3000/users/34/books/8989`，可以这样提取信息（使用 `userId` 和 `bookId` 路径参数）：

```
app.get('/users/:userId/books/:bookId', (req, res) => {
  // 通过 req.params.userId 访问 userId
  // 通过 req.params.bookId 访问 bookId
  res.send(req.params);
});
```

路由参数名必须由“单词字符”（/`[A-Za-z0-9_]`/）组成。

**注：**URL *`/book/create` 会匹配* `/book/:bookId` 这样的路由（将提取值为'`create`' 的 '`bookId`'）。第一个与传入 URL 相匹配的路由会被使用，因此 `/book/create` 的路由处理器必须定义在 `/book/:bookId` 路由之前，才能妥善处理。
