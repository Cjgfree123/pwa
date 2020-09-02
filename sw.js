/**
 * workbox
 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
// import {skipWaiting, clientsClaim} from 'workbox-core';

if (workbox) {
    // skipWaiting();
    // clientsClaim();
    
    console.log(`Yay! Workbox is loaded 🎉`);
    //强制在service worker中使用debug。这样service worker中的log也能打印到chrome console上
    workbox.setConfig({
        debug: true
    });

    //最好写在紧贴着importScripts workbox-sw.js的下面，如果写在文件最后，则不生效。
    // ????? 如何自定义缓存名称
    workbox.core.setCacheNameDetails({
        prefix: "my-app",
        suffix: "v1",
        precache: "custom-precache-name",
        runtime: "custom-runtime-name"
    });

    //缓存文件
    workbox.routing.registerRoute(
        /\.js$/,   //通过正则匹配需要缓存哪些文件
        new workbox.strategies.NetworkFirst({
            cacheName: 'js-cache',  //缓存名，可在application-> Cache storage下找到
        })
    );

    //缓存文件
    workbox.routing.registerRoute(
        /\.css$/,   //通过正则匹配需要缓存哪些文件
        new workbox.strategies.NetworkFirst({
            cacheName: 'css-cache',  //缓存名，可在application-> Cache storage下找到
        })
    );

    workbox.routing.registerRoute(
        /\.(?:js)$/,
        new workbox.strategies.CacheFirst({
            cacheName: 'js-cache',
            plugins: [
                //设置过期时间和最大数量
                new workbox.expiration.Plugin({
                    maxEntries: 20,
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );

    //最好写在紧贴着importScripts workbox-sw.js的下面，如果写在文件最后，则不生效。
    workbox.core.setCacheNameDetails({
        prefix: "my-app",
        suffix: "v3",
        precache: "custom-precache-name",
        runtime: "custom-runtime-name"
    });

    // 安装之前，先进行缓存
    // workbox.precaching.precacheAndRoute([
    //     "/index.css",
    // ]);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

