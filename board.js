const canvas = document.getElementById('go-board');
const ctx = canvas.getContext('2d');
const gridContainer = document.querySelector('.grid-container');

// 创建19x19网格并添加点击事件
function createGrid() {
    const cellSize = (canvas.width - 39) / 19; // 每个格子实际大小(减去边距)
    
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

// 处理格子点击
let currentPlayer = 'black'; // 当前玩家，black或white

function handleCellClick(e) {
    const cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    
    // 如果该位置已有棋子则返回
    if (cell.dataset.hasStone) return;
    
    // 创建棋子元素
    const stone = document.createElement('div');
    stone.className = currentPlayer === 'black' ? 'black-stone' : 'white-stone';
    
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
    
    // 标记该位置已有棋子
    cell.dataset.hasStone = 'true';
    
    // 切换玩家
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    
    // 更新当前玩家显示
    const playerDisplay = document.querySelector('.player-display');
    if (playerDisplay) {
        playerDisplay.textContent = `当前: ${currentPlayer === 'black' ? '黑方' : '白方'}`;
    }
}

// 绘制棋盘
function drawBoard() {
    // 绘制棋盘背景
    ctx.fillStyle = '#c2a657';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制19x19网格线
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
    const starPoints = [3, 9, 15]; // 星位坐标
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

// 初始化
function init() {
    createGrid();
    drawBoard();
}

init();
