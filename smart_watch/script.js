let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;
let savedLaps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

document.addEventListener('DOMContentLoaded', loadSavedLaps);

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        startStopBtn.innerHTML = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = 'Resume';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerHTML = 'Start';
    display.innerHTML = '00:00:00.00';
    laps.innerHTML = '';
    difference = 0;
    lapCount = 0;
    savedLaps = [];
    localStorage.removeItem('savedLaps');
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount}: ${display.innerHTML}`;
        laps.appendChild(lapTime);
        savedLaps.push(lapTime.textContent);
        saveLaps();
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function saveLaps() {
    localStorage.setItem('savedLaps', JSON.stringify(savedLaps));
}

function loadSavedLaps() {
    const storedLaps = JSON.parse(localStorage.getItem('savedLaps'));
    if (storedLaps) {
        savedLaps = storedLaps;
        savedLaps.forEach(lap => {
            const lapTime = document.createElement('li');
            lapTime.textContent = lap;
            laps.appendChild(lapTime);
        });
    }
}
