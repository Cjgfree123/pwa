## pwa

### 步骤

1. 搭建项目，新建main.js文件，获取20张图片。

2. 新建mainfest.json文件。

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

### 特点

1. 仅支持https
2. 本地仅支持https
3. serviceWorker里边拿不到DOM。
4. serviceWorker的生命周期

    - install
    - activated 激活
    - redundant 被更新

5. 缺点: 兼容性不是太好。

### 进度33min