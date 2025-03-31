const canvas = document.getElementById('go-board');
const ctx = canvas.getContext('2d');
const gridContainer = document.querySelector('.grid-container');

// 棋盘状态 (1为黑，-1为白)
let boardState = Array(19).fill().map(() => Array(19).fill(0));
const moveHistory = Array(19).fill().map(() => Array(19).fill(null)); // 记录落子顺序
let moveCount = 0; // 记录当前总步数
let lastTwoMoves = []; // 记录最后两步的坐标

let currentPlayer = 1; // 1表示黑方(刘启)，-1表示白方(刘贤)
let gameOver = false;

// 创建19x19网格并添加点击事件
function createGrid() {
    const cellSize = (canvas.width - 39) / 19;
    
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            const cell = document.createElement('div');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.addEventListener('click', handleCellClick);
            gridContainer.appendChild(cell);
        }
    }
}

// 检查五子连珠
function checkWin(row, col) {
    const directions = [
        [0, 1],  // 水平
        [1, 0],  // 垂直
        [1, 1],  // 对角线
        [1, -1]  // 反对角线
    ];

    for (const [dx, dy] of directions) {
        let count = 1;
        
        // 正向检查
        for (let i = 1; i < 5; i++) {
            const r = row + i * dx;
            const c = col + i * dy;
            if (r < 0 || r >= 19 || c < 0 || c >= 19 || boardState[r][c] !== currentPlayer) break;
            count++;
        }
        
        // 反向检查
        for (let i = 1; i < 5; i++) {
            const r = row - i * dx;
            const c = col - i * dy;
            if (r < 0 || r >= 19 || c < 0 || c >= 19 || boardState[r][c] !== currentPlayer) break;
            count++;
        }
        
        if (count >= 5) return true;
    }
    
    return false;
}

// 处理格子点击
function handleCellClick(e) {
    if (gameOver) return;
    
    const cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    
    // 如果该位置已有棋子则返回
    if (boardState[row][col]) return;
    
    // 更新棋盘状态
    boardState[row][col] = currentPlayer;
    
    // 记录步数
    moveCount++;
    moveHistory[row][col] = moveCount; // 在该位置记录当前步数
    lastTwoMoves.push({row, col});
    if (lastTwoMoves.length > 2) {
        lastTwoMoves.shift();
    }
    
    // 创建棋子元素
    const stone = document.createElement('div');
    stone.className = currentPlayer === 1 ? 'black-stone' : 'white-stone';
    
    // 计算棋子位置
    const cellSize = (canvas.width - 39) / 19;
    const padding = 19.5;
    const left = padding + col * cellSize;
    const top = padding + row * cellSize;
    
    // 设置棋子位置
    stone.style.left = `${left}px`;
    stone.style.top = `${top}px`;
    
    // 添加到点击层
    document.querySelector('.click-layer').appendChild(stone);
    
    // 检查胜负
    if (checkWin(row, col)) {
        gameOver = true;
        const winner = currentPlayer === 1 ? '刘启' : '刘贤';
        const statusEl = document.querySelector('.game-status');
        statusEl.textContent = `${winner}获胜!`;
        
        return;
    }
    
    // 切换玩家
    currentPlayer = currentPlayer === 1 ? -1 : 1;
    
    // 更新当前玩家显示和照片高亮
    document.getElementById('player').textContent = `当前棋手: ${currentPlayer === 1 ? '刘启' : '刘贤'}`;
    document.getElementById('liu-qi-photo').classList.toggle('active', currentPlayer === 1);
    document.getElementById('liu-xian-photo').classList.toggle('active', currentPlayer === -1);
}

// 绘制棋盘
function drawBoard() {
    ctx.fillStyle = '#c2a657';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    
    const cellSize = canvas.width / 20;
    const padding = cellSize;
    
    // 横线
    for (let i = 0; i < 19; i++) {
        ctx.beginPath();
        ctx.moveTo(padding, padding + i * cellSize);
        ctx.lineTo(canvas.width - padding, padding + i * cellSize);
        ctx.stroke();
    }
    
    // 竖线
    for (let i = 0; i < 19; i++) {
        ctx.beginPath();
        ctx.moveTo(padding + i * cellSize, padding);
        ctx.lineTo(padding + i * cellSize, canvas.height - padding);
        ctx.stroke();
    }
    
    // 绘制星位
    ctx.fillStyle = '#000';
    const starPoints = [3, 9, 15];
    for (let x of starPoints) {
        for (let y of starPoints) {
            ctx.beginPath();
            ctx.arc(
                padding + x * cellSize,
                padding + y * cellSize,
                5, 0, Math.PI * 2
            );
            ctx.fill();
        }
    }
}

// 重置游戏
function resetGame() {
    // 移除所有棋子
    document.querySelectorAll('.black-stone, .white-stone').forEach(stone => stone.remove());
    
    // 重置游戏状态
    boardState = Array(19).fill().map(() => Array(19).fill(0));
    currentPlayer = 1;
    gameOver = false;
    
    // 更新玩家显示和照片高亮
    document.getElementById('player').textContent = `当前棋手: 刘启`;
    document.getElementById('liu-qi-photo').classList.add('active');
    document.getElementById('liu-xian-photo').classList.remove('active');
}



// 初始化
// 悔棋功能
function undoMove() {
    if (lastTwoMoves.length < 2) {
        alert('步数不足，无法悔棋');
        return;
    }

    // 移除最后两步棋子
    lastTwoMoves.forEach(move => {
        boardState[move.row][move.col] = 0;
        moveHistory[move.row][move.col] = null;
        
        // 从DOM移除棋子
        const stones = document.querySelectorAll('.black-stone, .white-stone');
        const stoneToRemove = Array.from(stones).find(stone => {
            const left = parseInt(stone.style.left);
            const top = parseInt(stone.style.top);
            const cellSize = (canvas.width - 39) / 19;
            const padding = 19.5;
            const col = Math.round((left - padding) / cellSize);
            const row = Math.round((top - padding) / cellSize);
            return row === move.row && col === move.col;
        });
        
        if (stoneToRemove) {
            stoneToRemove.remove();
        }
    });

    // 更新状态
    moveCount -= 2;
    lastTwoMoves = [];
    currentPlayer = currentPlayer === 1 ? -1 : 1; // 切换回上一步的玩家
    document.getElementById('player').textContent = `当前棋手: ${currentPlayer === 1 ? '刘启' : '刘贤'}`;
}

function init() {
    drawBoard();
    createGrid();
    
    // 添加重新开始按钮事件
    document.getElementById('restart').addEventListener('click', resetGame);
    
    // 添加悔棋按钮事件
    document.getElementById('undo').addEventListener('click', undoMove);
}

init();
