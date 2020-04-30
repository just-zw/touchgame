import AbstractEventHander from './AbstractEventHander'

const LEFT_TOP_CORNER = '┌'   // 画布制表符
const RIGHT_TOP_CORNER = '┐'   // 画布制表符
const LEFT_BOTTOM_CORNER = '└'   // 画布制表符
const RIGHT_BOTTOM_CORNER = '┘'   // 画布制表符
const HORIZONTAL = '-'   // 画布制表符
const VERTICAL = '|'   // 画布制表符

export default class TripleGameEventHander extends AbstractEventHander {
    init(core) {
        this.core = core
        window.addEventListener("keydown", (e) => this.trimHandler(e))
    }
    render(core) {
        core = core || this.core
        // 获取渲染数据
        const matrix = core.getMatrix() || []
        const score = core.getScore() || 0
        const maxY = matrix.length
        const maxX = matrix[0].length
        
        // 清屏
        console.clear()

        // 渲染
        let printData = `游戏教程：按方向键移动，空格选中\n\n当前分数：${score}\n`
        for (let j = 0; j < maxY; j++) {
            if (j === 0) {
                // 位于上边线的情况，优先处理
                printData += (LEFT_TOP_CORNER + HORIZONTAL)
                printData += (HORIZONTAL.repeat(maxX * 2));
                printData += (RIGHT_TOP_CORNER)
                printData += '\n';
            }

            for (let i = 0; i < maxX; i++) {
                if (i === 0) {
                    // 位于左边线的情况，优先处理
                    printData += VERTICAL + ' ';
                }

                // 本元素
                // this.buildMainObject(i, j)
                const coreItem = core.getItem(i, j) || {}
                printData += coreItem.type

                // 元素之后空白
                const [ x, y ] = this.currentPoint
                if (x === i && y === j) {
                    // hover状态
                    printData += '←';
                } else if (coreItem.selected) {
                    // 元素被选中状态
                    printData += '<';
                } else {
                    printData += ' ';
                }

                if (i === maxX - 1) {
                    // 位于右边线的情况，最后处理
                    printData += VERTICAL + ' ';
                }
            }
            printData += '\n';

            if (j === maxX - 1) {
                // 位于下边线的情况，最后处理
                printData += (LEFT_BOTTOM_CORNER + HORIZONTAL)
                printData += (HORIZONTAL.repeat(maxX * 2));
                printData += (RIGHT_BOTTOM_CORNER)
                printData += '\n';
            }
        }
        printData = printData.substr(0, printData.length - 1);
        console.log(printData);
    }

    // --- 自定义区
    constructor(screenX, screenY) {
        super()
        // 初始化必要数据
        this.currentPoint = [0, 0]
        this.screenX = screenX
        this.screenY = screenY
    }

    trimHandler(e) {
        const key = e.code
        console.log(e, key)
        if (!key) {
            return
        }
        try {
            this[`on${key}Pressed`]()
        } catch (e) {
            // pass 
            console.log(e)
        }
        this.render()
    }

    onArrowUpPressed() {
        // 执行光标上移
        let [ x, y ] = this.currentPoint
        y -= 1
        if (y >= 0 && y < this.screenY) {
            this.currentPoint = [x, y]
        }
    }
    onArrowDownPressed() {
        // 执行光标下移
        let [ x, y ] = this.currentPoint
        y += 1
        if (y >= 0 && y < this.screenY) {
            this.currentPoint = [x, y]
        }
    }
    onArrowLeftPressed() {
        // 执行光标左移
        let [ x, y ] = this.currentPoint
        x -= 1
        if (x >= 0 && x < this.screenX) {
            this.currentPoint = [x, y]
        }
    }
    onArrowRightPressed() {
        // 执行光标右移
        let [ x, y ] = this.currentPoint
        x += 1
        if (x >= 0 && x < this.screenX) {
            this.currentPoint = [x, y]
        }
    }
    onEnterPressed() {
        // 执行开始
    }
    onEscapePressed() {
        // 执行退出
    }
    onSpacePressed() {
        // 执行选中
        this.core.select(
            this.core.getItem(...this.currentPoint)
        )
    }
}