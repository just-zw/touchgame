export default class TripleGame {
  constructor(x, y, maxType = 5) {
    this.ready = false
    this.x = x // 横多少个
    this.y = y // 纵多少个
    this.score = 0 // 分数板
    this.maxType = maxType // 方块有几种类型
    this.itemMatrix = []
  }

  getScore() {
    return this.score
  }

  getItem(x, y) {
    return this.itemMatrix[y][x]
  }

  // --------- 工作逻辑 ----------

  // 是否相邻
  static isNeighbor(item1, item2) {
    if (item1.x === item2.x) {
      return Math.abs(item1.y - item2.y) <= 1
    }
    if (item1.y === item2.y) {
      return Math.abs(item1.x - item2.x) <= 1
    }
    return false
  }

  // 生成一个方块
  createItem(x, y) {
    return {
      x,
      y,
      selected: false,
      type: Math.floor(Math.random() * this.maxType)
    }
  }

  // 初始化游戏
  init() {
    const matrix = []
    for (let y = 0; y < this.y; y++) {
      const row = []
      for (let x = 0; x < this.x; x++) {
        //row存放的是每一个小块的具体信息
        row.push(
          this.createItem(x, y)
        )
      }
      //存的是每一行的具体信息
      matrix.push(row)
    }
    this.itemMatrix = matrix

    console.log(this.check())
    
    this.ready = true
    return this
  }

  // 检测消除方块
  check() {
    const checkAlgo = row => {
      let currentType = null
      let sameList = []
      //cell就是每一个小方块
      let result = row.some((cell, index) => {
        if (index === 0) {
          currentType = cell.type
          sameList.push(cell)
          return
        }

        // 相等，加到队列里
        if (cell.type === currentType) {
          sameList.push(cell)

          // 加进去后马上校验是否超阈值
          if (sameList.length >= 3) {
            console.log(sameList)
            return true
          }
        } else {
          // 如果类型变了，清空队列数据
          currentType = cell.type
          sameList = [cell]
        }
        return false
      })
      if (result) {
        return { status: true, result: sameList }
      }
      return { status: false }
    }

    // 检查行
    for (let y = 0; y < this.y; y++) {
      let row = this.itemMatrix[y]
      const ret = checkAlgo(row)
      if (ret.status) {
        return ret
      }
    }

    // 检查列
    for (let x = 0; x < this.x; x++) {
      let row = this.itemMatrix.map(row => row[x])
      const ret = checkAlgo(row)
      if (ret.status) {
        return ret
      }
    }

    return { status: false }
  }
  swapimg(item1, item2,that){
    that.$set(this.itemMatrix[item1.y],[item1.x],item2)
    that.$set(this.itemMatrix[item2.y],[item2.x],item1)
    let midx=item1.x;
    let midy=item1.y;
    item1.x=item2.x;
    item1.y=item2.y;
    item2.x=midx;
    item2.y=midy  
  }
  // 交换方块
  swapItem(item1, item2,that) {
    // TODO
    /* console.log(this.itemMatrix); */
 
 
 /*    itemMatrix[item1.y][item1.x]=item2
    this.itemMatrix[item2.y][item2.x]=item1 */
   this.swapimg(item1, item2,that)
   if(this.check().status){
     this.swap()
   }else{
    this.swapimg(item2,item1,that)
   }
    
  }

  swap(x1, y1, x2, y2) {
    // TODO
    // 0 校验方块是否相邻
    // 1、清除选中状态
    // 2、交换方块
    // 3、校验是否可消除
    // 4.1、可消除 -> 执行消除、算分
    // 4.2、执行补位
    // 4.3、循环到3

    // 4.10、不可消除 -> 换回方块
    // end
   let {status,result}=this.check()
 /*   console.log(status);
   console.log(result); */
   
   
  if(status){
  this.score=result.length;
  result.forEach(item=>{ 
  delete this.itemMatrix[item.y][item.x]
  this.itemMatrix[item.y][item.x]=this.createItem(item.x, item.y)

});



  }



  }

  
    
}