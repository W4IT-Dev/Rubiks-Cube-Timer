function start() {
    if (ready) return timer.style.color = '', startTimer();

    if (!spacedown) return timer.style.color = '';

    if (spacedown) timer.style.color = 'red';

    waitToStart = setTimeout(() => {
        ready = true;
        timer.style.color = 'green';
        scrambleOnDom.style.display = 'none', setSoftkey({ left: '', middle: '', right: '', });
        minutes.innerHTML = '', document.querySelector('.point').innerHTML = '', tensecond.innerHTML = '';
        firstsecond.innerHTML = 0, first.innerHTML = 0;
    }, 550)
}

function startTimer() {//timer
    // document.querySelector('.ad').style.display = 'block';
    // document.querySelectorAll('.ad')[1].style.display = 'block';
    timing = true;
    timeIn100MS = 0;
    time = setInterval(() => {
        timeIn100MS++;
        first.innerHTML++;
        if (first.innerHTML == 10) return firstsecond.innerHTML++, first.innerHTML = 0;

        if (firstsecond.innerHTML == 10) return tensecond.innerHTML++, firstsecond.innerHTML = 0;

        if (tensecond.innerHTML == 6) return document.querySelector('.point').innerHTML = ':', minutes.innerHTML++, tensecond.innerHTML = 0, firstsecond.innerHTML = 0;
    }, 100)
}

function stop() {//stop timer
    clearInterval(time);
    timing = false;
    allTimes.unshift({
        time: timer.innerText.replace(/\s/g, ''),
        timeInMS: timeIn100MS,
        scramble: document.querySelector('#scramble').innerText,
        status: '-',
        comment: ''
    });
    if (allTimes.length >= 5) {
        calcAo5();
    }
    if (allTimes.length >= 12) {
        calcAo12();
    }
    getScramble();
    document.querySelector('.scramble').style.display = 'block';
    // document.querySelector('.ad').style.display = 'none';
    // document.querySelectorAll('.ad')[1].style.display = 'none';
    canChange = true;
    setSoftkey({
        left: 'DNF',
        middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">check</i>',
        right: '+2'
    });
    bacjankdakhkdakdiuadkkj = setTimeout(() => {
        canChange = false;
        if (!settingsOpened && session.style.display == 'none') {
            setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });
        }
    }, 1500);
    localStorage['allTimes'] = JSON.stringify(allTimes);
}

function getScramble() {
    var last = "";
    var scramble = "";
    for (var i = 1; i <= limit; i++) {
        shuffle(keys);
        while (last == keys[0]) {
            shuffle(keys);
        }
        shuffle(moves[keys[0]]);
        move = moves[keys[0]][0];
        scramble += move + " ";
        last = keys[0];
    }
    document.querySelector('#scramble').innerText = scramble
}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

//  ====== NAVIGATE & SELECT ======
function handleKeydown(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (document.activeElement.classList.contains('setting') || document.activeElement.classList.contains('editTimeItems')) {
                nav(-1, "." + document.activeElement.classList[0] + ".show");
            } else {
                nav(-1, "." + document.activeElement.classList[0]);
            }
            break;
        case 'ArrowDown':
            if (document.activeElement.classList.contains('setting') || document.activeElement.classList.contains('editTimeItems')) {
                nav(1, "." + document.activeElement.classList[0] + ".show");
            } else {
                nav(1, "." + document.activeElement.classList[0]);
            }
            break;
    }
}

function nav(move, elems) {
    const currentIndex = document.activeElement;
    const items = document.querySelectorAll(elems);
    let currentElemIdx = [...items].indexOf(currentIndex);
    const next = currentElemIdx + move;
    const targetElement = items[next];
    if (targetElement) {
        targetElement.focus();
    }
}

