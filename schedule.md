# 后续计划与bug

打算就用这个作为期末大作业的基础了，到时候再看看有没有可以增加删除的


//应该在这里改变获取books的函数，先在model里改变getbooks的函数，让他变成像找title一样找到匹配的author
//前后端的交流都会通过controller作为桥梁，前端从scope里获取对象，后端响应ctrl里的http请求对数据库进行操作获取值传回ctrl里，由scope捕获，并赋值给被scope声明的对象
//主要问题是要明白表单的提交
//现在还有个问题是管理员权限怎么判断,目前想法是不能添加电影,但怎么判断呢，是不是还要从芒果里获取admin值，在ctrl的scope或者前端的{{}}判断值
//好像初始页是肯定要改的，那这样的话,ng—view那里又要改了，是不是要切换不同的angularmodule还是切换ctrl？
//不如这样，初始页就定死是登录界面，然后，可视这样之前不是出了问题吗，那之前出的问题是不是能在前端的app里改掉根目录的那个路由就能解决？、
//还是有很多问题啊，这个好了之后一定要先写笔记，查的话，不是在登录那里实现了吗，
//就这样决定了，先解决登录页面，之后再去看看要不要做查的

## 5.24

打算加入ejs笔记和在代码里使用ejs

打算熟悉express的app.post这些东西，

打算熟悉res这些东西

打算熟悉老师教的所有内容

*目前来看，前端的确很适合我*

## 6.12

现在就是比要加入查询影院信息和查询影院信息报错的网页 以及在detail页中能想“查看详情”按钮一样点开的book.publisher（<a>链接）现时实现后端 再实现前端



高级搜索查询就是要添加一个<a>标签按钮连接到高级搜索网页，

~~去看课堂作业 使用input表单了解req.query的使用与传递，现在顾虑是没填写的就一定是空吗~~

~~这里主要要参考课上作业。还有了解addbook中的下拉组件是怎么实现的，额貌似很简单的<li>  然后ngmodel~~

还要添加数据 电影就每个电影院添加一部电影好了，其他的就不展示了

这里还要注意js的字符串比较，如果字符串只是单纯的数字，就会在对比时将字符串转变为数字，就能跟数字进行大小于号对比，如果是a或者100a这样的情况的话，转换成数字的时候都会返回nan值 nan值与任何值比较都会是false，到时候还得改。

[字符串比大小详情看这]:https://blog.csdn.net/qq_42445490/article/details/88819093

不能findone了（还要去了解mongoose find的返回值是什么）有解决了，因为mongoose的find最后返回的是一个model数组 到时候判断这个数组是否为空就好，判断为空的方法就是获取他的长度 arr.length ==0

genre就下拉菜单（下拉） 

时长就先下拉框判断大于小于还是等于后面输入值。

其他的应该就差不多是作者



还有就是网页设计说明书还没写

