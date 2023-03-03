'use-strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const parent = document.querySelector('.grid-container');
const slider = document.getElementById('rangeSlider');
const sliderOutput = document.querySelector('.output');
const modalBtn = document.querySelector('.popup');
const gridBtn = document.querySelector('#toggle-gridlines');
const modalExitBtn = document.querySelector('.modal-close');
const colorBlack = document.querySelector('#select-black');
const colorRGB = document.querySelector('#select-rgb');
const eraserBtn = document.querySelector('#eraser');

const parentWidth = 620;
const parentHeight = 620;

let gridBackground;
let gridEnabled = false;
let isRGB = false;

parent.style.width = `${parentWidth}px`;
parent.style.height = `${parentHeight}px`;

slider.value = 8;
slider.step = 8;
sliderOutput.textContent = slider.value;

function reset() {
    parent.innerHTML = '';
    createGrid();
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

function filterRGB(rgb) {
    if (!rgb) return;

    const rgbArr = rgb.split(',');
    return rgbArr.map((x) => parseInt(x.replace(/[a-z()]/ig, ''))); // This was a new change, I don't know if it works
}


function reset() {
    parent.innerHTML = '';
    createGrid();
}

function createGrid() {
    const cells = [];
    const cellCount = slider.value ** 2;

    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.style.backgroundColor = 'rgb(255, 255, 255)';
        if (!gridEnabled) cell.classList.add('cell-border');
        else cell.classList.remove('cell-border');
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

function main(arg) {

    switch (arg) {
        case "rgb(0, 0, 0)": // #000
            for (const node of parent.childNodes) {
                node.addEventListener('mouseover', (e) => {
                    e.target.style.backgroundColor = 'rgb(0, 0, 0)';
                });
            }
            break;
        case "rgb": // RGB
        for (const node of parent.childNodes) {
            
            node.addEventListener('mouseover', (e) => {
                const R = Math.floor(Math.random() * 255);
                const G = Math.floor(Math.random() * 255);
                const B = Math.floor(Math.random() * 255);
                e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
                
            });
        }
            break;
        case "rgb(255, 255, 255)": // Erase
            for (const node of parent.childNodes) {
                node.addEventListener('mouseover', (e) => {
                    e.target.style.backgroundColor = '#fff';
                });
            }
            break;
        default:
            return;
    }
}

function mainReset() {
    let param;
    createGrid();
    slider.addEventListener("input", () => {
        sliderOutput.textContent = slider.value;
        reset();
    });

    eraserBtn.addEventListener('click', () => {
        param = "rgb(255, 255, 255)";
        main(param);
    });
    colorBlack.addEventListener('click', () => {
        param = "rgb(0, 0, 0)";
        main(param);
    });
    colorRGB.addEventListener('click', () => {
        param = "rgb";
        main(param);
    });
}

mainReset();
