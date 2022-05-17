// 在制作的过程中写的一些函数，基本是自造轮子


function readFile(path) {
    const fs = require('fs');
    var data = fs.readFileSync(path);
    return data.toString();
}
