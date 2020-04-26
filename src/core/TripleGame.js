export default class TripleGame {
  constructor(x, y, maxType = 5) {
    this.ready = false
    this.x = x // 横多少个
    this.y = y // 纵多少个
    this.score = 0 // 分数板
    this.maxType = maxType // 方块有几种类型
    this.itemMatrix = []
    this.currentSelected = null
  }

  getScore() {
    return this.score
  }

  getItem(x, y) {
    console.log(`x: ${x}, y: ${y}, selected: ${this.itemMatrix[y][x].selected}`)
    return this.itemMatrix[y][x]
  }

  render() {
    this.renderCb(this)
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

  static isItemEqual(item1, item2) {
    if (item1 === item2) {
      return true
    }
    if (!item1 || !item2) {
      return false
    }
    const { x: x1, y: y1, type: type1 } = item1
    const { x: x2, y: y2, type: type2 } = item2
    if (x1 === x2 && y1 === y2 && type1 === type2) {
      return true
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
  init(cb) {
    this.renderCb = cb || (() => null)
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

    // 开局确保无重复
    let status, result
    while ({ status, result } = this.check(), status) {
      this.clearUp(result)
    }

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

  // --------- 交换部分 ----------
  // 根据坐标做交换
  swap(x1, y1, x2, y2) {
    this.swapItem(this.getItem(x1, y1), this.getItem(x2, y2))
  }
  // 根据两个item做交换
  swapItem(item1, item2) {
    // this.swap(item1.x, item1.y, item2.x, item2.y)
    console.log('swap!', JSON.stringify(item1), JSON.stringify(item2))
    const copyedItem1 = { ...item1, x: item2.x, y: item2.y }
    const copyedItem2 = { ...item2, x: item1.x, y: item1.y }

    this.itemMatrix[copyedItem2.y].splice(copyedItem2.x, 1, copyedItem2)
    this.itemMatrix[copyedItem1.y].splice(copyedItem1.x, 1, copyedItem1)
  }

  // --------- 清除部分 ----------
  // 只负责清除和补充方块，给什么就清除什么
  clearUp(items = []) {
    items.forEach(item => {
      // delete this.itemMatrix[item.y][item.x]
      // this.itemMatrix[item.y][item.x] = this.createItem(item.x, item.y)
      this.itemMatrix[item.y].splice(item.x, 1, this.createItem(item.x, item.y))
      // this.swap()
    });
  }

  // --------- 对外提供主逻辑，选择方块 ----------
  select(item) {
    // 无已选，则算作已选
    if (!this.currentSelected) {
      this.currentSelected = item
      item.selected = true

      this.render()
      return
    }
    // 重复已选，算作toggle
    if (TripleGame.isItemEqual(item, this.currentSelected)) {
      item.selected = !item.selected
      this.currentSelected = null

      this.render()
      return
    }
    // 非重复选，相当于选了两个
    // 是邻居，执行交换
    if (TripleGame.isNeighbor(this.currentSelected, item)) {
      const { x: x1, y: y1 } = this.currentSelected
      const { x: x2, y: y2 } = item

      this.currentSelected.selected = false
      this.currentSelected = null

      this.swap(x1, y1, x2, y2)

      let { status, result } = this.check()
      if (status) {
        let combo = 0
        do {
          // 算分
          combo += 1
          this.score += result.length * combo

          // 执行消除和补充
          this.clearUp(result)

          // 连击检查
          let res = this.check()
          status = res.status
          result = res.result
        } while (status)
      } else {
        this.swap(x1, y1, x2, y2)
      }
    } else {
      // 非邻居，弃置
      this.currentSelected.selected = false
      this.currentSelected = null
      item.selected = false
    }
    this.render()
  }
}