function select() {
    if (document.activeElement == document.getElementById('startKeyDiv')) return document.getElementById('startKeyDiv').blur(), document.getElementById('startKey').style.border = "1px solid #005", setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
        middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">check</i>',
        right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 4.5px; right: 2.5px">close</i>'
    });
    if (document.getElementById('startKey').style.borderWidth == '1px') return document.getElementById('startKeyDiv').focus(), document.getElementById('startKey').style.border = "none", setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
        middle: 'Select',
        right: '<i class="material-icons" style=" color: blue; font-size: 21px; position: relative; top: 2.5px; right: 2px">question_mark</i>'
    });
    if (document.activeElement == puzzleType) return puzzleTypeSelector.focus();
    if (document.activeElement == timerFont) return timerFontSelector.focus();
    if (document.activeElement == document.getElementById('rightSoftDiv')) return document.getElementById('rightSoft').focus();
    if (document.activeElement == timerSizeDiv) return timerSize.focus(), setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
        middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">check</i>',
        right: '<i class="material-icons" style="font-size: 17px; position: relative; top: 4.5px; right: 2.5px">backspace</i>'
    }), timerSize.setSelectionRange(2, 2);
    if (document.activeElement == timerSize) return timerSizeDiv.focus(), setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
        middle: 'Select',
        right: '<i class="material-icons" style=" color: blue; font-size: 21px; position: relative; top: 2.5px; right: 2px">question_mark</i>'
    });
    if (document.activeElement == document.getElementById('scrambleSizeDiv')) return document.getElementById('scrambleSize').focus();
    if (document.activeElement == document.getElementById('scrambleSizeInputDiv')) return document.getElementById('scrambleSizeInput').focus(), setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
        middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">check</i>',
        right: '<i class="material-icons" style="font-size: 17px; position: relative; top: 4.5px; right: 2.5px">backspace</i>'
    }), timerSize.setSelectionRange(2, 2);
    if (document.activeElement == document.getElementById('scrambleSizeInput')) return document.getElementById('scrambleSizeInputDiv').focus(), setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
        middle: 'Select',
        right: '<i class="material-icons" style=" color: blue; font-size: 21px; position: relative; top: 2.5px; right: 2px">question_mark</i>'
    });
    if (document.activeElement == darkModeDiv) return darkMode.checked = !darkMode.checked, setDarkOrLightMode();
    if (document.activeElement == addPartDiv) return addPart.checked = !addPart.checked, letItSnow();
}

// ====== SET ======
function setSoftkey(object) {
    softLeft.innerHTML = object.left;
    softMiddle.innerHTML = object.middle;
    softRight.innerHTML = object.right;
}

function setDarkOrLightMode() {
    for (let elem of allelem) {
        elem.classList.toggle('light', !darkMode.checked);
    }
    if (darkMode.checked) return document.querySelector("meta[name='theme-color']").setAttribute('content', 'rgb(33, 33, 33)'), localStorage.setItem('darkmode', 'true');
    document.querySelector("meta[name='theme-color']").setAttribute('content', 'rgb(235, 232, 232)');
    localStorage.setItem('darkmode', 'false');
}

function info() {
    if (document.activeElement == document.getElementById('startKeyDiv') && document.getElementById('startKey').style.borderWidth !== "1px") return alert('This settings changes which key you need to press to start and stop the timer.');
    if (document.activeElement == puzzleType) return alert('Here you can change the puzzle type.\n A puzzle type is as example a 3x3 or Pyraminx etc.');
    if (document.activeElement == timerFont) return alert('Timer font means how the timer looks.\n Change the font to the one you like!');
    if (document.activeElement == timerSizeDiv) return alert('Timer size will change the size of the timer.');
    if (document.activeElement == darkModeDiv) return alert('This changes the look of the app.');
}

function getStoredData() {
    if (localStorage.darkmode) {
        if (localStorage.getItem('darkmode') == 'true') { darkMode.checked = true; } else { darkMode.checked = false; }
        setDarkOrLightMode();
    } else {
        localStorage.setItem('darkmode', 'true');
    }
    if (localStorage.allTimes) {
        allTimes = JSON.parse(localStorage['allTimes']);
    }
    //  TODO if (localStorage.ao5) {
    //     Ao5 = JSON.parse(localStorage['ao5']);
    //     Ao5.ao5current.innerHTML = Ao5.current;
    //     Ao5.ao5best.innerHTML = Ao5.best;
    // }
    // if (localStorage.ao12) {
    //     Ao12 = JSON.parse(localStorage['ao12']);
    //     Ao12.ao12current.innerHTML = Ao12.current;
    //     Ao12.ao12best.innerHTML = Ao12.best;
    // }
}

