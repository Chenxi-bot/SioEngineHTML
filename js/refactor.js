/** 
 * 当引擎初始化时，会创建一个controller对象，该对象将管理游戏大部分内容
 */
class Controller {

    constructor() {

        // 版本类，不影响流程进行，主要是作者进行版本控制与签名
        this.name = "UnLoad"; // 游戏名称
        this.version = "1.0.0"; // 游戏版本
        this.author = "Anonymous"; // 游戏作者


        // 流程类，主要是存档相关，和游戏进程有关，以及一些奇奇怪怪的东西
        this.firstRead = false; // 是否首次游玩，可以用于演出
        this.charpeter = 0; // 当前阅读的章数
        this.line = -1;  // 当前阅读的行数
        this.Save;
        this.save = [];


        // 内容类，主要是游戏内容相关


        // 功能类，
        this.scenario;  // 剧本，重中之重
        this.clickId = undefined;   // 记录播放的循环id，控制左键点击事件
        this.decoration = false;    // 文字装饰器，算是保留功能，是delay()里面的decoration()函数
        return this;
    }


    // 工具函数类
    loadScenario(path) {    // 加载剧本
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            controller.scenario = JSON.parse(xhr.responseText);

            function load() {
                controller.name = controller.scenario.name;
                document.title = controller.name;
            };
            load();
            delay();
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

/**
 * 图层管理器，功能正在完成中
 */
class imageController {
    // TODO: 动画优化
    constructor() {
        this.fgimage = document.getElementById("fgiamge");
    }

    // addImage()和deleteImage()可以使用css动画来实现
    // 不过感觉用js写应该比css简单
    addImage(src, posx, posy, name) {
        let img = document.createElement("img");
        let fgimage = document.getElementById("fgimage");
        fgimage.appendChild(img);
        img.style.position = "absolute";
        img.style.marginLeft = String(posx) + "px";
        img.style.marginTop = String(posy) + "px";
        img.id = name;
        img.alt = name;
        return ("图层 " + name + " 已创建，" + "路径：" + src);
    }


    deleteImage(name) {
        let ele = document.getElementById(name);
        ele.remove();
        return ("图层 " + name + " 已删除");
    }


    /** replaceImage()为最终接口，详细见注释
     * @function 图片动画函数
     * @description 图片动画，包括添加、替换和删除图片
     * @param name 如果不存在就添加图片，如果存在下一步
     * @param src 如果为空，代表删除图片
     * @param posx x坐标，留空则不变
     * @param posy y坐标，同上
     */
    replaceImage(name, src, posx, posy, time) {
        let ele = document.getElementById(name);

        // 如果当前不存在id为name的图层，调用addImage()函数
        if (ele == null)
            return this.addImage(src, posx, posy, name);

        // 如果并没有传入src参数，调用deleteImage()函数
        if (src == undefined)
            return this.deleteImage(name);

        ele.src = src;

        if (time != undefined) {
            // TODO: 动画，有时间再写，折磨ing
        }
        // 检查是否有pos参数传入，没有就不变
        if (posx != undefined)
            ele.style.marginLeft = String(posx) + "px";
        if (posy != undefined)
            ele.style.marginTop = String(posy) + "px"

        return ("图层 " + name + " 已替换，" + "路径：" + src);
    }
}

// 实例化管理器
var controller = new Controller();
controller.loadScenario("https://sioengine.oss-cn-beijing.aliyuncs.com/demo.json");

// 实例化图层管理器
var iCtrl = new imageController();


function delay() {
    /**
     @function 延迟函数集合
     @description 这个至于什么时候调用随着项目推进还要改一改，但总而言之就是全部加载完毕以后再调用就是了
     */

    document.body.addEventListener("click", leftClick);    // 监听左键动作

    function rightClick() {  // 标准右键动作，隐藏ui和文字层，同时取消默认菜单
        if (document.getElementById("history").style.visibility == "visible") {
            document.getElementById("history").style.visibility = "hidden";
            return false;
        }
        let uiLayer = document.getElementById("ui");
        if (uiLayer.style.visibility == "visible")
            uiLayer.style.visibility = "hidden";
        else
            uiLayer.style.visibility = "visible";
        return false;
    };

    document.oncontextmenu = rightClick;

    document.addEventListener("wheel", function (event) {   // 监听滑轮动作，向下相当于鼠标左键，向上召唤历史菜单
        console.log(event.deltaY);
        console.log(document.getElementById("history").style.visibility == "hidden");
        if (event.deltaY > 0)
            leftClick();
        if ((event.deltaY < 0) && (document.getElementById("history").style.visibility == "hidden"))
            historyMenu();
    });
}

class GameManager {
    static click_anime() {    // 播放动画，每个字逐个显示出来
        let info = "";
        if (arguments != undefined)
            info = arguments[0];
        let length = info.length;
        let now = 0;
        let sub = "";
        controller.clickId = setInterval(function () {
            document.getElementById("text").innerHTML = sub;
            sub = info.substring(0, now);
            if (now++ > length) {
                clearInterval(controller.clickId);
                controller.clickId = undefined;
            }
        }, 50);
    }


    static decoration() { // 装饰函数，用于特殊的装饰，比如人名/语句的引号什么的
        if (controller.decoration && (arguments[0].name != "")) {
            arguments[0].name = "【" + arguments[0].name + "】";
            arguments[0].text = "『" + arguments[0].text + "』";
        }
        else return arguments[0];
    }

    // TODO: 这里需要修改，左键逻辑层
    static leftClick() {   // 动画播放

        // 如果在看历史记录取消点击动作
        if (document.getElementById("history").style.visibility == "visible") {
            if (document.getElementById("history").scrollTop == controller.historyEnd) {
                rightClick();
                return;
            }
            else {
                return;
            }
        }

        // 如果当前有正在播放的动画，立即结束动画并直接显示全部内容
        // 等效于左键双击
        if (controller.clickId != undefined) {
            clearInterval(controller.clickId);
            controller.clickId = undefined;
            document.getElementById("text").innerHTML = controller.scenario.content[controller.line].text;
            return;
        }

        // 如果ui隐藏，显示ui；并且取消当前左键动作
        let uiLayer = document.getElementById("ui");
        if (controller.line >= 0) {
            if (uiLayer.style.visibility == "hidden" && controller.scenario.content[controller.line].text != "") {
                uiLayer.style.visibility = "visible";
                return;
            }
        }

        // 播放逻辑
        // 如果当前行数（偏移量）小于总行数（小于等于总行数-1）
        // 先将清除文字，然后执行播放动画函数（动画为异步），同时替换名字（如果有的话）
        if (controller.line++ < controller.scenario.length) {
            // FIXME: 让ui显示，但是不知道出了什么奇怪的逻辑错误只能这里再写一遍
            if (uiLayer.style.visibility == "hidden")
                uiLayer.style.visibility = "visible";
            document.getElementById("text").innerHTML = "";
            // console.log("nowLine: ", controller.line);
            decoration(controller.scenario.content[controller.line]);   // 装饰器（迫真）预处理
            click_anime(controller.scenario.content[controller.line].text);
            document.getElementById("name").innerHTML = controller.scenario.content[controller.line].name;

            // 关于图片切换
            // 要做的东西有点多
            if (controller.scenario.content[controller.line].anime.picfp != "") {
                let info =
                    iCtrl.replaceImage(
                        controller.scenario.content[controller.line].anime.picname,
                        controller.scenario.content[controller.line].anime.picfp,
                        controller.scenario.content[controller.line].anime.posx,
                        controller.scenario.content[controller.line].anime.posy,
                        controller.scenario.content[controller.line].anime.parameter[0]
                    );
                console.log(info);
            }
        }

        // 播放声音
        if (controller.scenario.content[controller.line].anime.soundpath != "") {

            // 如果在播放上一句的音频则清除
            try {
                let lastPlay = document.getElementById("nowPlay");
                lastPlay.remove();
            }
            catch (error) {
            }

            if (controller.scenario.content[controller.line].anime.repeat == "bgm") {
                try {
                    let bgm = document.getElementById("bgm");
                    bgm.src = controller.scenario.content[controller.line].anime.soundpath;
                    bgm.loop = true;
                    bgm.play();
                } catch (error) {
                    let bgm = document.createElement("audio");
                    bgm.src = controller.scenario.content[controller.line].anime.soundpath;
                    bgm.loop = true;
                    bgm.id = "bgm";
                    bgm.play();
                }
            }
            else {
                let sound = document.createElement("audio");
                sound.id = "nowPlay";
                sound.src = controller.scenario.content[controller.line].anime.soundpath;
                sound.loop = (controller.scenario.content[controller.line].anime.repeat == true);
                let ui = document.getElementById("ui");
                ui.appendChild(sound);
                sound.play();
            }
        }

        // 添加历史记录
        function addHistory(str) {
            let record = document.createElement("p");
            record.innerHTML = str;
            let history = document.getElementById("history");
            history.appendChild(record);
        }
        if (controller.scenario.content[controller.line].name != "")
            addHistory(controller.scenario.content[controller.line].name);
        addHistory(controller.scenario.content[controller.line].text);

        // 调用自定义脚本
        // 最终script以new Fuction(script)()的形式调用，由于不能传参所以在编辑的时候尽量使用全局变量
        if (controller.scenario.content[controller.line].script != "") {
            console.log("script");
            new Function(controller.scenario.content[controller.line].script)();
        }

        // 如果文本为空，则自动播放下一句
        // 这个是为了做动画效果的，比如图片出现平移，多个图片一起出现等等
        // 原脚本逻辑是每一个内容对于同一项内容只有一种更改（即每个图片更改单独一句）
        if (controller.scenario.content[controller.line].text == '') {
            console.log("continue");
            // 这里怎么回事呢？
            // 请看191行的逻辑，因为系统处理脚本很快，完全小于setinversal的50ms，所以第一次LeftClick就会抵消那个……
            leftClick();
            leftClick();
        }
    }


    static historyMenu() {    // 召唤历史记录
        // FIXME: 目前有一个bug，就是调出历史记录后鼠标需要动一下，不然滑轮操作是不能使用的
        document.getElementById("history").style.visibility = "visible";    // 使图层可见
        document.getElementById("history").scrollTop = document.getElementById("history").offsetHeight;  // 使对话在最底部
        controller.historyEnd = document.getElementById("history").scrollTop;
    }
}



































// 以下是存档内容，重构内容不多
class SaveController {
    constructor() {
        this.bgimage;
        this.fgimage;
        this.line;
        this.text;
        this.name;
        this.bgm;
    }
}

var sctrl = new SaveController();
try {
    sctrl = JSON.parse(document.cookie);
} catch (error) {
    console.log(error);
    sctrl = new SaveController();
}
/**
 * 存档初始化函数
 */
function Save() {
    let save = document.getElementById("sl");
    for (let i = 0; i < 4; i++) {
        let row = document.createElement("div");
        row.className = "row";
        let card1 = document.createElement("div");
        card1.className = "card offset-1 col-4";
        let card2 = document.createElement("div");
        card2.className = "card offset-2 col-4";
        row.appendChild(card1); row.appendChild(card2);
        save.appendChild(row);
    }
}

class ImageCache {
    constructor(obj) {
        this.src = obj.src;
        this.id = obj.id;
        this.style = obj.style;
    }
}

class SaveController {
    constructor() {
        this.line;
        this.name;
        this.text;
        this.bgm;
        this.bgimage;
        this.fgimage = [];
    }
}

var sctrl = new SaveController();
function saveGame() {
    sctrl.line = controller.line;
    sctrl.name = document.getElementById("name").innerHTML;
    sctrl.text = document.getElementById("text").innerHTML;
    let bgimage = document.getElementById("bgimage").getElementsByTagName("img")[0];
    sctrl.bgimage = new ImageCache(bgimage);
    let fgimages = document.getElementById("fgimage").getElementsByTagName("img");
    for (let i = 0; i < fgimages.length; i++) {
        sctrl.fgimage.push(new ImageCache(fgimages[i]));
    }
    try {
        document.cookie = JSON.stringify(sctrl);
    } catch (error) {
        console.log(error);
    }
}

function loadGame() {
    try {
        sctrl = JSON.parse(document.cookie);
    } catch (error) {
        console.log(error);
    }
    controller.line = sctrl.line;
    document.getElementById("name").innerHTML = sctrl.name;
    document.getElementById("text").innerHTML = sctrl.text;

    function loadImageCache(cache) {
        let self = document.createElement("img");
        self.src = cache.src;
        self.style = cache.style;
        self.id = cache.id;
        return self;
    }
    try {
        let bgimage = document.getElementById("bgimage");
        let bg = bgimage.getElementsByTagName("img")[0];
        bg.src = sctrl.bgimage.src;
    } catch (error) {
        console.log("不存在背景图片");
        let bgimage = loadImageCache(sctrl.bgimage);
        document.getElementById("bgimage").appendChild(bgimage);
    }

    let fgimage = document.getElementById("fgimage");
    // FIXME: 这里要记得修改，css无法直接被stringify，所以就很奇怪
    for (let i = 0; i < sctrl.fgimage.length; i++) {
        if (document.getElementById(sctrl.fgimage[i].id)) {
            document.getElementById(sctrl.fgimage[i].id).remove();
        }
        fgimage.appendChild(loadImageCache(sctrl.fgimage[i]));
    }
}
