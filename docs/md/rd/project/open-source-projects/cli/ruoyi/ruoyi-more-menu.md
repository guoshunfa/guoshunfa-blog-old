---
title: 若依 - 添加多级菜单注意事项
date: 2022-08-08 15:14:24
permalink: /pages/509f82/
tags: 
  - null
author: 
  name: 熊猫代码
  link: https://pandacode.cn
---

# 若依 - 添加多级菜单注意事项

转载自：https://blog.csdn.net/asdf2222a/article/details/112977018

先上官方教程

![img](https://file.pandacode.cn/blog/202208081521530.png)

上面是官方的多级目录配置说明，什么在二级目录下**增加`<router-view>`**,这些对于初学vue的人，和初步接触**若依框架**的人，绝对一脸懵逼。下面解释下：

1.增加`<router-view>`:就是在你设置的目录的二级菜单下增加一个index.vue,里面的内容是

```vue
<template >
  <router-view />
</template>
```

**怕大家看不明白，把文件的代码截图也放上**

![img](https://file.pandacode.cn/blog/202208081522378.png) 

上图例

![img](https://file.pandacode.cn/blog/202208081522250.png) 

以上就是我设置的三级菜单，taizhang为一级；summary为二级，然后在summary的目录里放一个router-view（index.vue文件），就可以了。

但是会出现令一个问题

![img](https://file.pandacode.cn/blog/202208081523009.png)

![img](https://file.pandacode.cn/blog/202208081523675.png)

如上图所示，配置好了以后，会在main内容区域多出来一个菜单栏的显示，然后过一会后，这个多出来的菜单栏就消失了，留下二图中我用红框圈出来的一个空白区域。对于我这有轻度完美主义的人，这怎么能忍？？？

然后百度了下，发现有个人也遇到了这个问题，并且解决了。上文

https://blog.csdn.net/Decline1/article/details/108376153

这文章写了具体的结局办法，不过对于新手来说不是很详细。下面我把具体步骤给写出来，主要操作的是二级菜单，如果还需要多级菜单，操作雷同

第一步：

![img](https://file.pandacode.cn/blog/202208081523517.png)

把二级菜单的类型选为菜单，然后吧组建路径配置为xxx（一级菜单）/xxx（二级擦弹）/index(也就是二级菜单中的那个routerview)，然后点击确定。

第二步：

![img](https://file.pandacode.cn/blog/202208081524288.png)

把修改二级菜单，把菜单的类型改回为目录


