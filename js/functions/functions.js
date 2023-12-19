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
    actualScramble.innerText = scramble;
}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function nav(move, elems) {
    const currentIndex = document.activeElement;
    const items = document.querySelectorAll(elems);
    let currentElemIdx = [...items].indexOf(currentIndex);
    const next = currentElemIdx + move;
    const targetElement = items[next];
    if (targetElement) targetElement.focus();
}

function select() {
    // if (document.activeElement.classList.contains('divider')) {
    //     expand();
    // }
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
        middle: 'Select',
        right: '<i class="material-icons" style="font-size: 17px; position: relative; top: 4.5px; right: 2.5px">backspace</i>'
    }), timerSize.setSelectionRange(2, 2);
    if (document.activeElement == document.getElementById('scrambleSizeInput')) return document.getElementById('scrambleSizeInputDiv').focus(), setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
        middle: 'Select',
        right: '<i class="material-icons" style=" color: blue; font-size: 21px; position: relative; top: 2.5px; right: 2px">question_mark</i>'
    });
    if (document.activeElement == darkModeDiv) return darkMode.checked = !darkMode.checked, setDarkOrLightMode();
    if (document.activeElement == highContrastModeDiv) return highContrastMode.checked = !highContrastMode.checked, setDarkOrLightMode();
    if (document.activeElement == addPartDiv) return addPart.checked = !addPart.checked, letItSnow();
}

function setSoftkey(object) {
    softLeft.innerHTML = object.left;
    softMiddle.innerHTML = object.middle;
    softRight.innerHTML = object.right;
}

function setDarkOrLightMode() {
    
    document.body.classList.toggle('light')
    for (let elem of allelem) {
        elem.classList.toggle('light', !darkMode.checked);
        elem.classList.toggle('highContrast', highContrastMode.checked);

    }
    if (darkMode.checked) {
        localStorage.setItem('darkmode', 'true');
        if (highContrastMode.checked) return document.querySelector("meta[name='theme-color']").setAttribute('content', 'rgb(17, 17, 17)'), localStorage.setItem('highContrast', 'true');
        localStorage.setItem('highContrast', 'false')
        document.querySelector("meta[name='theme-color']").setAttribute('content', 'rgb(33, 33, 33)');
        return
    }
    localStorage.setItem('darkmode', 'false');
    if (highContrastMode.checked) return document.querySelector("meta[name='theme-color']").setAttribute('content', 'rgb(248, 248, 248)'), localStorage.setItem('highContrast', 'true');
    localStorage.setItem('highContrast', 'false')
    document.querySelector("meta[name='theme-color']").setAttribute('content', 'rgb(235, 232, 232)');
    loadTable();
    loadSessions();
}

function info() {
    if (document.activeElement.dataset.help) alert(document.activeElement.dataset.help)

}

function getStoredData() {
    if (localStorage.darkmode) {
        if (localStorage.highContrast === "true") highContrastMode.checked = true;
        if (localStorage.darkMode == "true") {
            darkMode.checked = true;
        } else {
            darkMode.checked = false;
        }
        setDarkOrLightMode();
    } else {
        localStorage.setItem('darkmode', 'true');
    }
    if (localStorage.puzzleTypeSelector) puzzleTypeSelector.value = localStorage.puzzleTypeSelector, setPuzzleType();
    if (localStorage.fontFamily) timerFontSelector.value = localStorage.fontFamily, timer.style.fontFamily = timerFontSelector.value;
    if (localStorage.timerSize) document.getElementById('timerSize').value = localStorage.timerSize, timer.style.fontSize = localStorage.timerSize + 'px';
    if (localStorage.scrambleSizeInput) scrambleSizeInput.value = localStorage.scrambleSizeInput;
    if (localStorage.scrambleSize) {
        if (localStorage.scrambleSize === 'user') scrambleSize.value = 'user-defined', scrambleSizeInputDiv.classList.add('show'); autoFontSize = false, actualScramble.style.fontSize = scrambleSizeInput.value + "px";
        if (localStorage.scrambleSize === 'auto') scrambleSizeInputDiv.classList.remove('show'), autoFontSize = true, actualScramble.style.fontSize = scrambleFontSize;
    }
    if (localStorage.sessions) sessions = JSON.parse(localStorage['sessions']);
    if (localStorage.activeSession) activeSession = JSON.parse(localStorage['activeSession']);

    // console.log(sessions[activeSession.index].times.length)
    for (let i = sessions[activeSession.index].times.length; i > 0; i--) {
        if (i - 5 >= 0) calcAo5(i);
    }

    for (let i = sessions[activeSession.index].times.length; i > 0; i--) {
        if (i - 12 >= 0) calcAo12(i);
    }

    document.querySelector('#sessionname').innerText = activeSession.name;
    sessionname.innerText = activeSession.name;
    loadTable();
    loadSessions();
}

