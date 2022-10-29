let spacedown = false;
let spaceddown = false;
let ready = false;
let time;
let timing = false;
let startKeyName = '5';
let timermargintop = '40px';
let timermargintoppercentage = '50%';

let canChange = false;

let allTimes = [];

let allelem = document.querySelectorAll('.setting, select, input, #timerBox, body, #settings, #softkeys, #session, td, th, #sessions, #divider');

let settingsOpened = false;

let scrambleOnDom = document.getElementById('scramble');
let timerBox = document.getElementById('timerBox');
let timer = document.getElementById('timer');
let first = document.getElementById('first');
let firstsecond = document.getElementById('seconds');
let tensecond = document.getElementById('tenseconds');
let minutes = document.getElementById('minutes');
let settings = document.getElementById('settings');
settings.style.display = 'none';
session.style.display = 'none';
editTime.style.display = 'none';
let puzzleType = document.getElementById('puzzleTypeDiv');
let puzzleTypeSelector = document.getElementById('puzzleType');
let timerFont = document.getElementById('timerFontDiv');
let timerFontSelector = document.getElementById('timerFont');


if (loadScreen.style.display == 'block') {
    setInterval(() => { progress.value += .09 }, 180)
}
setTimeout(() => { loadScreen.style.display = 'none'; document.querySelector('footer').style.opacity = '1' }, 3000)

document.addEventListener('keydown', handleKeydown);
document.addEventListener("keydown", e => {

    if (loadScreen.style.display == 'none') {
        if (timing) {
            if (e.key == 'Backspace') {
                e.preventDefault()
            }
            stop();
            return
        }
        if (document.activeElement.id == 'comment') {
            document.activeElement.style.opacity = 0;
            document.activeElement.value = "";
            document.activeElement.blur();
            showToast('Added Comment', 2000)
        }
        if (canChange) {
            if (!isNaN(parseInt(e.key))) {
                document.getElementById('comment').focus();
                document.getElementById('comment').style.opacity = 1;
            }
            if (e.key == 'SoftLeft') return allTimes[allTimes.length - 1].status = 'DNF', canChange = false, showToast('Changed Status to DNF  ', 2000), setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });
            if (e.key == 'Enter') return canChange = false, setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });
            if (e.key == 'SoftRight') return allTimes[allTimes.length - 1].status = '+2', canChange = false, showToast('Changed Status to +2', 2000), setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });

        }


        if (!timing) {
            if (e.key == 'SoftLeft') {
                if (session.style.display == 'block') {
                    session.style.display = 'none';
                    setSoftkey({
                        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                        middle: 'Session',
                        right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
                    });
                    return
                }
            }

            if (e.key == 'SoftRight') {
                if (session.style.display == 'block') {
                    return openSessions();
                }
            }
            //Open/Close Settings
            if (e.key == 'SoftLeft') {
                if (settings.style.display == 'none') {
                    settings.style.display = 'block';
                    wholeSite.style.filter = 'blur(5px)';
                    document.getElementById('startKeyDiv').focus();
                    setSoftkey({
                        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2px; left: 2px">arrow_back</i>',
                        middle: 'Select',
                        right: '<i class="material-icons" style="font-size: 21px; position: relative; color: #44f;  top: 2px; right: 2px">question_mark</i>'
                    });
                    settingsOpened = true;
                } else if (settings.style.display == 'block' && document.getElementById('startKey').style.borderWidth !== '1px' && document.activeElement.id !== 'timerSize') {
                    settings.style.display = 'none';
                    wholeSite.style.filter = 'none';

                    setSoftkey({
                        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                        middle: 'Session',
                        right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
                    });
                    settingsOpened = false;
                }
            }


            //Quit App using SoftRight
            // if (e.key == 'SoftRight' && document.getElementById('session').style.display == 'none') 
            if (e.key == 'SoftRight' && !settingsOpened) return window.close();
            //Get info in settings
            if (e.key == 'SoftRight' && document.activeElement == timerSize) return timerSize.value = timerSize.value.slice(0, -1);
            if (e.key == 'SoftRight' && settingsOpened) return info();
            if (e.key == 'ArrowDown') {
                e.preventDefault();
            }
        }

        //Timing
        if (e.key === startKeyName && !settingsOpened && document.activeElement.id !== 'comment') {
            spacedown = true;
            if (!spaceddown) {
                start();
            }
            spaceddown = true;
        }

        //Select in settings or new scramble
        if (e.key == 'Enter') {
            if (settingsOpened) return select();
            if (document.getElementById('session').style.display == 'none') {
                document.querySelector('#session').style.display = 'block';
                document.querySelectorAll('.td')[0].focus();
                setSoftkey({
                    left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                    middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">edit</i>',
                    right: '<i class="material-icons" style="font-size: 25px; position: relative; top: 2.1px; right: 2px">list</i>'
                });
                loadTable();

            }
            // if (document.getElementById('session').style.display == 'block') return alert('edit');
        }
        if (document.getElementById('startKey').style.borderWidth == '1px') {
            if (e.key != 'MicrophoneToggle' && e.key != 'Enter' && e.key != 'SoftLeft' && e.key != 'SoftRight' && e.key != 'Backspace' && e.key != 'EndCall')
                startKeyName = e.key;
            document.getElementById('startKey').value = e.key;
        }
    }
});

