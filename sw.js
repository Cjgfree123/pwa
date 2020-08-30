const CACHE_NAME = 'cache_v' + 2; //默认情况, sw文件变化，会重新注册sw

const CACHE_LIST = [
    "/",
    "/index.html",
    "/index.css",
    "/main.js",
    "/api/img"
];

// self等效于this
// 只要拦截到了客户请求，将会来执行fetch方法
self.addEventListener("fetch", (e) => {
    console.log(e.request.url);
})

/**
 * @description 缓存需要的内容
 */
function preCache() {
    // 开启了一个缓存空间
    return caches.open(CACHE_NAME)
        .then(cache => {
            // 添加列表到缓存
            return cache.addAll(CACHE_LIST);
        });
}

/**
 * @description 安装
 * 1. 缓存
 */
self.addEventListener("install", (e) => {
    // 如果上一个serviceWorker不销毁，需要手动skipWaitting来安装. 或者下次重新进入页面，将会重新安装。
    console.log("install");

    e.waitUntil(
        preCache() // 等待promise执行完成
            .then(skipWaiting) // 手动skipWaitting, 安装新的缓存
    );
});

// 删除缓存的历史版本
function clearCache() {
    return caches.keys().then(keys => {
        return Promise.all(keys.map(key => {
            if (key !== CACHE_NAME) {
                return caches.delete(key);
            }
        }));
    })
}

/**
 * @description 激活当前serviceWorker, 让sw马上生效 
 * 1.默认sw激活后，不会立即生效，可以使用self.clients.claim()让sw立即生效。 
 * 2.当前sw安装完毕后，会先清缓存,删除掉缓存的历史版本; 再让新缓存立即生效。
 */
self.addEventListener("activate", (e) => {
    e.waitUntil(
        Promise.all([
            clearCache(),
            self.clients.claim()
        ])
    )
})

/**
 * 添加主屏幕展示规则: 两次访问之间，间隔5分钟，会弹出是否安装; 也可以在谷歌 控制台->mainfest,手动添加。
 */