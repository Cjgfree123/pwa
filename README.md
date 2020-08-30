# pwa


## 概念

一、介绍

webapp用户体验差(不能离线访问)，用户粘性低（无法保存入口），pwa属于解决这类问题的总称。

常用到的技术有:

- webapp mainfest
- service worker(核心)
- push api & notification api(目前消息推送在webapp中的兼容性非常差，使用pwa可以解决)
- app shell & app sleleton(app shell:先展示app壳，再展示app内容)

二、缺点


## webapp mainfest

1.介绍: 将网站添加到桌面，类似于native体验。

2.


### webapp mainfest步骤

1. 搭建项目，新建main.js文件，获取20张图片。

2. 新建mainfest.json文件, 并添加到桌面app.

```
{
    "name": "珠峰课堂",  // app mainfest里边的name
    "short_name": "课堂", // app mainfest里边的short name
    "display": "standalone",
    "start_url": "/index.html",
    "icons": [
        {
            "src": "/logo.png",
            "sizes": "144*144",
            "type": "image/png"
        }
    ],
    "background_color": "#aaa",
    "theme_color": "#aaa"
}
```

3. 新建sw.js文件，完成缓存的安装、激活。

### 特点

1. 仅支持https
2. 本地仅支持local
3. serviceWorker里边拿不到DOM。
4. serviceWorker的生命周期

    - install
    - activated 激活
    - redundant 被更新

5. 缺点: 
    - 兼容性不是太好。
    - 可以在桌面重复添加, 并不会覆盖