document.addEventListener("keyup", e => {
    spacedown = false;
    spaceddown = false;
    start();
    ready = false;
});




//  ====== FUNCTIONS FOR TIMER ======
function start() {
    if (ready) {//If timer is green
        if (darkMode.checked) {
            timer.style.color = '#ebe8e8';
        } else {
            timer.style.color = '#222';
        }
        startTimer();
        return
    }
    if (!spacedown) {//If space release but not ready
        if (darkMode.checked) {
            timer.style.color = '#ebe8e8';
        } else {
            timer.style.color = '#222';
        }
        return
    }

    if (spacedown) {//if hold down make the timer red
        timer.style.color = 'red';
    }
    setTimeout(() => {//after 400ms timer is ready
        if (spacedown) {
            ready = true;
            timer.style.color = 'green';
            minutes.innerHTML = '';
            document.querySelector('.point').innerHTML = '';
            tensecond.innerHTML = '';
            firstsecond.innerHTML = 0;
            first.innerHTML = 0;
        }
    }, 400)
}

function startTimer() {//timer
    document.querySelector('.scramble').style.display = 'none';
    document.querySelector('#timerBox').style.marginTop = timermargintoppercentage;
    document.querySelector('.ad').style.display = 'block';
    document.querySelectorAll('.ad')[1].style.display = 'block';
    setSoftkey({
        left: '',
        middle: '',
        right: '',
    })
    timing = true;
    time = setInterval(() => {
        first.innerHTML++;
        if (first.innerHTML == 10) {
            firstsecond.innerHTML++;
            first.innerHTML = 0;
        }
        if (firstsecond.innerHTML == 10) {
            tensecond.innerHTML++;
            firstsecond.innerHTML = 0;
        }
        if (tensecond.innerHTML == 6) {
            document.querySelector('.point').innerHTML = ':';
            minutes.innerHTML++;
            tensecond.innerHTML = 0;
            firstsecond.innerHTML = 0;
        }
    }, 100)
}

function stop() {//stop timer
    clearInterval(time);
    timing = false;
    allTimes.push({
        time: timer.innerText,
        scramble: document.querySelector('.scramble').innerText,
        status: 'OK',
        comment: ''
    })
    getScramble();
    document.querySelector('.scramble').style.display = 'block';
    document.querySelector('#timerBox').style.marginTop = timermargintop;
    document.querySelector('.ad').style.display = 'none';
    document.querySelectorAll('.ad')[1].style.display = 'none';
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

}


//  ======= SCRAMBLE GENERATOR ======
function getScramble() {//generate a scramble
    var moves = new Array();
    moves['r'] = new Array("R", "R'", "R2");
    moves['l'] = new Array("L", "L'", "L2");
    moves['u'] = new Array("U", "U'", "U2");
    moves['d'] = new Array("D", "D'", "D2");
    moves['f'] = new Array("F", "F'", "F2");
    moves['b'] = new Array("B", "B'", "B2");

    var limit = 20;
    var last = "";
    var scramble = "";
    var keys = "";

    for (var i = 1; i <= limit; i++) {
        keys = new Array("r", "l", "u", "d", "f", "b");
        shuffle(keys);
        while (last == keys[0]) {
            shuffle(keys);
        }
        shuffle(moves[keys[0]]);
        move = moves[keys[0]][0];
        scramble += move + " ";
        last = keys[0];
    }
    document.querySelector('.scramble').innerHTML = ("<strong>Scramble:</strong> <br>" + scramble);

    var cube = new Array();
    scramble = scramble.replace("R2", "R R");
    scramble = scramble.replace("L2", "L L");
    scramble = scramble.replace("U2", "U U");
    scramble = scramble.replace("D2", "D D");
    scramble = scramble.replace("F2", "F F");
    scramble = scramble.replace("B2", "B B");
    scramble = scramble.split(" ");
}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};//Credits to Max on CodePen.io



//  ====== NAVIGATE & SELECT ======
function handleKeydown(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (document.activeElement != timerSize && document.getElementById('startKey').style.borderWidth !== '1px') {
                if (settingsOpened) {
                    nav(-1, '.setting');
                } else if (document.getElementById('session').style.display == 'block' && document.getElementById('editTime').style.display == 'none') {
                    nav(-1, '.td')
                }
            }
            break;
        case 'ArrowDown':
            if (document.activeElement != timerSize && document.getElementById('startKey').style.borderWidth !== '1px') {
                if (settingsOpened) {
                    nav(1, '.setting');
                } else if (document.getElementById('session').style.display == 'block') {
                    nav(1, '.td')
                }
            }
            break;
    }
}
function nav(move, elems) {
    const currentIndex = document.activeElement.tabIndex;
    const next = currentIndex + move;
    const items = document.querySelectorAll(elems);
    const targetElement = items[next];
    /*
    if (move === 1 && currentIndex == items.length - 1) return items[0].focus();
    if (move === -1 && currentIndex == 0) return items[items.length - 1].focus();
        probably not using this
    */
    targetElement.focus();
}

