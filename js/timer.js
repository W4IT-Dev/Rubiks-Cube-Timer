let startTimerTimeout;

document.addEventListener('keydown', e => {
    if (spacedown || timing) return
    timerContainer.style.color = "red"
    startTimerTimeout = setTimeout(() => {
        timerContainer.style.color = "green", canStart = true;
    }, 550)
    spacedown = true;
})

document.addEventListener('keyup', () => {
    if (spacedown) {
        if (canStart) return start();
        clearTimeout(startTimerTimeout);
        canStart = spacedown = timing = false;
        timerContainer.style.color = "unset"

    }
})
let millsec = 0;

function start() {
    spacedown = canStart = false;
    timing = true;
    timerContainer.style.color = "unset";
    //variables
    const ms = document.querySelector('#milliseconds');
    const s = document.querySelector('#seconds');
    const min = document.querySelector('#minutes');
    const h = document.querySelector('#hours');
    const seperation = document.querySelectorAll('.seperation');
    ms.innerText = s.innerText = min.innerText = h.innerText = 0;//reset timer;
    h.style.display = "none", min.style.display = "none", seperation[0].style.display = "none", seperation[1].style.display = "none";//hide every number/seperator that isnt needed
    timer = setInterval(() => {//timer
        millsec++;
        ms.innerText++;
        if (ms.innerText == 9) s.innerText++, ms.innerText = 0, millsec++, console.log('ms');
        if (s.innerText == 59) min.innerText++, min.style.display = "block", seperation[1].style.display = "block", s.innerText = 0, console.log('s');
        if (min.innerText == 59) h.innerText++, h.style.display = "block", seperation[0].style.display = "block", min.innerText = 0, console.log('min');
    }, 100)
    let wakelock;
    if (navigator.requestWakeLock) wakelock = navigator.requestWakeLock('screen');
    if (!timing) return
    document.addEventListener('keydown', stop);

    function stop() {//stop timer
        if (!timing) return
        clearInterval(timer);
        timing = false;
        addTime(millsec, '', scramble.innerHTML, '', true)
        getScramble();
        millsec = 0;

        if (wakelock) wakelock.unlock();
    }
}

