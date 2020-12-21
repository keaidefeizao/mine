namespace Models {
    export class Mine { 
        public tr:number;
        public td:number;
        public mineNum:number;

        public squares:any[][]=new Array();//存储所有的坐标
        public tds:any[][] = new Array();//存储当前单元格的dom 二维数组
        public surplusMine:number;//存储雷的数量
        public allRight:boolean = false;//标旗的是否有雷
        public parent = document.querySelector('.gameBox');
        constructor(tr:number,td:number,mineNum:number){
            this.tr = tr;
            this.td = td;
            this.mineNum = mineNum;
        }
        public randomNum(){
            var square = new Array(this.tr*this.td);
            for(let y = 0; y<square.length;y++){
                square[y] = y;
            }
            square.sort(function (){return 0.5-Math.random()});//获取随机数
            return square.slice(0,this.mineNum);
        }
        public init():void{
            let rn = this.randomNum();
            let n = 0;
            for(let y = 0;y<this.tr;y++){
                this.squares[y] = new Array;
                for(let x = 0;x<this.td;x++){
                    n++;
                    if (rn.indexOf(n)!=-1){
                        this.squares[y][x] ={type:'mine',x:x,y:y,value:0}
                    }else{
                        this.squares[y][x] ={type:'number',x:x,y:y,value:0}
                    }
                }
            }
            // console.log(this.squares)
            // console.log(rn)
        }
    }
}