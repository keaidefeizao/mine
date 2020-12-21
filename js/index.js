/// <reference path = "./Models/mine.ts" /> 
var mine;
window.onload = function () {
    createDom('初级');
};
//雷数量赋值
function mineAddLenagth(y, x) {
    try {
        // mine.squares[y][x].value++;
        document.getElementById("mine_" + y + "_" + x).innerText = (++mine.squares[y][x].value).toString();
    }
    catch (_a) {
        // console.log(`err坐标是：${y},${x}`)
    }
}
//判断雷位置并给周围格子赋值
function mineVerdict() {
    for (var y = 0; y < mine.tr; y++) {
        for (var x = 0; x < mine.td; x++) {
            if (mine.squares[y][x].type === 'mine') {
                mineAddLenagth(y - 1, x - 1);
                mineAddLenagth(y - 1, x);
                mineAddLenagth(y - 1, x + 1);
                mineAddLenagth(y, x - 1);
                mineAddLenagth(y, x + 1);
                mineAddLenagth(y + 1, x - 1);
                mineAddLenagth(y + 1, x);
                mineAddLenagth(y + 1, x + 1);
            }
        }
    }
}
//初始化雷区
function initMineNumber(type) {
    switch (type) {
        case '初级':
            mine = new Models.Mine(9, 9, 10);
            break;
        case '中级':
            mine = new Models.Mine(16, 16, 40);
            break;
        case '高级':
            mine = new Models.Mine(28, 28, 99);
            break;
        case '重置':
            mine = new Models.Mine(mine.tr, mine.td, mine.mineNum);
            break;
        default:
            return;
    }
}
///加载地雷dom
function createDom(type) {
    // console.log(type)
    initMineNumber(type); //初始化雷区
    mine.init(); //初始化雷区内部
    var table = document.createElement('table');
    for (var y = 0; y < mine.tr; y++) {
        var domTr = document.createElement('tr');
        mine.tds[y] = Array();
        for (var x = 0; x < mine.td; x++) {
            var domTd = document.createElement('td');
            domTd.setAttribute('mine-localhost-y', "" + y);
            domTd.setAttribute('mine-localhost-x', "" + x);
            domTd.setAttribute('id', "mine_" + y + "_" + x);
            mine.tds[y][x] = domTd;
            //显示所有雷的位置
            {
                if (mine.squares[y][x].type === 'number') {
                    domTd.innerText = mine.squares[y][x].value;
                }
                if (mine.squares[y][x].type === 'mine') {
                    domTd.className = 'mine';
                }
            }
            mineAddClickListener(domTd); //设置雷块点击事件
            domTr.appendChild(domTd);
        }
        table.appendChild(domTr);
    }
    mine.parent.childNodes.item(0).remove(); //移除子项
    mine.parent.appendChild(table); //添加子项
    mineVerdict(); //判断雷位置并给周围格子赋值
    // console.log(getAround(mine.squares[0][0]));
}
//设置雷块点击事件
function mineAddClickListener(item) {
    item.addEventListener('click', function (e) {
        var dom = e.target;
        var y = dom.getAttribute('mine-localhost-y');
        var x = dom.getAttribute('mine-localhost-x');
        // mineVerdict(); //判断雷位置并给周围格子赋值
        console.log(getAround(mine.squares[y][x]));
    });
}
function getAround(squares) {
    var x = squares.x;
    var y = squares.y;
    var result = new Array;
    for (var i = x; i <= x + 1; i++) {
        for (var j = y; j <= y + 1; j++) {
            if (i < 0 || j < 0 || j > mine.td - 1 || j > mine.tr - 1
                || (i == x && j == y) || mine.squares[j][i].type === 'mine') {
                continue;
            }
            result.push([j, i]);
        }
    }
    return result;
}
//监听功能更按钮点击事件
document.querySelectorAll('.level button').forEach(function (item) {
    item.addEventListener('click', function (e) {
        var dom = e.target; //获取当前事件的dom
        createDom(dom.innerText);
    });
});
