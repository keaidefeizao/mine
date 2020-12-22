/// <reference path = "./Models/mine.ts" /> 
var mine;
var mineX = 'mine-localhost-x';
var mineY = 'mine-localhost-y';
window.onload = function () {
    createDom('初级');
};
// //雷数量赋值
// function mineAddLenagth(y:number,x:number):void{
//     try{
//         // mine.squares[y][x].value++;
//         (<HTMLElement>document.getElementById(`mine_${y}_${x}`)).innerText = (++mine.squares[y][x].value).toString();
//     }catch{
//         // console.log(`err坐标是：${y},${x}`)
//     }
// }
// //判断雷位置并给周围格子赋值
// function mineVerdict(){
//     for(let y =0;y<mine.tr;y++){
//         for(let x = 0;x< mine.td;x++){
//             if (mine.squares[y][x].type ==='mine'){
//                 mineAddLenagth(y-1,x-1)
//                 mineAddLenagth(y-1,x)
//                 mineAddLenagth(y-1,x+1)
//                 mineAddLenagth(y,x-1)
//                 mineAddLenagth(y,x+1)
//                 mineAddLenagth(y+1,x-1)
//                 mineAddLenagth(y+1,x)
//                 mineAddLenagth(y+1,x+1)
//             }
//         }
//     }
// }
//判断初始化雷区
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
    //取消鼠标右击菜单
    mine.parent.oncontextmenu = function () {
        return false;
    };
    mine.init(); //初始化雷区内部
    updateNum();
    var table = document.createElement('table');
    for (var y = 0; y < mine.tr; y++) {
        var domTr = document.createElement('tr');
        mine.tds[y] = Array();
        for (var x = 0; x < mine.td; x++) {
            var domTd = document.createElement('td');
            domTd.setAttribute("" + mineX, "" + x);
            domTd.setAttribute("" + mineY, "" + y);
            domTd.setAttribute('id', "mine_" + y + "_" + x);
            mine.tds[y][x] = domTd;
            //显示所有雷的位置
            {
                // if(mine.squares[y][x].type === 'number'){
                //     domTd.innerText = mine.squares[y][x].value;
                // }
                // if(mine.squares[y][x].type ==='mine'){
                //     domTd.className = 'mine'
                // }
            }
            mineAddClickListener(domTd); //设置雷块点击事件
            domTr.appendChild(domTd);
        }
        table.appendChild(domTr);
    }
    mine.parent.childNodes.item(0).remove(); //移除子项
    mine.parent.appendChild(table); //添加子项
    // mineVerdict(); //判断雷位置并给周围格子赋值
    // console.log(getAround(mine.squares[0][0]));
}
function play(ev) {
    var dom = ev.target;
    var y = dom.getAttribute(mineY);
    var x = dom.getAttribute(mineX);
    var squares = mine.squares[y][x];
    if (ev.buttons === 1) { //左键
        //如果已经镖旗则不继续执行
        if (dom.className === 'flag') {
            return;
        }
        if (squares.type === 'number') {
            dom.innerText = squares.value;
            if (squares.value > 0) {
            }
            else {
            }
        }
        else {
            dom.className = 'mine-active';
        }
    }
    else if (ev.buttons === 2) { //右键
        if (dom.innerText === '' && dom.className === '') {
            dom.className = 'flag';
        }
        else if (dom.className === 'flag') {
            dom.className = 'question';
        }
        else if (dom.className === 'question') {
            dom.className = '';
        }
    }
}
//设置雷块点击事件
function mineAddClickListener(item) {
    // item.addEventListener('click',(e)=>{
    //     let dom = <HTMLElement>e.target;
    //     let y = dom.getAttribute('mine-localhost-y');
    //     let x = dom.getAttribute('mine-localhost-x');
    //     let data = getAround(mine.squares[y][x]);
    //     console.log(data);
    //     // mineVerdict(); //判断雷位置并给周围格子赋值
    //     // console.log(getAround(mine.squares[y][x]));
    // });
    item.onmousedown = function (e) {
        play(e);
    };
}
function getAround(squares) {
    var x = squares.x;
    var y = squares.y;
    var result = new Array;
    for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
            try {
                if (i < 0 ||
                    j < 0 ||
                    j > mine.td - 1 ||
                    j > mine.tr - 1 ||
                    (i == x && j == y) ||
                    mine.squares[j][i].type === 'mine') {
                    continue;
                }
                result.push([j, i]);
            }
            catch (_a) {
                // console.log(`err错误坐标:${i}_${j}`);
            }
        }
    }
    return result;
}
function updateNum() {
    for (var i = 0; i < mine.tr; i++) {
        for (var j = 0; j < mine.td; j++) {
            if (mine.squares[i][j].type === 'number') {
                continue;
            }
            var num = getAround(mine.squares[i][j]); //获取到每一个雷周围的数字
            for (var k = 0; k < num.length; k++) {
                num[k] == [0, 1];
                mine.squares[num[k][0]][num[k][1]].value++;
            }
            // console.log(num);
        }
    }
}
//监听功能按钮点击事件
document.querySelectorAll('.level button').forEach(function (item) {
    item.addEventListener('click', function (e) {
        var dom = e.target; //获取当前事件的dom
        createDom(dom.innerText);
    });
});
