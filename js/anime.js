// 动画的js文件，分出来便于查找与修改

function click() {  // displayPreWord Anime.DPW();
    var info = document.getElementById("text").innerHTML;
    var length = info.length;
    var now = 0;
    var sub = "";
    var id = setInterval(function () {
        document.getElementById("text").innerHTML = sub;
        sub = info.substring(0, now);
        if (now++ > length)
            clearInterval(id);
    }, 50);
}