function showToast(text, time) {//thanks cyan
    document.querySelector(".kui-toast").style.display = "block";
    document.querySelector(".kui-pri").innerHTML = text;
    setTimeout(function () {
        document.querySelector(".kui-toast").classList.add("byetoast")
        setTimeout(function () {
            document.querySelector(".kui-toast").style.display = "none";
            document.querySelector(".kui-toast").classList.remove("byetoast");
        }, 500);
    }, time);
}

function loadTable() {
    if (allTimes.length == 0) {
        if (localStorage.getItem('darkmode') == 'true') {
            document.getElementById("timestable").innerHTML = `
            <tr>
                <th class="dark">Time</th>
                <th class="dark">Status</th>
            </tr>
            <tr>
                <td class="td dark" tabindex="0">Begin timing</td>
                <td class="dark">-</td>
            </tr>`
        } else if (localStorage.getItem('darkmode') == 'false') {
            document.getElementById("timestable").innerHTML = `
            <tr>
                <th class="light">Time</th>
                <th class="light">Status</th>
            </tr>
            <tr>
                <td class="td light" tabindex="0">Begin timing</td>
                <td class="light">-</td>
            </tr>`
        }
    } else {
        if (localStorage.getItem('darkmode') == 'true') {
            document.getElementById("timestable").innerHTML = `
            <tr>
                <th class="dark">Time</th>
                <th class="dark">Status</th>
            </tr>`
        } else if (localStorage.getItem('darkmode') == 'false') {
            document.getElementById("timestable").innerHTML = `
            <tr>
                <th class="light">Time</th>
                <th class="light">Status</th>
            </tr>`
        }
    }
    for (let i = 0; i < allTimes.length; i++) {
        var table = document.getElementById("timestable");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        row.id = i;
        cell1.tabIndex = i;
        cell3.classList.add('invisTd');
        cell4.classList.add('invisTd');

        if (localStorage.getItem('darkmode') == 'true') {
            cell1.classList.add("td", "dark");
            cell2.classList.add('dark')
        } else if (localStorage.getItem('darkmode') == 'false') {
            cell1.classList.add("td", "light");
            cell2.classList.add('light')
        }

        cell1.innerHTML = allTimes[i].time;
        cell2.innerHTML = allTimes[i].status;
        cell3.innerHTML = allTimes[i].scramble;
        cell4.innerHTML = allTimes[i].comment;
    }
}

function search() {
    var input, filter, settings, setting, label, i, txtValue;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    settings = document.getElementById("settings");
    setting = settings.querySelectorAll(".nos");
    for (i = 0; i < setting.length; i++) {
        label = setting[i].getElementsByTagName("label")[0];
        txtValue = label.textContent || label.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            setting[i].classList.add('show');
        } else {
            setting[i].classList.remove('show');
        }
    }
}

