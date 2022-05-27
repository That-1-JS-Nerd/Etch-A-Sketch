'use-strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const parent = document.querySelector('.grid-container');
const slider = document.getElementById('rangeSlider');
const sliderOutput = document.querySelector('.output');

const modalBtn = document.querySelector('.popup');
const background = document.querySelector('#grid-btn');
const gridBtn = document.querySelector('#toggle-gridlines');
const modalExitBtn = document.querySelector('.modal-close');
const colorBlack = document.querySelector('#select-black');
const colorRGB = document.querySelector('#select-rgb');
const eraserBtn = document.querySelector('#eraser');
const shadeBtn = document.querySelector('#shade')

const parentWidth = 620;
const parentHeight = 620;
const coloredCells = [];

let gridEnabled = false;
let gridBackground;
let isRGB = false;

parent.style.width = `${parentWidth}px`;
parent.style.height = `${parentHeight}px`;

slider.value = 8;
slider.step = 8;
sliderOutput.textContent = slider.value;

function resetGrid() {
    parent.innerHTML = '';
}

function reset() {
    resetGrid();
    createGrid();
}

function setGridColor() {
    if (!parent.childNodes.length) return;

    for (const node of parent.childNodes) {
        gridBackground = 'rgb(122, 242, 122)';
        node.style.backgroundColor = gridBackground;
    }
}

// =========================================================================

function getShader() {
    const [R, G, B] = [...getRGB()];
    const intArr = [];
    const intRegex = /^[a-z]/;
    const rgb = `rgb(${R}, ${G}, ${B})`;

    // for (const childNode of parent.childNodes) {
    //     if (childNode) {
            
    //     }
    // }

    /*
    const rt = R + (0.25 * (255 - R));
    const gt = G + (0.25 * (255 - G));
    const bt = B + (0.25 * (255 - B));
    */

    for (const node of parent.childNodes) {
        node.addEventListener('mouseover', (e) => {
            e.target.removeEventListener('mouseover', randomRGB);
            console.log(e.target.style.backgroundColor);
        });
    }
}

// =========================================================================

function erase() {
    for (const node of parent.childNodes) {
        node.addEventListener('mouseover', (e) => {
            currentColor = '#fff';
            e.target.style.backgroundColor = currentColor;
        });
    }
}

function getRGB() {
    for (;;) {
        const R = Math.floor(Math.random() * 255);
        const G = Math.floor(Math.random() * 255);
        const B = Math.floor(Math.random() * 255);
        return [R, G, B];
    }
}

function randomRGB() {
    colorRGB.addEventListener('click', () => rgbEnabled = true);

    for (const node of parent.childNodes) {
        node.addEventListener('mouseover', (e) => {
            const [R, G, B] = [...getRGB()];
            currentColor = `rgb(${R}, ${G}, ${B})`;
            e.target.style.backgroundColor = currentColor;
        });
    }
}

function draw() {
    for (const node of parent.childNodes) {
        node.addEventListener('mouseover', (e) => {
            currentColor = '#000';
            e.target.style.backgroundColor = currentColor;
        });
    }
}

function createGrid() {
    const cells = [];
    const cellCount = slider.value ** 2;

    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div');
        if (!gridEnabled) { cell.classList.add('cell-border'); }
        else { cell.classList.remove('cell-border'); }
        cell.style.backgroundColor = gridBackground ? gridBackground : '#fff';
        cells.push(cell);
    }

    cells.forEach(
        (cell) => {
            cell.style.width = `${parentWidth / Math.sqrt(cells.length)}px`;
            cell.style.height = `${parentWidth / Math.sqrt(cells.length)}px`;
            parent.appendChild(cell);
        }
    );
}

function mainReset() {
    createGrid();
    slider.addEventListener("input", () => {
        sliderOutput.textContent = slider.value;
        reset();
    });

    colorRGB.addEventListener('click', () => randomRGB());
    eraserBtn.addEventListener('click', () => erase());
    colorBlack.addEventListener('click', () => draw());
    shadeBtn.addEventListener('click', () => getShader());
    background.addEventListener('click', () => setGridColor());
}

modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
});

modalExitBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});

gridBtn.addEventListener('click', () => {
    gridEnabled = !gridEnabled;
    reset();
});

mainReset();