function showToast(text, time) {
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
    if (darkMode.checked) { e = 'dark' } else { e = 'light' }


    if (sessions[activeSession.index].times.length == 0) {
        table.innerHTML = `
            <tr>
                <th class="${e}">Time</th>
                <th class="${e}">Status</th>
            </tr>
            <tr>
                <td class="td ${e}" tabindex="0">Begin timing</td> 
                <td class="${e}">-</td>
            </tr>`
        return
    }
    table.innerHTML = `
            <tr>
                <th class="${e}">Time</th>
                <th class="${e}">Status</th>
            </tr>`

    for (let i = 0; i < sessions[activeSession.index].times.length && i < 30; i++) {
        insertTime(i);

        cell1.onfocus = () => {
            setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">edit</i>',
                right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.1px; right: 2px">delete</i>'
            });
        }
    }
    if (sessions[activeSession.index].times.length > 30) {
        row = table.insertRow(-1);
        cell11 = row.insertCell(0);
        cell11.tabIndex = 1;

        cell22 = row.insertCell(1);
        cell22.classList.add(e);

        cell11.id = 'loadMore';

        cell11.classList.add("td", "times", e);
        cell11.innerHTML = `Load more`;
        cell22.innerHTML = `${sessions[activeSession.index].times.length - 30} more`;
        currentLoadedScrambles = 30;
    }
}

function insertTime(index) {
    row = table.insertRow(-1);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);

    cell1.tabIndex = 1;
    cell1.id = index;

    cell1.classList.add("td", "time", e);
    cell2.classList.add(e)
    cell3.classList.add('invisTd');
    cell4.classList.add('invisTd');

    cell1.innerHTML = sessions[activeSession.index].times[index].time;
    cell2.innerHTML = sessions[activeSession.index].times[index].status;
    cell3.innerHTML = sessions[activeSession.index].times[index].scramble;
    cell4.innerHTML = sessions[activeSession.index].times[index].comment;

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
        setting[i].classList.toggle('show', txtValue.toUpperCase().indexOf(filter) > -1);
    }
}

function letItSnow() {
    let date = new Date();
    date = date.getMonth();
    if (date == 11) {
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
    } else {
        document.querySelectorAll('.divider')[1].style.display = 'none';
        addPartDiv.style.display = 'none';
        addPartDiv.classList.remove('show');
    }
}

function convertTime(tenths, doubleZero) {
    const tenthsPerSecond = 10;
    const tenthsPerMinute = 10 * 60;
    const tenthsPerHour = 10 * 60 * 60;

    const hours = Math.floor(tenths / tenthsPerHour);
    const minutes = Math.floor((tenths / tenthsPerMinute) % 60);
    const seconds = Math.floor((tenths / tenthsPerSecond) % 60);
    const tenthsRemaining = tenths % tenthsPerSecond;

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${tenthsRemaining.toString().padStart(2, '0')}`;
    } else if (minutes > 0) {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${tenthsRemaining.toString().padStart(2, '0')}`;
    } else if (doubleZero) {
        return `${seconds.toString().padStart(2, '0')}.${tenthsRemaining}`;
    } else {
        return `${seconds}.${tenthsRemaining}`;
    }
}