function select() {
    if (document.activeElement == document.getElementById('startKeyDiv')) return document.getElementById('startKeyDiv').blur(), document.getElementById('startKey').style.border = "1px solid #005", setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
        middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">check</i>',
        right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 4.5px; right: 2.5px">restart_alt</i>'
    });
    if (document.getElementById('startKey').style.borderWidth == '1px') return document.getElementById('startKeyDiv').focus(), document.getElementById('startKey').style.border = "none", setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
        middle: 'Select',
        right: '<i class="material-icons" style=" color: blue; font-size: 21px; position: relative; top: 2.5px; right: 2px">question_mark</i>'
    });
    if (document.activeElement == puzzleType) return puzzleTypeSelector.focus();
    if (document.activeElement == timerFont) return timerFontSelector.focus();
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
    if (document.activeElement == darkModeDiv) return darkMode.checked = !darkMode.checked, setDarkOrLightMode();
}


// ====== SET ======
function setSoftkey(object) {
    softLeft.innerHTML = object.left;
    softMiddle.innerHTML = object.middle;
    softRight.innerHTML = object.right;
}

function setDarkOrLightMode() {
    if (!darkMode.checked) {
        for (let elem of allelem) {
            elem.classList.remove('dark');
        }
        for (let elem of allelem) {
            elem.classList.add('light');
        }
        localStorage.setItem('darkmode', 'false');
    } else {
        localStorage.setItem('darkmode', 'true');
        for (let elem of allelem) {
            elem.classList.remove('light');
        }
        for (let elem of allelem) {
            elem.classList.add('dark');
        }
    }
}


document.getElementById('timerSize').addEventListener('input', () => {
    if (document.getElementById('timerSize').value > 30) {
        document.getElementById('timerSize').value = 30;
    } else if (document.getElementById('timerSize').value >= 23) {
        timermargintop = '15px';
        timermargintoppercentage = '36%';
        timerBox.style = 'margin-top: 15px; margin-left: 50px;'
    } else if (document.getElementById('timerSize').value < 25) {
        timermargintop = '40px';
        timermargintoppercentage = '50%';
        timerBox.style = 'margin-top: 40px; margin-left: 80px;'
    }
    timer.style.fontSize = document.getElementById('timerSize').value + 'px';
})

function info() {
    if (document.activeElement == document.getElementById('startKeyDiv') && document.getElementById('startKey').style.borderWidth !== "1px") return alert('This settings changes which key you need to press to start and stop the timer.');
    if (document.activeElement == puzzleType) return alert('Here you can change the puzzle type.\n A puzzle type is as example a 3x3 or Pyraminx etc.');
    if (document.activeElement == timerFont) return alert('Timer font means how the timer looks.\n Change the font to the one you like!');
    if (document.activeElement == timerSizeDiv) return alert('Timer size will change the size of the timer.');
    if (document.activeElement == darkModeDiv) return alert('This changes the look of the app.');
}

function getStoredData() {
    if (localStorage.darkmode) {
        if (localStorage.getItem('darkmode') == 'true') {
            darkMode.checked = true;
            for (let elem of allelem) {
                elem.classList.remove('light');
            }
            for (let elem of allelem) {
                elem.classList.add('dark');
            }
            return
        } else {
            darkMode.checked = false;
            for (let elem of allelem) {
                elem.classList.remove('dark');
            }
            for (let elem of allelem) {
                elem.classList.add('light');
            }

        }
    }
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
                <td class="dark">none</td>
            </tr>`
        } else if (localStorage.getItem('darkmode') == 'false') {
            document.getElementById("timestable").innerHTML = `
            <tr>
                <th class="light">Time</th>
                <th class="light">Status</th>
            </tr>
            <tr>
                <td class="td light" tabindex="0">Begin timing</td>
                <td class="light">none</td>
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

function openSessions() {
    // some session opening
}

document.querySelector('.selectdiv').addEventListener('click', () => {
    document.querySelector('.optionsdiv').style.display = 'block'
})

function softkey(e) {
    const { target, key, bubbles, cancelable, repeat, type } = e;
    if (!/Left|Right/.test(key) || !key.startsWith("Arrow") || !e.ctrlKey) return;
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
    target.dispatchEvent(new KeyboardEvent(type, { key: "Soft" + key.slice(5), bubbles, cancelable, repeat }));
}

document.addEventListener("keyup", softkey, true);
document.addEventListener("keydown", softkey, true);