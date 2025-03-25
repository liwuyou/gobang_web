const canvas = document.getElementById('go-board');
const ctx = canvas.getContext('2d');
const gridContainer = document.querySelector('.grid-container');

// 创建19x19网格
function createGrid() {
    const cellSize = (canvas.width - 39) / 19; // 每个格子实际大小(减去边距)
    
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            const cell = document.createElement('div');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            gridContainer.appendChild(cell);
        }
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
