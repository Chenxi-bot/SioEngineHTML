// 动画的js文件，分出来便于查找与修改

function click_anime() {  // displayPreWord Anime.DPW();
    var info = "";
    if (arguments != null)
        info = arguments[0];
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

document.body.addEventListener("click", function () {
    if (controller.line++ <= scenario.length)
    {
        document.getElementById("text").innerHTML = "";
        console.log("nowLine: ", controller.line);
        click_anime(scenario.content[controller.line].text);
        document.getElementById("name").innerHTML = scenario.content[controller.line].name;
    }
    
});