function calcAo5(a) {
    let times = sessions[activeSession.index].times.slice(a - 5, 5);
    let timesInMS = [];
    for (let i = 0; i < times.length; i++) {
        timesInMS.push(times[i].timeInMS)
    }
    let idx = 0;
    let DNF = DNFavg = false;
    const min = Math.min(...timesInMS);
    times.forEach(function (time) {
        if (time.status === 'DNF') {
            if (DNF) {
                DNFavg = true;
            }
            DNF = true;
            idx++;
        }
    })

    if (DNFavg) {
        allAverages.currents.ao5 = 'DNF';
        allAverages.currents.ms.ao5 = 'DNF';
        Ao5.ao5current.innerHTML = 'DNF'
        Ao5.ao5.innerHTML = `Ao5: DNF`;
        return
    }
    let max;
    if (DNF) {
        // console.log(times.length)
        max = times[idx].timeInMS;
    } else {
        max = Math.max(...timesInMS);//TODO add DNF to average
    }

    const sum = timesInMS.reduce((a, b) => a + b, 0);
    Ao5inMS = (sum - max - min) / 3;
    Ao5convertTimeed = convertTime(Ao5inMS);
    addAo5(Ao5convertTimeed, Ao5inMS)
    // console.log(Ao5convertTimeed)
}
function addAo5(time, timeinMS) {
    allAverages.currents.ao5 = time;
    allAverages.currents.ms.ao5 = timeinMS;
    Ao5.ao5current.innerText = time;
    // Ao5.ao5.innerHTML = `Ao5: ${time}`

    if (allAverages.bests.ao5 === "-") {
        allAverages.bests.ao5 = time;
        allAverages.bests.ms.ao5 = timeinMS;
        Ao5.ao5best.innerText = time;
        // return console.log(allAverages);
    }

    if (allAverages.currents.ms.ao5 < allAverages.bests.ms.ao5) {
        allAverages.bests.ao5 = time;
        allAverages.bests.ms.ao5 = timeinMS;
        Ao5.ao5best.innerText = time;
    }

    // localStorage.setItem(allAverages, JSON.stringify(allAverages));
}

function calcAo12(a) {
    let times = sessions[activeSession.index].times.slice(a - 12, 12);
    let timesInMS = [];
    for (let i = 0; i < times.length; i++) {
        timesInMS.push(times[i].timeInMS)
    }
    const min = Math.min(...timesInMS);


    let idx = 0;
    let DNF = DNFavg = false;
    times.forEach(function (time) {
        if (time.status === 'DNF') {
            if (DNF) {
                DNFavg = true;
            }
            DNF = true;
            idx++;
        }
    })
    if (DNFavg) {
        allAverages.currents.ao12 = 'DNF';
        allAverages.currents.ms.ao12 = 'DNF';
        Ao12.ao12current.innerHTML = 'DNF'
        Ao12.ao12.innerHTML = `Ao12: DNF`;
        return
    }
    let max;
    if (DNF) {
        max = times[idx].timeInMS;//TODO add DNF to average
    } else {
        max = Math.max(...timesInMS);//TODO add DNF to average
    }
    const sum = timesInMS.reduce((a, b) => a + b, 0);
    Ao12inMS = (sum - max - min) / 10;
    Ao12convertTimeed = convertTime(Ao12inMS);
    addAo12(Ao12convertTimeed, Ao12inMS);
}
function addAo12(time, timeinMS) {

    allAverages.currents.ao12 = time;
    allAverages.currents.ms.ao12 = timeinMS;
    Ao12.ao12current.innerHTML = time
    // Ao12.ao12.innerHTML = `Ao12: ${time}`;
    if (allAverages.bests.ao12 === '-') {
        allAverages.bests.ao12 = time;
        allAverages.bests.ms.ao12 = timeinMS;
        Ao12.ao12best.innerHTML = time;

    }
    if (allAverages.currents.ms.ao12 < allAverages.bests.ms.ao12) {
        allAverages.bests.ms.ao12 = timeinMS;
        allAverages.bests.ao12 = time;
        Ao12.ao12best.innerHTML = time;
    }
    localStorage.setItem(allAverages, JSON.stringify(allAverages));

}

