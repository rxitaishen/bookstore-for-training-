<a href=''></a>

<img src="" width="100" height="10" />注意后面的斜线 在xhtml中，这种元素一定要关闭的 后面的width和height属性好像能改矢量图？



## HTML 空元素

没有内容的 HTML 元素被称为空元素。空元素是在开始标签中关闭的。

<br> 就是没有关闭标签的空元素（<br> 标签定义换行）。

在 XHTML、XML 以及未来版本的 HTML 中，所有元素都必须被关闭。

在开始标签中添加斜杠，比如 <br />，是关闭空元素的正确方法，HTML、XHTML 和 XML 都接受这种方式。

即使 <br> 在所有浏览器中都是有效的，但使用 <br /> 其实是更长远的保障。

## HTML 属性常用引用属性值

属性值应该始终被包括在引号内。

双引号是最常用的，不过使用单引号也没有问题。

![Remark](https://www.runoob.com/images/lamp.gif)**提示:** 在某些个别的情况下，比如属性值本身就含有双引号，那么您必须使用单引号，例如：name='John "ShotGun" Nelson'

## HTML 属性参考手册

查看完整的HTML属性列表: [HTML 标签参考手册](https://www.runoob.com/tags/html-reference.html)。

下面列出了适用于大多数 HTML 元素的属性：

| class | 为html元素定义一个或多个类名（classname）(类名从样式文件引入) |
| ----- | ------------------------------------------------------------ |
| id    | 定义元素的唯一id                                             |
| style | 规定元素的行内样式（inline style）                           |
| title | 描述了元素的额外信息 (作为工具条使用)                        |

更多标准属性说明： [HTML 标准属性参考手册](https://www.runoob.com/tags/ref-standardattributes.html).

## HTML 水平线

<“hr”> 标签在 HTML 页面中创建水平线。

## HTML 注释

<!-- 这是一个注释 -->

## HTML的忽略

浏览器在执行html文件时会忽略源代码中的排版，也就是你换行只能通过br来换行（会省略多余的空格和换行）（用pre标签可以解决）

## HTML的链接样式表

在head中加入<link>，定义文档与外部资源的关系，最常见的用途是链接样式表，他没有借宿标签，正确关闭用/

## 
