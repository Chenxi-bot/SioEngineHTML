// 示范自定义功能
// 建议创作者使用类 + 函数的方法自定义工具
class Chenxi {
    /// 示范工具库，有时候会用到
    constructor() {

    }
    Add() {
        if (arguments.length == 0) {
            return 0;
        }
        else {
            var sum = 0;
            var x;
            for (var x = 0; x < arguments.length; x++) {
                sum += Number(arguments[x]);
            }
            return sum;
        }
    }
}
