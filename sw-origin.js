const CACHE_NAME = 'cache_v' + 2; //默认情况, sw文件变化，会重新注册sw

const CACHE_LIST = [
    "/",
    "/index.html",
    "/index.css",
    "/main.js",
    "/api/img"
];

// 获取数据后，进行缓存
function fetchAddSave(request){
    // 如果请求到了，需要更新缓存
    return fetch(request).then(data => {
        // 用当前服务器返回的响应, 更新缓存

        // 此处res必须克隆, 因为使用一次就会销毁
        let r = res.clone();
        caches.open(CACHE_NAME).then(cache => {
            cache.put(request, r);
        })
        return res;
    })
}

// self等效于this
// 只要拦截到了客户请求，将会来执行fetch方法
// 线程中不能发ajax -> fetch  fetch api
self.addEventListener("fetch", (e) => {
    console.log(e.request.url);

    // 缓存策略: 从缓存取，用网络数据更新缓存
    if(e.request.url.includes("/api/")){
        // 如果请求的是接口
        return e.respondWith(
            fetchAddSave(e.request).catch(err => {
                // 打开缓存, 把缓存中匹配到的结果，返回回去
                return caches.open(CACHE_NAME).then(cache => cache.match(e.request))
            })
        );
    }

    // 如果联网的话就发请求
    e.respondWith( // 用什么内容,返回当前响应
        fetch(e.request).catch(err => {
            // 打开缓存, 把缓存中匹配到的结果，返回回去
            return caches.open(CACHE_NAME).then(cache => cache.match(e.request))
        })
    )
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