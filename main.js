let content = document.getElementById("content");

let xhr = new XMLHttpRequest();
xhr.open("get", '/api/img', true);
xhr.responseType = "json";
xhr.onload = function(){
    let arr = xhr.response;
    let str = "";
    arr.forEach(item => {
        str += `<li><img src="${item}"/></li>`;
    });
    content.innerHTML = str;
}
xhr.send();