function letItSnow() {
    let date = new Date();
    if (date.getMonth() == 11) {
        if (addPart.checked) {
            var canvas = document.getElementById('snow-canvas');
            var context = canvas.getContext('2d');

            var angle = 0;

            var width = window.innerWidth;
            var height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            var snowParticles = 50;
            var flakes = [];

            for (var i = 0; i < snowParticles; i++) {
                flakes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 2.5,
                    density: Math.random() * snowParticles
                });
            }

            function drawFlakes() {
                if (addPart.checked) {
                    context.clearRect(0, 0, width, height);
                    context.fillStyle = 'rgb(255, 255, 255)';
                    context.beginPath();

                    for (var i = 0; i < snowParticles; i++) {
                        var f = flakes[i];
                        context.moveTo(f.x, f.y);
                        context.arc(f.x, f.y, f.radius, 0, Math.PI * 2, true);
                    }
                    context.fill()
                    updateCanvas();
                } else {
                    flakes = [];
                    context.clearRect(0, 0, width, height);
                    clearInterval(snowing);
                }
            }

            function updateCanvas() {
                angle += 0.01
                for (var i = 0; i < snowParticles; i++) {
                    var f = flakes[i];

                    //update the snowflakes coordinates
                    f.y += Math.cos(angle + f.density) + 1 + f.radius / 2;
                    f.x += Math.sin(angle) * 2;

                    if (f.x > width + 5 || f.x < -5 || f.y > height) {
                        if (i % 3 > 0) {
                            flakes[i] = { x: Math.random() * width, y: -10, radius: f.radius, density: f.density };
                        } else {
                            if (Math.sin(angle) > 0) {
                                flakes[i] = { x: - 5, y: Math.random() * height, radius: f.radius, density: f.density };
                            } else {
                                flakes[i] = { x: width + 5, y: Math.random() * height, radius: f.radius, density: f.density };
                            }
                        }
                    }
                }
            }
            let snowing = setInterval(drawFlakes, 33);
        }
    }
}//Copyright (c) 2022 by Boris Karastanev (https://codepen.io/ns_bob/pen/BoMqqR)

function convert($time) {
    time = $time
    over = time % 36000
    h = (time - over) / 36000;
    time = over;
    over = time % 600;
    m = (time - over) / 600;
    time = over;
    over = time % 10;
    s = (time - over) / 10;
    time = Math.round(over)
    over = time % 1;
    ms = (time - over) / 1;
    timeToReturn = ''
    if (h) timeToReturn += h + ":"
    if (m) timeToReturn += m + ":"
    if (s) { timeToReturn += s + "." } else { timeToReturn += "0." }
    if (ms) { timeToReturn += ms } else { timeToReturn += "0" }
    return (timeToReturn)
}

function calcAo5() {
    times = allTimes.slice(0, 5);
    let Ao5times = [];
    for (let i = 0; i < times.length; i++) {
        Ao5times.push(times[i].timeInMS)
    }
    const min = Math.min(...Ao5times);
    const max = Math.max(...Ao5times);

    const sum = Ao5times.reduce((a, b) => a + b, 0);
    Ao5inMS = (sum - max - min) / 3;
    Ao5converted = convert(Ao5inMS);
    addAo5(Ao5converted, Ao5inMS)
    // localStorage['ao5'] = JSON.stringify(Ao5);
}

function addAo5(time, timeinMS) {
    if (Ao5.best == 0) Ao5.best = time, Ao5.bestMS = timeinMS, Ao5.ao5best.innerHTML = Ao5.best;
    Ao5.current = time;
    Ao5.currentMS = timeinMS;
    Ao5.ao5current.innerHTML = Ao5.current;
    if (Ao5.currentMS < Ao5.bestMS) Ao5.bestMS = Ao5.currentMS, Ao5.best = Ao5.current, Ao5.ao5best.innerHTML = Ao5.best;
}

function calcAo12() {
    times = allTimes.slice(0, 12);
    let Ao12times = [];
    for (let i = 0; i < times.length; i++) {
        Ao12times.push(times[i].timeInMS)
    }
    const min = Math.min(...Ao12times);
    const max = Math.max(...Ao12times);

    const sum = Ao12times.reduce((a, b) => a + b, 0);
    Ao12inMS = (sum - max - min) / 3;
    Ao12converted = convert(Ao12inMS);
    addAo12(Ao12converted, Ao12inMS);
    // localStorage['ao12'] = JSON.stringify(Ao12);
}

function addAo12(time, timeinMS) {
    if (Ao12.best == 0) {
        Ao12.best = time;
        Ao12.bestMS = timeinMS;
        Ao12.ao12best.innerHTML = Ao12.best;
    }
    Ao12.current = time;
    Ao12.currentMS = timeinMS;
    Ao12.ao12current.innerHTML = Ao12.current;
    if (Ao12.currentMS < Ao12.bestMS) Ao12.bestMS = Ao12.currentMS, Ao12.best = Ao12.current, Ao12.ao12best.innerHTML = Ao12.best;
}