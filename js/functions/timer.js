function start() {
    if (ready) return timer.style.color = '', startTimer();

    if (!spacedown) return timer.style.color = '';

    if (spacedown) timer.style.color = 'red';

    waitToStart = setTimeout(() => {
        ready = true;
        timer.style.color = 'green';
        Ao5.ao5.style.display = 'none', Ao12.ao12.style.display = 'none';
        scrambleOnDom.style.display = 'none', setSoftkey({ left: '', middle: '', right: '', });
        minutes.innerHTML = '', document.querySelector('.point').innerHTML = '', tensecond.innerHTML = '';
        firstsecond.innerHTML = 0, first.innerHTML = 0;
    }, 550)
}

function startTimer() {
    timing = true;
    timeIn100MS = 0;
    time = setInterval(() => {
        timeIn100MS++;
        first.innerHTML++;
        if (first.innerHTML == 10) firstsecond.innerHTML++, first.innerHTML = 0;

        if (firstsecond.innerHTML == 10) firstsecond.innerHTML = 0, tensecond.innerHTML++

        if (tensecond.innerHTML == 6) document.querySelector('.point').innerHTML = ':', minutes.innerHTML++, tensecond.innerHTML = 0, firstsecond.innerHTML = 0;
    }, 100)
}

function stop() {
    clearInterval(time);
    timing = false;
    sessions[activeSession.index].times.unshift({
        time: timer.innerText.replace(/\s/g, ''),
        timeInMS: timeIn100MS,
        scramble: document.querySelector('#scramble').innerText,
        status: '-',
        comment: ''
    });
    if (sessions[activeSession.index].times.length - 5 > 0) {
        calcAo5(5);
    }
    if (sessions[activeSession.index].times.length >= 12) {
        calcAo12(12);
    }
    getScramble();
    Ao5.ao5.style.display = 'block';
    Ao12.ao12.style.display = 'block';
    document.querySelector('.scramble').style.display = 'block';
    // document.querySelector('.ad').style.display = 'none';
    // document.querySelectorAll('.ad')[1].style.display = 'none';

    bacjankdakhkdakdiuadkkj = setTimeout(() => {
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
        }, 1500)

    }, 150);
    localStorage.sessions = JSON.stringify(sessions);
}