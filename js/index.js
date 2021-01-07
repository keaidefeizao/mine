var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/// <reference path = "./Models/mine.ts" /> 
var mine;
var isGameOver = false; //游戏状态
var mineX = 'mine-localhost-x';
var mineY = 'mine-localhost-y';
var cl = ['zero', 'one', 'two', 'three', , 'four', 'five', 'six', 'seven', 'eigth'];
var arrFlag;
var mineNum;
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
function setDomMineNum(mineNum) {
    document.getElementById('mineLength').innerText = mineNum.toString();
}
//判断初始化雷区
function initMineNumber(type) {
    switch (type) {
        case '初级':
            mine = new Models.Mine(9, 9, 11);
            break;
        case '中级':
            mine = new Models.Mine(16, 16, 41);
            break;
        case '高级':
            mine = new Models.Mine(28, 28, 100);
            break;
        case '重置':
            mine = new Models.Mine(mine.tr, mine.td, mine.mineNum);
            break;
        default:
            return;
    }
    mineNum = mine.mineNum - 1;
    setDomMineNum(mineNum);
}
///加载地雷dom
function createDom(type) {
    // console.log(type)
    arrFlag = new Array;
    initMineNumber(type); //初始化雷区
    isGameOver = false; //初始化游戏状态
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
    return __awaiter(this, void 0, void 0, function () {
        var dom, y, x, square;
        return __generator(this, function (_a) {
            dom = ev.target;
            y = dom.getAttribute(mineY);
            x = dom.getAttribute(mineX);
            square = mine.squares[y][x];
            if (ev.buttons === 1) { //左键
                //如果已经镖旗则不继续执行
                if (dom.className === 'flag') {
                    return [2 /*return*/];
                }
                if (square.type === 'number') {
                    dom.className = cl[square.value];
                    if (square.value > 0) {
                        dom.innerText = square.value;
                    }
                    else {
                        getAllZero(square);
                    }
                }
                else {
                    dom.className = 'mine-active';
                    if (confirm('游戏结束！是否继续？')) {
                        continueGame(); //继续游戏
                    }
                    else {
                        isGameOver = true;
                    }
                }
            }
            else if (ev.buttons === 2) { //右键
                if (dom.innerText === '' && dom.className === '') {
                    dom.className = 'flag';
                    addFlag(square); //添加红旗
                }
                else if (dom.className === 'flag') {
                    dom.className = 'question';
                    removeFlag(square.y, square.x); //移除红旗
                }
                else if (dom.className === 'question') {
                    dom.className = '';
                    removeFlag(square.y, square.x); //移除红旗
                }
            }
            return [2 /*return*/];
        });
    });
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
        if (!isGameOver) { //游戏未结束才可继续点击
            play(e);
        }
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
function getAllZero(square) {
    var _a;
    var around = getAround(square);
    (_a = document.querySelector("td[" + mineY + "='" + square.y + "'][" + mineX + "='" + square.x + "']")) === null || _a === void 0 ? void 0 : _a.setAttribute('is-check', 'true');
    for (var i = 0; i < around.length; i++) {
        var y = around[i][0];
        var x = around[i][1];
        var mineNum_1 = mine.squares[y][x];
        mine.squares[y][x].check = true;
        var dom = document.querySelector("td[" + mineY + "='" + y + "'][" + mineX + "='" + x + "']");
        mine.tds[y][x].className = cl[mineNum_1.value]; //设置样式颜色
        if (mineNum_1.value === 0) {
            if (dom.getAttribute('is-check') !== 'true') {
                dom === null || dom === void 0 ? void 0 : dom.setAttribute('is-check', 'true');
                getAllZero(mineNum_1);
            }
        }
        else {
            dom.innerHTML = mineNum_1.value;
        }
    }
}
//检查是否完成游戏
function checkGame(arrFlagLength) {
    if (arrFlagLength === mine.mineNum - 1) {
        if (confirm('恭喜！！扫雷成功。是否继续')) {
            continueGame(); //继续游戏
        }
        else {
            isGameOver = true;
        }
        return true;
    }
    return false;
}
//添加红旗数据
function addFlag(item) {
    for (var i = 0; i < mine.tr; i++) {
        for (var j = 0; j < mine.td; j++) {
            if (mine.squares[i][j].type === 'number') {
                continue;
            }
            else {
                if (mine.squares[i][j].x === item.x && mine.squares[i][j].y === item.y) {
                    arrFlag.push(item);
                    setDomMineNum(--mineNum);
                    //检查是否完成游戏
                    if (checkGame(arrFlag.length))
                        return;
                }
            }
        }
    }
}
//删除红旗数据
function removeFlag(y, x) {
    for (var i = 0; i < arrFlag.length; i++) {
        if (arrFlag[i].y === y && arrFlag[i].x === x) {
            arrFlag.splice(i, 1);
            setDomMineNum(++mineNum);
        }
    }
}
//继续游戏
function continueGame() {
    var buttonDom = document.querySelector('.level button.active');
    createDom(buttonDom.innerHTML);
}
//监听功能按钮点击事件
document.querySelectorAll('.level button').forEach(function (item) {
    item.addEventListener('click', function (e) {
        var dom = e.target; //获取当前事件的dom
        if (dom.innerText !== '重置') {
            document.querySelectorAll('.level button').forEach(function (item) {
                var dom = item; //获取当前事件的dom
                dom.className = dom.className === 'active' ? '' : '';
            });
            dom.className = 'active';
        }
        createDom(dom.innerText);
    });
});
