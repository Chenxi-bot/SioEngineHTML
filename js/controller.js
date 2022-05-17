// 当引擎初始化时，会创建一个controller对象，该对象将管理游戏大部分内容

function Controller() {

    // 版本类，不影响流程进行，主要是作者进行版本控制与签名
    this.name = "UnLoad"; // 游戏名称
    this.version = "1.0.0";   // 游戏版本
    this.author = "Anonymous";    // 游戏作者

    // 流程类，主要是存档相关，和游戏进程有关，以及一些奇奇怪怪的东西
    this.firstRead = false;   // 是否首次游玩，可以用于演出

}

var controller = new Controller();    // 引擎全局控制，游戏流程由这一个管理
console.log(controller);
