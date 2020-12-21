var Models;
(function (Models) {
    var Mine = /** @class */ (function () {
        function Mine(tr, td, mineNum) {
            this.squares = new Array(); //存储所有的坐标
            this.tds = new Array(); //存储当前单元格的dom 二维数组
            this.allRight = false; //标旗的是否有雷
            this.parent = document.querySelector('.gameBox');
            this.tr = tr;
            this.td = td;
            this.mineNum = mineNum;
        }
        Mine.prototype.randomNum = function () {
            var square = new Array(this.tr * this.td);
            for (var y = 0; y < square.length; y++) {
                square[y] = y;
            }
            square.sort(function () { return 0.5 - Math.random(); }); //获取随机数
            return square.slice(0, this.mineNum);
        };
        Mine.prototype.init = function () {
            var rn = this.randomNum();
            var n = 0;
            for (var y = 0; y < this.tr; y++) {
                this.squares[y] = new Array;
                for (var x = 0; x < this.td; x++) {
                    n++;
                    if (rn.indexOf(n) != -1) {
                        this.squares[y][x] = { type: 'mine', x: x, y: y, value: 0 };
                    }
                    else {
                        this.squares[y][x] = { type: 'number', x: x, y: y, value: 0 };
                    }
                }
            }
            // console.log(this.squares)
            // console.log(rn)
        };
        return Mine;
    }());
    Models.Mine = Mine;
})(Models || (Models = {}));