function setPuzzleType() {
    if (puzzleTypeSelector.value == "2x2") {
        moves = new Array();
        moves['r'] = new Array("R", "R'", "R2");
        moves['u'] = new Array("U", "U'", "U2");
        moves['f'] = new Array("F", "F'", "F2");
        keys = new Array("r", "u", "f");
        limit = 11;
        scrambleFontSize = "20px";
        if (autoFontSize) {
            document.querySelector('#scramble').style.fontSize = '20px';
        }
        getScramble();
    }
    if (puzzleTypeSelector.value == "3x3") {
        moves = new Array();
        moves['r'] = new Array("R", "R'", "R2");
        moves['l'] = new Array("L", "L'", "L2");
        moves['u'] = new Array("U", "U'", "U2");
        moves['d'] = new Array("D", "D'", "D2");
        moves['f'] = new Array("F", "F'", "F2");
        moves['b'] = new Array("B", "B'", "B2");
        keys = new Array("r", "l", "u", "d", "f", "b");
        limit = 20;
        scrambleFontSize = "18px";
        if (autoFontSize) {
            document.querySelector('#scramble').style.fontSize = '18px';
        }
        getScramble();
    }
    if (puzzleTypeSelector.value == "4x4") {
        moves = new Array();
        moves['r'] = new Array("R", "R'", "R2");
        moves['l'] = new Array("L", "L'", "L2");
        moves['u'] = new Array("U", "U'", "U2");
        moves['d'] = new Array("D", "D'", "D2");
        moves['f'] = new Array("F", "F'", "F2");
        moves['b'] = new Array("B", "B'", "B2");
        moves['Rw'] = new Array("Rw", "Rw'", "Rw2");
        moves['Lw'] = new Array("Lw", "Lw'", "Lw2");
        moves['Uw'] = new Array("Uw", "Uw'", "Uw2");
        moves['Dw'] = new Array("Dw", "Dw'", "Dw2");
        moves['Fw'] = new Array("Fw", "Fw'", "Fw2");
        moves['Bw'] = new Array("B", "B'", "B2");
        keys = new Array("r", "Rw", "l", "Lw", "u", "Uw", "d", "Dw", "f", "Fw");
        limit = 46;
        scrambleFontSize = "17px";
        if (autoFontSize) {
            document.querySelector('#scramble').style.fontSize = '17px';
        }
        getScramble();
    }
    if (puzzleTypeSelector.value == "5x5") {
        moves = new Array();
        moves['r'] = new Array("R", "R'", "R2");
        moves['l'] = new Array("L", "L'", "L2");
        moves['u'] = new Array("U", "U'", "U2");
        moves['d'] = new Array("D", "D'", "D2");
        moves['f'] = new Array("F", "F'", "F2");
        moves['b'] = new Array("B", "B'", "B2");
        moves['Rw'] = new Array("Rw", "Rw'", "Rw2");
        moves['Lw'] = new Array("Lw", "Lw'", "Lw2");
        moves['Uw'] = new Array("Uw", "Uw'", "Uw2");
        moves['Dw'] = new Array("Dw", "Dw'", "Dw2");
        moves['Fw'] = new Array("Fw", "Fw'", "Fw2");
        moves['Bw'] = new Array("B", "B'", "B2");
        keys = new Array("r", "Rw", "l", "Lw", "u", "Uw", "d", "Dw", "f", "Fw");
        limit = 60;
        scrambleFontSize = "16px";
        if (autoFontSize) {
            document.querySelector('#scramble').style.fontSize = '16px';
        }
        getScramble();
    }
    if (puzzleTypeSelector.value == "6x6") {
        moves = new Array();
        moves['r'] = new Array("R", "R'", "R2");
        moves['l'] = new Array("L", "L'", "L2");
        moves['u'] = new Array("U", "U'", "U2");
        moves['d'] = new Array("D", "D'", "D2");
        moves['f'] = new Array("F", "F'", "F2");
        moves['b'] = new Array("B", "B'", "B2");
        moves['Rw'] = new Array("Rw", "Rw'", "Rw2");
        moves['Lw'] = new Array("Lw", "Lw'", "Lw2");
        moves['Uw'] = new Array("Uw", "Uw'", "Uw2");
        moves['Dw'] = new Array("Dw", "Dw'", "Dw2");
        moves['Fw'] = new Array("Fw", "Fw'", "Fw2");
        moves['Bw'] = new Array("Bw", "Bw'", "Bw2");
        moves['3Rw'] = new Array("3Rw", "3Rw'", "3Rw2");
        moves['3Lw'] = new Array("3Lw", "3Lw'", "3Lw2");
        moves['3Uw'] = new Array("3Uw", "3Uw'", "3Uw2");
        moves['3Dw'] = new Array("3Dw", "3Dw'", "3Dw2");
        moves['3Fw'] = new Array("3Fw", "3Fw'", "3Fw2");
        moves['3Bw'] = new Array("3Bw", "3Bw'", "3Bw2");
        keys = new Array("r", "Rw", "l", "Lw", "u", "Uw", "d", "Dw", "f", "Fw", "3Rw", "3Lw", "3Uw", "3Dw", "3Fw", "3Bw");
        limit = 80;
        scrambleFontSize = "15px";
        if (autoFontSize) {
            document.querySelector('#scramble').style.fontSize = '15px';
        }
        getScramble();
    }
    if (puzzleTypeSelector.value == "7x7") {
        moves = new Array();
        moves['r'] = new Array("R", "R'", "R2");
        moves['l'] = new Array("L", "L'", "L2");
        moves['u'] = new Array("U", "U'", "U2");
        moves['d'] = new Array("D", "D'", "D2");
        moves['f'] = new Array("F", "F'", "F2");
        moves['b'] = new Array("B", "B'", "B2");
        moves['Rw'] = new Array("Rw", "Rw'", "Rw2");
        moves['Lw'] = new Array("Lw", "Lw'", "Lw2");
        moves['Uw'] = new Array("Uw", "Uw'", "Uw2");
        moves['Dw'] = new Array("Dw", "Dw'", "Dw2");
        moves['Fw'] = new Array("Fw", "Fw'", "Fw2");
        moves['Bw'] = new Array("Bw", "Bw'", "Bw2");
        moves['3Rw'] = new Array("3Rw", "3Rw'", "3Rw2");
        moves['3Lw'] = new Array("3Lw", "3Lw'", "3Lw2");
        moves['3Uw'] = new Array("3Uw", "3Uw'", "3Uw2");
        moves['3Dw'] = new Array("3Dw", "3Dw'", "3Dw2");
        moves['3Fw'] = new Array("3Fw", "3Fw'", "3Fw2");
        moves['3Bw'] = new Array("3Bw", "3Bw'", "3Bw2");
        keys = new Array("r", "Rw", "l", "Lw", "u", "Uw", "d", "Dw", "f", "Fw", "3Rw", "3Lw", "3Uw", "3Dw", "3Fw", "3Bw");
        limit = 100;
        scrambleFontSize = "14px";
        if (autoFontSize) {
            document.querySelector('#scramble').style.fontSize = '14px';
        }
        getScramble();
    }
    localStorage['puzzleTypeSelector'] = puzzleTypeSelector.value;
    document.querySelector('#puzzleTypename').innerText = puzzleTypeSelector.value;
}
function a(a) {
    if (a) {
        setSoftkey({
            left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">expand_less</i>',
            middle: 'Select',
            right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">more_horiz</i>'
        });
        return
    }
    setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">expand_less</i>',
        middle: 'Add',
        right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px"></i>'
    });

}
function loadSessions() {
    if (darkMode.checked) { e = 'dark' } else { e = 'light' };
    i = 0;
    document.querySelector('#myDropdown').innerHTML = ''
    sessions.forEach((session) => {
        document.querySelector('#myDropdown').innerHTML += `<div tabindex="1" onfocus='a(true);' class="dropdown-item notinput ${e}" id="${i}">${session.name}</div>`
        i++
    });

    document.querySelector('#myDropdown').innerHTML += `<input onfocus='a();' id="newsessioninput" class="dropdown-item ${e}" maxlength="50" placeholder="Add session">`
}

function openDropdown() {
    let arrow = document.querySelector('#expandArrow')
    document.getElementById("myDropdown").classList.toggle("showing");
    selectopened = !selectopened;
    if (selectopened) {
        arrow.innerText = 'expand_less'
        session.style.overflow = 'hidden';
        document.querySelector('.notinput').focus();
    } else {
        arrow.innerText = 'expand_more'
        session.style.overflow = 'auto';
        setSoftkey({
            left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
            middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">expand_more</i>',
            right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px"></i>'
        });
    };
}