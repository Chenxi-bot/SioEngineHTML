// 当引擎初始化时，会创建一个controller对象，该对象将管理游戏大部分内容

class Controller {
    constructor() {

        // 版本类，不影响流程进行，主要是作者进行版本控制与签名
        this.name = "UnLoad"; // 游戏名称
        this.version = "1.0.0"; // 游戏版本
        this.author = "Anonymous"; // 游戏作者


        // 流程类，主要是存档相关，和游戏进程有关，以及一些奇奇怪怪的东西
        this.firstRead = false; // 是否首次游玩，可以用于演出
        this.charpeter = 0;
        this.line = 0;
        this.clickId = undefined;

        // 内容类，主要是游戏内容
        this.scenario;

        return this;
    }

    // 工具函数类
    loadScenario(path) {    // 加载剧本
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            controller.scenario = JSON.parse(xhr.responseText);

            function load() {
                console.log("load");
                controller.name = controller.scenario.name;
                document.title = controller.name;
                console.log("rename");
            };
            load();
        };
        try {
            xhr.open("get", path);
            xhr.send(null);
        }
        catch (err) {
            console.log(err);
        }
    }
}

// 人物图层，作为子对象方便管理
class imageLayer {
    constructor(src) {
        this.ele = document.createElement("img");
        this.index = 0;
        this.ele.src = src;
    }
}

// 图层管理器，功能正在完成中
class imageController {
    constructor() {
        this.layers = [];
        this.fgimage = document.getElementById("fgiamge");
    }
    addImage(src, posx, posy) {

    }
}

// 实例化管理器
var controller = new Controller();
controller.loadScenario("https://sioengine.oss-cn-beijing.aliyuncs.com/scenario/test.json");


// 动画类，需要等整个网页加载完成以后使用
window.onload = function Anime() {

    function click_anime() {    // 播放动画，每个字逐个显示出来
        let info = "";
        if (arguments != undefined)
            info = arguments[0];
        let length = info.length;
        let now = 0;
        let sub = "";
        controller.clickId = setInterval(function () {
            document.getElementById("text").innerHTML = sub;
            sub = info.substring(0, now);
            if (now++ > length)
            {
                clearInterval(controller.clickId);
                controller.clickId = undefined;
            }
        }, 50);
    }

    document.body.addEventListener("click", function () {   // 监听左键动作，进行动画播放

        // 如果当前有正在播放的动画，立即结束动画并直接显示全部内容
        // 等效于左键双击
        if (controller.clickId != undefined) {
            clearInterval(controller.clickId);
            controller.clickId = undefined;
            document.getElementById("text").innerHTML = controller.scenario.content[controller.line].text;
            return;
        }

        // 播放逻辑
        // 如果当前行数（偏移量）小于总行数（小于等于总行数-1）
        // 先将清除文字，然后执行播放动画函数（动画为异步），同时替换名字（如果有的话）
        if (controller.line++ < controller.scenario.length) {
            document.getElementById("text").innerHTML = "";
            // console.log("nowLine: ", controller.line);
            click_anime(controller.scenario.content[controller.line].text);
            document.getElementById("name").innerHTML = controller.scenario.content[controller.line].name;
        }

    });

    document.oncontextmenu = function () {  // 标准右键动作，隐藏ui和文字层
        // console.log("right click");
        let uiLayer = document.getElementById("ui");
        if (uiLayer.style.visibility == "visible")
            uiLayer.style.visibility = "hidden";
        else
            uiLayer.style.visibility = "visible";
        return false;
    };


}