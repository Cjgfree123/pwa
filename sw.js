// self等效于this
// 只要拦截到了客户请求，将会来执行fetch方法
self.addEventListener("fetch", (e) => {
    console.log(e.request.url);
})