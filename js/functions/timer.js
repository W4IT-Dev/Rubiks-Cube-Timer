function start() {
    if (ready) return timer.style.color = '', startTimer();

    if (!spacedown) return timer.style.color = '';

    if (spacedown) timer.style.color = 'red';

    waitToStart = setTimeout(() => {
        ready = true;
        timer.style.color = 'green';
        scrambleOnDom.style.display = 'none', setSoftkey({ left: '', middle: '', right: '', });
        min.innerHTML = document.querySelector('.seperation').innerHTML = '';
        s.innerHTML = 0, ms.innerHTML = 0;
    }, 550)
}
let wakelock;
function startTimer() {
    if (navigator.requestWakeLock) wakelock = navigator.requestWakeLock('screen');
    timerBox.classList.add('timing')
    timing = true;
    timeIn100MS = 0;
    time = setInterval(() => {
        timeIn100MS++;
        ms.innerText++;
        if (ms.innerText == 9) s.innerText++, ms.innerText = 0;
        if (s.innerText == 59) min.innerText++, min.style.display = "block", seperation[1].style.display = "block", s.innerText = 0, console.log('s');
        if (min.innerText == 59) h.innerText++, h.style.display = "block", seperation[0].style.display = "block", min.innerText = 0, console.log('min');
    }, 100)
}

function stop() {
    timerBox.classList.remove('timing')

    if (wakelock) wakelock.unlock();
    solves++;
    if (solves == 1) setTimeout(() => { document.querySelector('#showAd1').click() }, 500)
    clearInterval(time);
    timing = false;
    sessions[activeSession.index].times.unshift({
        time: timer.innerText.replace(/\s/g, ''),
        timeInMS: timeIn100MS,
        scramble: document.querySelector('#scramble').innerText,
        status: 'OK',
        comment: ''
    });
    if (sessions[activeSession.index].times.length > 1) {
        difference = sessions[activeSession.index].times[0].timeInMS - sessions[activeSession.index].times[1].timeInMS
        if (difference < 0) {
            difference *= -1;
            timerBox.title = '(-' + convertTime(difference) + ')'
            timerBox.style.setProperty('--color', 'green');
        } else if (difference > 0) {
            timerBox.title = '(+' + convertTime(difference) + ')'
            timerBox.style.setProperty('--color', 'red');
        } else {
            timerBox.title = '(0.0)'
            timerBox.style.setProperty('--color', 'unset');
        }
    }
    if (sessions[activeSession.index].times.length - 5 > 0) {
        calcAvg(5, true, 0);
    }
    if (sessions[activeSession.index].times.length >= 12) {
        calcAvg(12, true, 0);
    }
    getScramble();
    document.querySelector('.scramble').style.display = 'block';

    tmeout = setTimeout(() => {
        canChange = true;
        setSoftkey({
            left: 'DNF',
            middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">check</i>',
            right: '+2'
        });
        setTimeout(() => {
            canChange = false;
            if (!settingsOpened && session.style.display == 'none') {
                setSoftkey({
                    left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                    middle: 'Session',
                    right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
                });
            }
        }, 2000)

    }, 0);
    localStorage.sessions = JSON.stringify(sessions);
}