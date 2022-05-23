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
        return this;
    }

}

var controller = new Controller();    // 引擎全局控制，游戏流程由这一个管理
var scenario;


function readFile(path) {
    var xhr = new XMLHttpRequest();
    var text;
    xhr.onload = function () {
        scenario = jQuery.parseJSON(xhr.responseText);
    };
    try {
        xhr.open("get", path);
        xhr.send(null);
    }
    catch(err) {
        console.log(err);
    }
}
readFile("https://sioengine.oss-cn-beijing.aliyuncs.com/scenario/test.json");
console.log(controller);
