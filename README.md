# 在线五子棋游戏

一个基于HTML5 Canvas和JavaScript实现的在线五子棋游戏，支持双人对战。

## 文件结构

```
.
├── index.html        # 主页面，包含游戏界面布局
├── board.js          # 游戏核心逻辑实现
├── style.css         # 样式表
├── reset.css         # 重置样式表
└── images/           # 图片资源
    ├── left.png      # 玩家1(刘启)头像
    ├── right.png     # 玩家2(刘贤)头像
    ├── background.png # 背景图片
    └── ...           # 其他图片资源
```

## 核心功能

1. **游戏棋盘**：19x19标准五子棋棋盘
2. **玩家系统**：刘启(黑棋) vs 刘贤(白棋)轮流落子
3. **胜负判断**：五子连珠(横、竖、对角线)即获胜
4. **游戏控制**：
   - 悔棋功能(undo)
   - 重新开始(restart)
   - 认输功能(surrender)
   - 棋王技(over)

## 关键代码说明

### 棋盘初始化 (`board.js`)
```javascript
function drawBoard() {
    // 绘制19x19棋盘网格
    // 绘制星位点
}

function createGrid() {
    // 创建19x19的点击区域
    // 为每个格子添加点击事件
}
```

### 游戏逻辑 (`board.js`)
```javascript
// 棋盘状态 (1为黑，-1为白)
let boardState = Array(19).fill().map(() => Array(19).fill(0));

// 检查五子连珠
function checkWin(row, col) {
    // 检查四个方向(水平、垂直、对角线)是否有5连
}

// 处理落子
function handleCellClick(e) {
    // 更新棋盘状态
    // 绘制棋子
    // 检查胜负
    // 切换玩家
}
```

### 游戏控制 (`board.js`)
```javascript
// 悔棋功能
function undoMove() {
    // 移除最后两步棋子
    // 恢复棋盘状态
}

// 重置游戏
function resetGame() {
    // 清空棋盘
    // 重置游戏状态
}
```

## 运行方式

1. 直接打开`index.html`文件即可开始游戏
2. 点击棋盘格子落子
3. 使用控制按钮进行游戏操作
