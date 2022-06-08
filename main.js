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

let gridEnabled = false;
let isRGB = false;

parent.style.width = `${parentWidth}px`;
parent.style.height = `${parentHeight}px`;

slider.value = 8;
slider.step = 8;
sliderOutput.textContent = slider.value;

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

function filter(rgb) {
    const filtered = rgb.split(',');
    const intArr = [];
    
    for (let i = 0; i < filtered.length; i++) {
        filtered[i].replace(/[a-z()]/ig, '');
        intArr.push(parseInt(filtered[i]));
    }
    return intArr;
}

function reset() {
    parent.innerHTML = '';
    createGrid();
}

// =========================================================================

function getRGB() {
    for (;;) {
        const R = Math.floor(Math.random() * 255);
        const G = Math.floor(Math.random() * 255);
        const B = Math.floor(Math.random() * 255);
        return [R, G, B];
    }
}

function draw(arg) {
    
    switch (arg) {
        case "rgb(0, 0, 0)":
            for (const node of parent.childNodes) {
                node.addEventListener('mouseover', (e) => {
                    currentColor = arg;
                    e.target.style.backgroundColor = currentColor;
                });
            }
            break;
        case "rgb(255, 255, 255)":
            for (const node of parent.childNodes) {
                node.addEventListener('mouseover', (e) => {
                    currentColor = arg;
                    e.target.style.backgroundColor = currentColor;
                });
            }
            break;
        case "rgb": // Random RGB
            colorRGB.addEventListener('click', () => rgbEnabled = true);
            for (const node of parent.childNodes) {
                node.addEventListener('mouseover', (e) => {
                    const [
                        R,
                        G,
                        B
                    ] = [...getRGB()];
                    currentColor = `rgb(${R}, ${G}, ${B})`;
                    e.target.style.backgroundColor = currentColor;
                });
            }
            break;
        case "shd":
            let dStep = 0;
            
            for (const node of parent.childNodes) {
                node.addEventListener('mouseover', (e) => {
                    const [
                        R,
                        G,
                        B
                    ] = [...filter(e.target.style.backgroundColor)];
                    let current = dStep;
                    dStep += 0.1;
                    node.style.backgroundColor = `rgba(${R}, ${G}, ${B}, ${dStep - current})`;
                });
            }
            break;
        default:
            return;
    }
}

function createGrid() {
    const cells = [];
    const cellCount = slider.value ** 2;

    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.style.backgroundColor = 'rgb(255, 255, 255)';
        if (!gridEnabled) { cell.classList.add('cell-border'); }
        else { cell.classList.remove('cell-border'); }
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
    let param;
    createGrid();
    slider.addEventListener("input", () => {
        sliderOutput.textContent = slider.value;
        reset();
    });

    colorRGB.addEventListener('click', () => param = "rgb");
    eraserBtn.addEventListener('click', () => param = "rgb(255, 255, 255)");
    colorBlack.addEventListener('click', () => param = "rgb(0, 0, 0)");
    shadeBtn.addEventListener('click', () => param = "shd");
    
    draw(param);
}

mainReset();

// Do not delete yet
/* const rt = R + (0.25 * (255 - R)); const gt = G + (0.25 * (255 - G)); const bt = B + (0.25 * (255 - B)); */
